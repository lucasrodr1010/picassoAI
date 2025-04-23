import React from 'react';
import logoWhite from '../assets/logo-white.png';

const Footer = () => {
  return (
    <div>
      <div style={{ width: '100%', height: '5px', backgroundImage: 'linear-gradient(to right, #86efac, #d1d5db)' }} />

      <footer className="w-full flex items-center justify-between py-4 px-6">
        <img
          src={logoWhite}
          alt="Logo"
          className="scale-x-10 scale-y-10"
        />

        <div className="flex space-x-6 text-gray-500">
          <span>John Doe</span>
          <span>Jane Smith</span>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
