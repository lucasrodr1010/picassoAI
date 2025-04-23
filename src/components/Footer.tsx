import React from 'react';
import logoWhite from '../assets/logo-small-white.png';

const Footer = () => (
  <>
    <hr
      style={{
        border: 0,
        height: '5px',
        backgroundImage: 'linear-gradient(to right, #808080, #d1d5db)',
      }}
    />
    <footer className="w-full flex items-center justify-between py-4 pl-0 pr-6">
      <img
        src={logoWhite}
        alt="Logo"
        className="h-2 w-auto ml-[2%]"
      />
      <div
        className="flex space-x-6 text-gray-500 mr-[2%]"
        style={{ fontFamily: '"Public Sans", sans-serif', fontWeight: 200 }}
      >
        <span>Lucas Rodriguez</span>
        <span>, Nicholas Webber</span>
      </div>
    </footer>
  </>
);

export default Footer;