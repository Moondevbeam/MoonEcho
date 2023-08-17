import React from 'react';
import { Link } from 'react-router-dom';
function CTA() {
  return (
    <div className='bgland'>
    <div className="md:h-96 h-64 md:backdrop-blur-md backdrop-blur-sm md:py-28 py-12 text-white text-center">
      <div className='animate-bounce'>
      <h2 className="text-2xl font-semibold mb-4">Ready to get started?</h2>
      <p className="mb-6">Sign up now to create your first poll!</p>
      </div>
      <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
        <Link to="/sign">Sign Up</Link>
      </button>
    </div>
    </div>
  );
}

export default CTA;
