// src/pages/GamePage.tsx
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { OpenAI } from 'openai';

export default function GamePage() {
  const [userPrompt, setPrompt] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const client = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  async function generateImage(): Promise<string | null> {
    try {
      const response = await client.images.generate({
        prompt: userPrompt,
        model: 'dall-e-3',
        n: 1,
        size: '1024x1024',
      });
      return response.data[0]?.url ?? null;
    } catch (error) {
      console.error('Error generating image:', error);
      return null;
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userPrompt.trim()) return;
    setLoading(true);
    const url = await generateImage();
    setImageUrl(url);
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center">
        Picasso AI — Generate Your Scene
      </h1>

      <form onSubmit={handleSubmit} className="flex space-x-2">
        <input
          type="text"
          placeholder="Describe what you want to see..."
          value={userPrompt}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setPrompt(e.target.value)}
          className="flex-grow px-4 py-2 border rounded focus:outline-none focus:ring"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Generating…' : 'Generate'}
        </button>
      </form>

      {imageUrl && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Your AI Image</h2>
          <img
            src={imageUrl}
            alt="AI generated"
            className="w-full rounded shadow"
          />
        </div>
      )}
    </div>
  );
}
