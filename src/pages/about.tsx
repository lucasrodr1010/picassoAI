import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

export default function AboutPage() {
  const nav = useNavigate();
  return (
    <div className="p-8 text-center space-y-6">
      <h1 className="text-4xl mb-4">What is Picasso AI?</h1>
      <p className="text-lg text-gray-700 ml-[2%] mr-[2%]" style={{ fontFamily: '"Public Sans", sans-serif', fontWeight: 300, fontSize: "24px" }}>
        Picasso AI is a brief game that asks players to distinguish between AI-generated images and human art. By presenting side-by-side comparisons, the goal of the experience is to expose users to how advanced generative models can now replicate human artistic style. Today, this technological leap poses real threats to creative professionals—AI can churn out work in established styles faster and cheaper than ever, shrinking opportunities for traditional artists. Moreover, many AI systems train on vast troves of existing art without clear attribution or permission, raising concerns about copyright infringement and the erosion of an artist’s control over their own style and livelihood.
        </p>

        <div className="text-left max-w-2xl mx-auto space-y-2">
        <h2 className="text-2xl font-semibold mt-8 mb-2 ml-[2%]">Resources</h2>
        <ul className="list-disc list-inside text-blue-600 space-y-1">
          <li>
            <a
              href="https://www.change.org/p/protect-human-art-artists-from-artificial-intelligence-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-blue-800"
            >
              Protect human art & artists from Artificial Intelligence (Change.org petition)
            </a>
          </li>
          <li>
            <a
              href="https://www.cnn.com/2022/10/21/tech/artists-ai-images/index.html"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-blue-800"
            >
              CNN: Artists push back against AI-generated images
            </a>
          </li>
          <li>
            <a
              href="https://www.brookings.edu/articles/ai-and-the-visual-arts-the-case-for-copyright-protection/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-blue-800"
            >
              Brookings: AI and the visual arts – The case for copyright protection
            </a>
          </li>
          <li>
            <a
              href="https://www.theverge.com/ai-artificial-intelligence/642599/is-there-a-right-way-to-use-ai-in-art"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-blue-800"
            >
              The Verge: Is there a "right" way to use AI in art?
            </a>
          </li>
          <li>
            <a
              href="https://www.lifewire.com/how-artists-are-fighting-back-against-ai-art-that-copies-their-works-7110583"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-blue-800"
            >
              Lifewire: How artists are fighting back against AI art that copies their works
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}