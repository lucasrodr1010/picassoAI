import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import Button from '../components/Button';

export default function StartPage() {
  const nav = useNavigate();
  return (
    <div className="flex flex-col items-center px-6 text-center space-y-6">
      <img
        src={logo}
        alt="Picasso AI Logo"
        className="scale-[70%] mt-0"
      />
      <h1 className="text-4xl" style={{ fontFamily: '"Public Sans", sans-serif', fontWeight: 600 }}>Welcome to Picasso AI!</h1>
      <h2 className="text-2xl" style={{ fontFamily: '"Public Sans", sans-serif', fontWeight: 500, fontSize: "28px" }}>Can You Spot the Real Artwork?</h2>
      <p className="max-w-md text-gray-600 mt-[5%]" style={{ fontFamily: '"Public Sans", sans-serif', fontWeight: 300, fontSize: "24px" }}>
        Compare an AI-generated piece with an original artwork and test your skills. By the end, you’ll see if human creativity still reigns supreme.
      </p>
      <Button className="mt-[10px] mb-[50px]" onClick={() => nav('/game')}>Start Game</Button>
    </div>
  );
}