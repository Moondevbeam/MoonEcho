import React from 'react';
import { Link } from 'react-router-dom';
function CTA() {
  return (
    <section className="bg-gray-100 py-12 text-center">
      <h2 className="text-2xl font-semibold mb-4">Ready to get started?</h2>
      <p className="mb-6">Sign up now to create your first poll!</p>
      <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
        <Link to="/sign">Sign Up</Link>
      </button>
    </section>
  );
}

export default CTA;
