// src/pages/GamePage.tsx
import { useState, useEffect } from 'react';
import { OpenAI } from 'openai';
import { useNavigate } from 'react-router-dom';

interface Poem {
  title: string;
  lines: string[];
}

type Card = {
  key: 'original' | 'generated';
  title: string;
  lines: string[];
};

// Helper to parse GPT output and strip markdown asterisks
function parseAIOutput(text: string): { title: string; lines: string[] } {
  const parts = text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  const first = parts[0].replace(/\*+/g, '');
  if (/^Title:/i.test(first)) {
    const title = first.split(':')[1].trim();
    const lines = parts.slice(1);
    return { title, lines };
  }
  return { title: 'Untitled', lines: parts };
}

export default function GamePage() {s
  const [questionIndex, setQuestionIndex] = useState<number>(1);
  const [score, setScore] = useState<number>(0);
  const [resultMessage, setResultMessage] = useState<string>('');

  // Question states
  const [cards1, setCards1] = useState<Card[]>([]);
  const [cards2, setCards2] = useState<Card[]>([]);
  const [cards3, setCards3] = useState<Card[]>([]);

  // Q4 image states
  const [userPrompt, setUserPrompt] = useState<string>('');
  const [originalImageUrl, setOriginalImageUrl] = useState<string>('');
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string>('');

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const client = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  const googleKey = import.meta.env.VITE_GOOGLE_API_KEY;
  const googleCx = import.meta.env.VITE_GOOGLE_CX;

  // Shuffle helper
  const shuffle = <T,>(arr: T[]): T[] => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  // Section titles
  const sectionTitles: Record<number, string> = {
    1: 'Haikus',
    2: 'Poetry',
    3: 'Wiki Excerpts',
    4: 'Images',
  };

  // Load Q1
  useEffect(() => {
    if (questionIndex !== 1) return;
    setLoading(true);
    (async () => {
      try {
        const res = await fetch('https://poetrydb.org/linecount,random/3;1');
        const data = await res.json();
        const original = { title: data[0].title, lines: data[0].lines };
        const comp = await client.responses.create({
          model: 'gpt-4o-mini',
          input: [
            { role: 'system', content: 'You are a skilled haiku poet.' },
            {
              role: 'user',
              content: `Write a haiku (5-7-5) imitating this haiku titled ${original.title}:\n${original.lines.join(
                '\n'
              )}. Output the title on the first line with the format "Title: x".`,
            },
          ],
        });
        const ai = parseAIOutput(comp.output_text ?? '');
        setCards1(
          shuffle([
            { key: 'original', title: original.title, lines: original.lines },
            { key: 'generated', title: ai.title, lines: ai.lines },
          ])
        );
      } catch (e) {
        console.error(e);
        setError('Could not load Haikus.');
      } finally {
        setLoading(false);
      }
    })();
  }, [questionIndex]);

  // Load Q2
  useEffect(() => {
    if (questionIndex !== 2) return;
    setLoading(true);
    (async () => {
      try {
        let original: Poem | null = null;
        while (!original) {
          const res = await fetch('https://poetrydb.org/random');
          const data = await res.json();
          if (data[0].lines.length <= 10) {
            original = { title: data[0].title, lines: data[0].lines };
          }
        }
        const comp = await client.responses.create({
          model: 'gpt-4o-mini',
          input: [
            { role: 'system', content: 'You are a skilled poet.' },
            {
              role: 'user',
              content: `Write a poem of ${original.lines.length} lines imitating this poem titled ${original.title}:\n${original.lines.join(
                '\n'
              )}. Output the title on the first line with the format "Title: x".`,
            },
          ],
        });
        const ai = parseAIOutput(comp.output_text ?? '');
        setCards2(
          shuffle([
            { key: 'original', title: original.title, lines: original.lines },
            { key: 'generated', title: ai.title, lines: ai.lines },
          ])
        );
      } catch (e) {
        console.error(e);
        setError('Could not load Poetry.');
      } finally {
        setLoading(false);
      }
    })();
  }, [questionIndex]);

  // Load Q3
  useEffect(() => {
    if (questionIndex !== 3) return;
    setLoading(true);
    (async () => {
      try {
        const randRes = await fetch(
          'https://en.wikipedia.org/api/rest_v1/page/random/summary'
        );
        const randData = await randRes.json();
        const title = randData.title;
        const apiUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&explaintext=true&exchars=800&titles=${encodeURIComponent(
          title
        )}&origin=*`;
        const exRes = await fetch(apiUrl);
        const exData = await exRes.json();
        const pg = exData.query.pages[Object.keys(exData.query.pages)[0]];
        const text: string = pg.extract || randData.extract;
        const lines = text.split(/\n+/).filter(Boolean);
        const original = { title, lines };
        const comp = await client.responses.create({
          model: 'gpt-4o-mini',
          input: [
            { role: 'system', content: 'You are a skilled novelist.' },
            {
              role: 'user',
              content: `Write an excerpt imitating this Wikipedia passage from "${title}":\n${lines.join(
                '\n'
              )}\nOutput the title on the first line with the format "Title: x".`,
            },
          ],
        });
        const ai = parseAIOutput(comp.output_text ?? '');
        setCards3(
          shuffle([
            { key: 'original', title: original.title, lines: original.lines },
            { key: 'generated', title: ai.title, lines: ai.lines },
          ])
        );
      } catch (e) {
        console.error(e);
        setError('Could not load Wiki Excerpts.');
      } finally {
        setLoading(false);
      }
    })();
  }, [questionIndex]);

  // Generate Q4 images
  const generateImages = async () => {
    setLoading(true);
    try {
      // Google Custom Search Image
      const gsRes = await fetch(
        `https://www.googleapis.com/customsearch/v1?key=${googleKey}&cx=${googleCx}&searchType=image&num=1&q=${encodeURIComponent(
          userPrompt
        )}`
      );
      const gsData = await gsRes.json();
      const firstImage = gsData.items?.[0]?.link;
      setOriginalImageUrl(firstImage || '');
      // DALL·E
      const gen = await client.images.generate({
        model: 'dall-e-3',
        prompt: userPrompt,
        n: 1,
        size: '1024x1024',
      });
      setGeneratedImageUrl(gen.data[0]?.url || '');
    } catch (e) {
      console.error(e);
      setError('Could not load Images.');
    } finally {
      setLoading(false);
    }
  };

  const handleChoice = (key: 'original' | 'generated') => {
    const correct = key === 'original';
    setScore((s) => s + (correct ? 1 : 0));
    setResultMessage(correct ? 'Correct!' : 'Sorry, that was AI.');
    if (questionIndex < 4) {
      setQuestionIndex((i) => i + 1);
    } else {
      // final screen
      setQuestionIndex(5);
    }
  };

  // Final screen
  if (questionIndex === 5) {
    return (
      <div className="max-w-3xl mx-auto p-6 space-y-6 text-center">
        <h1 className="text-2xl font-bold">All Done!</h1>
        <p className="text-xl">
          Your final score is <strong>{score}</strong> out of 4.
        </p>
      </div>
    );
  }

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;

  // Render cards
  const renderCards = (cards: Card[]) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {cards.map((card) => (
        <div
          key={card.key}
          className="border p-4 rounded hover:shadow cursor-pointer"
          onClick={() => handleChoice(card.key)}
        >
          <h2 className="font-semibold mb-2">{card.title}</h2>
          <p className="whitespace-pre-line">{card.lines.join('\n')}</p>
        </div>
      ))}
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-center">
        {sectionTitles[questionIndex]}
      </h1>
      <h2 className="text-lg text-center">Question {questionIndex} of 4</h2>
      {questionIndex > 1 && questionIndex <= 4 && (
        <p className="text-center text-xl">{resultMessage}</p>
      )}

      {questionIndex === 1 && renderCards(cards1)}
      {questionIndex === 2 && renderCards(cards2)}
      {questionIndex === 3 && renderCards(cards3)}
      {questionIndex === 4 && (
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter prompt for images"
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value)}
            className="w-full border p-2 rounded"
          />
          <button
            onClick={generateImages}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Generate Images
          </button>
          {originalImageUrl && generatedImageUrl && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                className="border p-4 rounded text-center cursor-pointer"
                onClick={() => handleChoice('original')}
              >
                <img
                  src={originalImageUrl}
                  alt="Original"
                  className="mx-auto"
                />
                <p className="mt-2 italic">{userPrompt}</p>
              </div>
              <div
                className="border p-4 rounded text-center cursor-pointer"
                onClick={() => handleChoice('generated')}
              >
                <img
                  src={generatedImageUrl}
                  alt="AI Generated"
                  className="mx-auto"
                />
                <p className="mt-2 italic">{userPrompt}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
