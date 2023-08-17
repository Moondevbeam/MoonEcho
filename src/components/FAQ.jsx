import React, { useState } from 'react';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqData = [
    {
      question: "How can I create a new poll?",
      answer: "To create a new poll, you should first register on our website using the registration form. After logging in, you'll be redirected to the poll creation page. There, you can provide the poll question and options, and then submit it. Your new poll will be available for voting!"
    },
    {
      question: "Is registration required for voting?",
      answer: "No, registration is not mandatory for voting in polls. We use cookies to track the device that has voted, so you can simply click on the poll option you prefer, and your vote will be counted."
    },
    {
      question: "Can I edit a poll after it's created?",
      answer: "Unfortunately, once a poll is created, it cannot be edited. We recommend carefully reviewing your poll and options before finalizing the creation process."
    },
    {
      question: "Is it possible to change my vote?",
      answer: "No, our system is designed to ensure the integrity of the voting process. Once you've submitted your vote, it's final and cannot be changed. Make sure to consider all options before making your choice!"
    }
    // Add more FAQ items here
  ];

  const handleAccordionClick = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <div className="mt-8 mx-4 my-8">
      <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqData.map((faq, index) => (
          <div key={index} className="border p-4 rounded-md hover:bg-gray-200">
            <button
              onClick={() => handleAccordionClick(index)}
              className="flex justify-between items-center w-full focus:outline-none"
            >
              <span className="text-lg font-medium">{faq.question}</span>
              <span className="transform transition-transform duration-300 ease-in-out">
                {activeIndex === index ? '▲' : '▼'}
              </span>
            </button>
            {activeIndex === index && (
              <p className="mt-2 bg-gray-100 p-4 rounded-md text-gray-600">
                {faq.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
