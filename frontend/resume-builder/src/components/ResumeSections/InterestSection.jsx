import React from 'react';

const InterestSection = ({ interests }) => {
  if (!interests || interests.length === 0) {
    return <p className="text-xs text-gray-500">No interests available</p>;
  }

  // Filter out empty interests
  const validInterests = interests.filter(interest => interest && interest.trim());

  if (validInterests.length === 0) {
    return <p className="text-xs text-gray-500">No interests available</p>;
  }

  return (
    <div className="mt-2">
      <div className="flex flex-wrap gap-2">
        {validInterests.map((interest, index) => (
          <span
            key={`interest_${index}`}
            className="text-xs bg-gray-100 px-2 py-1 rounded-md text-gray-700"
          >
            {interest}
          </span>
        ))}
      </div>
    </div>
  );
};

export default InterestSection;