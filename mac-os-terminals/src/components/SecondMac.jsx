import React from 'react';
import { useTypewriter } from './useTypeWriter';

const terminalLines = [
  '> whoami',
  'Orlando_dev',
  '> passion',
  '"Building clean, scalable, and thoughtful apps."',
  '> mission',
  '"Empower users through innovation, simplicity, and impact."',
  '> stack',
  'JavaScript | React | Node | Next.js | AI/ML | Firebase | Tailwind',
  '> values',
  'Honesty, Curiosity, Collaboration, Growth',
];

const MacOs = () => {
  const typedText = useTypewriter({ texts: terminalLines, speed: 40, delay: 1200 });

  return (
    <div className="bg-black text-green-400 font-mono p-6 rounded-xl w-full max-w-2xl shadow-lg">
      <p>{typedText}<span className="animate-pulse">|</span></p>
    </div>
  );
};

export default MacOs;
