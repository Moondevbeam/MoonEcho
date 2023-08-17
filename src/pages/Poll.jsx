import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { firestore } from '../firebase/firebase';
import { useCookies } from 'react-cookie';

function Poll() {
  const { pollId } = useParams();
  const [pollData, setPollData] = useState(null);
  const [selectedOption, setSelectedOption] = useState('');
  const [hasVoted, setHasVoted] = useState(false);
  const [cookies, setCookie] = useCookies([pollId]);

  useEffect(() => {
    const fetchPollData = async () => {
      try {
        const pollRef = firestore.collection('polls').doc(pollId);
        const pollSnapshot = await pollRef.get();

        if (pollSnapshot.exists) {
          setPollData(pollSnapshot.data());
        } else {
          console.log('Poll not found');
        }
      } catch (error) {
        console.error('Error fetching poll data:', error);
      }
    };

    fetchPollData();
  }, [pollId]);

  const handleVote = async () => {
    if (selectedOption && !hasVoted) {
      try {
        const pollRef = firestore.collection('polls').doc(pollId);

        // Increment the vote count of the selected option
        const updatedOptions = pollData.options.map((option, index) => ({
          ...option,
          votes: index.toString() === selectedOption ? option.votes + 1 : option.votes,
        }));

        await pollRef.update({
          options: updatedOptions,
        });

        setHasVoted(true);
        setCookie(pollId, true, { path: '/' }); // Set the cookie to indicate that the user has voted
      } catch (error) {
        console.error('Error voting:', error);
      }
    }
  };

  if (!pollData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl mb-4">{pollData.question}</h2>
        {pollData.options.map((option, index) => (
          <div key={index} className="mb-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value={index}
                checked={selectedOption === index.toString()}
                onChange={() => setSelectedOption(index.toString())}
                disabled={hasVoted || cookies[pollId]}
              />
              <span className="text-lg">{option.text}</span>
            </label>
            <p className="ml-8">
              {option.votes} vote{option.votes !== 1 && 's'}
            </p>
          </div>
        ))}
        {hasVoted && (
          <div className="mt-4">
            <p className="text-green-500">Thank you for voting!</p>
            <Link to="/" className="text-blue-500 hover:underline">
              Homepage
            </Link>
          </div>
        )}
        {!hasVoted && !cookies[pollId] && (
          <button
            onClick={handleVote}
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Vote
          </button>
        )}
        {cookies[pollId] && !hasVoted && (
          <div className="mt-4">
            <p className="text-red-500">You have already voted.</p>
            <Link to="/" className="text-blue-500 hover:underline">
              Homepage
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Poll;
