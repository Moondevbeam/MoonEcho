import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCookie } from '@fortawesome/free-solid-svg-icons';
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
            <div className="bg-gray-100 p-4 fixed bottom-0 left-0 w-full shadow-md">
              <div className="container mx-auto text-center">
                <span className="mr-2">
                  <FontAwesomeIcon icon={faCookie} className="text-blue-500" />
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
