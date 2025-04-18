import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';

const themes = {
  mac: {
    container: 'bg-[#1e1e1ece] text-white rounded-xl shadow-lg max-w-2xl mx-auto',
    topBar: 'flex space-x-2 p-3',
    trafficLights: [
      'bg-red-500',
      'bg-yellow-500',
      'bg-green-500',
    ],
    content: 'p-6 font-mono text-sm',
    prompt: 'text-green-400',
    output: 'text-gray-300',
  },
  hacker: {
    container: 'bg-black text-green-300 font-mono p-6 rounded-xl shadow-[0_0_20px_rgba(0,255,0,0.2)] border border-green-500',
    content: '',
    prompt: 'text-green-400',
    output: 'text-green-300',
  },
  light: {
    container: 'bg-white text-gray-900 font-mono p-6 rounded-xl shadow-md border border-gray-300',
    content: '',
    prompt: 'text-blue-600',
    output: 'text-gray-700',
  },
};

const TypewriterTerminal = ({
  lines,
  loop = false,
  withDeleteEffect = true,
  sound = false,
  typingSpeed = 50,
  deleteSpeed = 25,
  terminalStyle = 'mac',
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const audioRef = useRef(null);

  const currentLine = lines[lineIndex % lines.length];
  const fullText = `${currentLine.prompt}\n${currentLine.output}`;

  useEffect(() => {
    if (!audioRef.current && sound) {
      audioRef.current = new Audio('/sounds/keystroke.mp3');
    }

    const playSound = () => {
      if (sound && audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
    };

    const timeout = setTimeout(() => {
      if (!deleting) {
        setDisplayedText((prev) => prev + fullText[charIndex]);
        setCharIndex((prev) => prev + 1);
        playSound();

        if (charIndex + 1 === fullText.length) {
          if (withDeleteEffect) {
            setTimeout(() => setDeleting(true), 1000);
          } else if (loop) {
            setTimeout(() => {
              setLineIndex((prev) => (prev + 1) % lines.length);
              setDisplayedText('');
              setCharIndex(0);
            }, 2000);
          }
        }
      } else {
        setDisplayedText((prev) => prev.slice(0, -1));
        playSound();

        if (displayedText.length === 0) {
          setDeleting(false);
          setCharIndex(0);
          setLineIndex((prev) => (prev + 1) % lines.length);
        }
      }
    }, deleting ? deleteSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, displayedText]);

  const theme = themes[terminalStyle];

  return (
    <div className={theme.container}>
      {terminalStyle === 'mac' && (
        <div className={theme.topBar}>
          {theme.trafficLights.map((color, i) => (
            <span key={i} className={`h-3 w-3 rounded-full ${color}`}></span>
          ))}
        </div>
      )}
      <div className={theme.content}>
        <pre className={theme.output}>{displayedText}</pre>
      </div>
    </div>
  );
};

TypewriterTerminal.propTypes = {
  lines: PropTypes.arrayOf(
    PropTypes.shape({
      prompt: PropTypes.string.isRequired,
      output: PropTypes.string.isRequired,
    })
  ).isRequired,
  loop: PropTypes.bool,
  withDeleteEffect: PropTypes.bool,
  sound: PropTypes.bool,
  typingSpeed: PropTypes.number,
  deleteSpeed: PropTypes.number,
  terminalStyle: PropTypes.oneOf(['mac', 'hacker', 'light']),
};

export default TypewriterTerminal;
