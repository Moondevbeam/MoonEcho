import React from 'react';

function Features() {
  return (
    <section className="py-12">
      <div className="container mx-auto text-center">
        <h2 className="text-2xl font-semibold mb-4">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard icon="📊" title="Create Polls">
            Easily create polls and share them with others.
          </FeatureCard>
          <FeatureCard icon="🗳️" title="Vote">
            Cast your votes on various poll options.
          </FeatureCard>
          <FeatureCard icon="📊" title="See Results">
            View the results of polls in real-time.
          </FeatureCard>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ icon, title, children }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="text-2xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p>{children}</p>
    </div>
  );
}

export default Features;
