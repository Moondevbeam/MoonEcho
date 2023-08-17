import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="md:fixed bottom-0 w-full bg-gray-200 text-center py-4">
      <div className="flex justify-center">
        <a
          href="https://www.linkedin.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="mx-2 hover:text-blue-500"
        >
          <FontAwesomeIcon icon={faLinkedin} size="lg" />
        </a>
        <a
          href="https://github.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="mx-2 hover:text-gray-700"
        >
          <FontAwesomeIcon icon={faGithub} size="lg" />
        </a>
      </div>
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
