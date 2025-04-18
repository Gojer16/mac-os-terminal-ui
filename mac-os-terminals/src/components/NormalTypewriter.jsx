import { useState, useEffect } from 'react';

export const useTypewriter = ({ texts, speed = 50, delay = 1500 }) => {
  const [displayText, setDisplayText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);


  
  useEffect(() => {
    const current = texts[textIndex];
    if (charIndex < current.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + current.charAt(charIndex));
        setCharIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setDisplayText('');
        setCharIndex(0);
        setTextIndex((prev) => (prev + 1) % texts.length);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [charIndex, textIndex]);

  return displayText;
};
