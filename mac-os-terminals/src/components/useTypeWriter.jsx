import { useState, useEffect } from 'react';

export const useTypewriter = ({ texts, speed = 50, delay = 1500 }) => {
  const [displayText, setDisplayText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = texts[textIndex];
    if (!isDeleting && charIndex < current.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + current.charAt(charIndex));
        setCharIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    } else if (isDeleting && charIndex > 0) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev.slice(0, -1));
        setCharIndex((prev) => prev - 1);
      }, speed / 2);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setIsDeleting(!isDeleting);
        if (!isDeleting) {
          setCharIndex(current.length);
        } else {
          setTextIndex((prev) => (prev + 1) % texts.length);
          setCharIndex(0);
        }
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [charIndex, isDeleting, textIndex]);

  return displayText;
};
