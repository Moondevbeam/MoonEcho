import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';

function Footer() {
  return (
    <footer className="bottom-0 w-full bg-gray-200 text-center py-4">
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
      <div className='flex justify-start mx-2'>
      <p className="mt-2 text-sm ">
        &copy; 2023 MoonEcho Polls. All rights reserved.
      </p>
      </div>
    </footer>
  );
}

export default Footer;
