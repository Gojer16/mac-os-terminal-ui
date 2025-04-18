import React from 'react';
import { useTypewriter } from './NormalTypewriter';

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
    <div className="bg-black text-green-300 font-mono p-6 rounded-xl shadow-[0_0_20px_rgba(0,255,0,0.2)] border border-green-500">
      <p>{typedText}<span className="animate-pulse">|</span></p>
    </div>
  );
};

export default MacOs;
