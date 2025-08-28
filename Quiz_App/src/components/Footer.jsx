import React from "react";

const Footer = () => {
  return (
    <footer className="fixed bottom-6 right-8 flex space-x-4 bg-gray-900 bg-opacity-70 rounded-full py-2 px-4 shadow-lg">
      <a
        href="https://github.com/Langat18"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-300 hover:text-blue-400 hover:bg-gray-800 rounded-full p-2 transition-all duration-300"
      >
        <i className="bi bi-github text-xl"></i>
      </a>
      <a
        href="https://www.linkedin.com/in/kipkirui-langat-clement/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-300 hover:text-blue-400 hover:bg-gray-800 rounded-full p-2 transition-all duration-300"
      >
        <i className="bi bi-linkedin text-xl"></i>
      </a>
    </footer>
  );
};

export default Footer;