import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { firestore, auth } from '../firebase/firebase';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faCheck } from '@fortawesome/free-solid-svg-icons';

function CreatePoll() {
  const [copied, setCopied] = useState(false);
  const [user, setUser] = useState(null);
  const { register, handleSubmit, setError, control, formState: { errors } } = useForm({
    defaultValues: {
      options: [{ text: '' }, { text: '' }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'options',
  });
  const [shareLink, setShareLink] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
        navigate('/'); // Redirect unauthenticated users to the homepage
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const onSubmit = async (data) => {
    if (!user) {
      console.error('User is not authenticated');
      return;
    }

    try {
      const pollRef = firestore.collection('polls').doc();
      const hasLinks = /https?:\/\/\S+/i.test(data.question) || data.options.some(option => /https?:\/\/\S+/i.test(option.text));

      if (hasLinks) {
        console.error('Links are not allowed in the question or options');
        return;
      }

      const validOptions = data.options.filter(option => option.text.trim() !== '');

      const initializedOptions = validOptions.map(option => ({
        ...option,
        votes: 0,
      }));

      if (initializedOptions.length < 2) {
        setError('options', { type: 'manual', message: 'At least 2 valid options are required' });
        return;
      }

      const pollData = {
        question: data.question,
        options: initializedOptions,
        createdAt: new Date(),
      };

      await pollRef.set(pollData);

      const shareUrl = new URL(`/poll/${pollRef.id}`, window.location.origin);
      setShareLink(shareUrl.toString());

      console.log('Poll created successfully');
    } catch (error) {
      console.error('Error creating poll:', error);
      setError('question', { type: 'manual', message: 'Error creating poll' });
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      console.log('User logged out successfully');
      navigate('/'); // Redirect to the homepage after logout
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h2 className="text-2xl mb-4">Create a New Poll</h2>
      {user ? (
        <button
          className="mb-4 px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
          onClick={handleLogout}
        >
          Logout
        </button>
      ) : null}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="question" className="block mb-1">
            Question
          </label>
          <input
            type="text"
            id="question"
            className={`w-full p-3 border rounded-lg ${errors.question ? 'border-red-500' : ''}`}
            {...register('question', { required: 'Question is required' })}
          />
          {errors.question && <p className="text-red-500">{errors.question.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block mb-1">Options (at least 2)</label>
          {fields.map((option, index) => (
            <div key={option.id} className="flex mb-2">
              <input
                type="text"
                className={`flex-grow p-3 border rounded-lg ${errors.options?.[index]?.text ? 'border-red-500' : ''}`}
                placeholder={`Option ${index + 1}`}
                {...register(`options.${index}.text`, { required: 'Option is required' })}
              />
              <button
                type="button"
                className="px-4 py-2 ml-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
                onClick={() => remove(index)}
              >
                Remove
              </button>
            </div>
          ))}
          {errors.options && <p className="text-red-500">{errors.options.message}</p>}
          {fields.length < 5 && (
            <button
              type="button"
              className="px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600"
              onClick={() => append({ text: '' })}
            >
              Add Option
            </button>
          )}
        </div>
        <button
          type="submit"
          className="w-full py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
        >
          Create Poll
        </button>
      </form>
      {shareLink && (
    <div className="mt-4 px-1 md:px-6 sm:px-0">
    <div className="bg-white p-4 rounded-lg shadow-md">
      <p className="text-lg font-semibold mb-2">Share this poll:</p>
      <div className="flex flex-col sm:flex-row items-center">
        <a
          href={shareLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline mb-2 sm:mb-0 sm:mr-2 max-w-full truncate bg-gray-200 rounded p-2"
        >
          {shareLink}
        </a>
        <button
          onClick={copyToClipboard}
          className={`${
            copied ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'
          } text-white px-4 py-2 rounded sm:w-auto focus:outline-none flex items-center`}
        >
          {copied ? (
            <>
              <FontAwesomeIcon icon={faCheck} className="mr-2" />
              Copied!
            </>
          ) : (
            <>
              <FontAwesomeIcon icon={faCopy} className="mr-2" />
              Copy Link
            </>
          )}
        </button>
      </div>
    </div>
  </div>
      )}
    </div>
  );
}

export default CreatePoll;

