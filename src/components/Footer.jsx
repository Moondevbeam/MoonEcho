import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bottom-0 w-full bg-white p-8 text-center py-6">
      <div className="flex justify-center space-x-6 text-lg">
        <a
          href="https://www.linkedin.com/in/moonbeam-dev/"
          target="_blank"
          aria-label='LinkedIn Personal Profile'
          rel="noopener noreferrer"
          className="mx-2 hover:text-blue-500"
        >
          <FontAwesomeIcon icon={faLinkedin} size="lg" />
        </a>
        <a
          href="https://github.com/Moondevbeam"
          aria-label='Github Personal Profile'
          target="_blank"
          rel="noopener noreferrer"
          className="mx-2 hover:text-purple-700"
        >
          <FontAwesomeIcon icon={faGithub} size="lg" />
        </a>
      </div>
      <div className='border border-t mx-2 my-2 bg-black'></div>
      <div className="flex justify-between mx-2">
        <p className="text-sm">
      {currentYear} MoonEcho
        </p>
        <p>Moonbeam</p>
      </div>
    </footer>
  );
}

export default Footer;
