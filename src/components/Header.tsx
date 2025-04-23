import React from 'react';
import { Link } from 'react-router-dom';
import HomeIcon from '../assets/home.svg';

const Header = () => (
  <>
    
    <header className="w-full flex items-center justify-between py-4 px-6">
      <Link to="/" className="flex items-center ml-[10px] mt-[10px]">
        <img
          src={HomeIcon}
          alt="Home"
          className="h-6 w-auto ml-[2%]"
        />
      </Link>
      <nav className="flex space-x-[15px] mr-[2%] mt-[1%]">
        <Link to="/game" className="text-gray-500" style={{ fontFamily: '"Public Sans", sans-serif', fontWeight: 600 }}>
          Game
        </Link>
        <Link to="/about" className="text-gray-500" style={{ fontFamily: '"Public Sans", sans-serif', fontWeight: 600 }}>
          About
        </Link>
      </nav>
    </header>
    <hr
      style={{
        border: 0,
        height: '5px',
        backgroundImage: 'linear-gradient(to right, #d1d5db, #808080)',
      }}
    />
  </>
);

export default Header;
