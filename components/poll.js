"use client"
import React, { useState } from 'react';

const Poll = ({ question, date, options }) => {
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [votes, setVotes] = useState(Array(options.length).fill(0));

  const handleVote = (index) => {
    if (selectedOptionIndex === null) {
      setSelectedOptionIndex(index);
      const newVotes = [...votes];
      newVotes[index] += 1;
      setVotes(newVotes);
    }
  };

  return (
    <div className="p-4 max-w-sm mx-auto bg-blue-100 rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-bold text-black">{question}</h2>
      <p className="text-gray-500">{date}</p>
      <div className="space-y-2">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleVote(index)}
            className={`w-full px-4 py-2 text-left rounded-lg hover:bg-gray-800 ${
              selectedOptionIndex === index
                ? 'bg-gray-800 text-white'
                : 'bg-black text-white'
            }`}
          >
            {option} (Votes: {votes[index]})
            {selectedOptionIndex === index && <span> ✓</span>}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Poll;

