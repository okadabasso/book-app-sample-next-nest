import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-300 text-gray-500 w-full relative">
          {/* footerの上 1rem 分の隙間を入れる */}
          <div className="absolute -top-4 h-4 bg-white" style={{width: "calc(100% - 16px)"}}></div>

          <div className="container mx-auto py-1 text-sm leading-6">
            &copy; 2024 Books Application All rights reserved.
          </div>
        </footer>
    );
};

export default Footer;