import React, { useState } from 'react';

interface ExpandableTextProps {
  text: string;
  maxLength?: number; // Optional max length before truncating
}

const ExpandableText: React.FC<ExpandableTextProps> = ({ text, maxLength = 100 }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleText = () => {
    setIsExpanded(!isExpanded);
  };

  const isTruncated = text.length > maxLength;

  return (
    <div>
      <p>
        {isExpanded || !isTruncated ? text : `${text.substring(0, maxLength)}...`}
      </p>
      {isTruncated && (
        <button className='expandingButton' onClick={toggleText}>
          {isExpanded ? 'Read Less' : 'Read More'}
        </button>
      )}
    </div>
  );
};

export default ExpandableText;
