import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { firestore } from '../firebase/firebase';

function CreatePoll() {
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
  
  const onSubmit = async (data) => {
    try {
      const pollRef = firestore.collection('polls').doc();
      const hasLinks = /https?:\/\/\S+/i.test(data.question) || data.options.some(option => /https?:\/\/\S+/i.test(option.text));
  
      if (hasLinks) {
        console.error('Links are not allowed in the question or options');
        return;
      }
  
      const validOptions = data.options.filter(option => option.text.trim() !== '');
  
      // Inizializza il valore "votes" di ogni opzione a zero
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
  
      const shareUrl = `${window.location.origin}/poll/${pollRef.id}`;
      setShareLink(shareUrl);
  
      console.log('Poll created successfully');
    } catch (error) {
      console.error('Error creating poll:', error);
      setError('question', { type: 'manual', message: 'Error creating poll' });
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h2 className="text-2xl mb-4">Create a New Poll</h2>
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
        <div className="mt-4">
          <p>Share this poll:</p>
          <a href={shareLink} target="_blank" rel="noopener noreferrer">{shareLink}</a>
        </div>
      )}
    </div>
  );
}

export default CreatePoll;
