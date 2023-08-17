import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCookieBite } from '@fortawesome/free-solid-svg-icons';
import { Disclosure } from '@headlessui/react';
import { useCookies } from 'react-cookie';

function CookieNotice() {
  // eslint-disable-next-line
  const [showNotice, setShowNotice] = useState(true);
  const [cookies, setCookie] = useCookies(['cookieAccepted']);

  const handleAccept = () => {
    setCookie('cookieAccepted', true, { path: '/' });
    setShowNotice(false);
  };

  return (
    !cookies.cookieAccepted && (
      <Disclosure>
        {({ open }) => (
          <>
            <div className="bg-gray-100 md:w-full md:p-8 md:mx-auto md:bottom-0 fixed p-4 bottom-2 mx-4 z-10 shadow-md">
              <div className="container mx-auto text-center">
                <span className="mr-2">
                  <FontAwesomeIcon icon={faCookieBite} className="text-blue-500" />
                </span>
                This website uses cookies to improve your experience.
                <button
                  className="ml-2 text-blue-500 hover:underline"
                  onClick={handleAccept}
                >
                  Accept
                </button>
              </div>
            </div>
          </>
        )}
      </Disclosure>
    )
  );
}

export default CookieNotice;
