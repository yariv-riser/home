// app/components/RiserConsoleEgg.jsx
'use client';

import { useEffect } from 'react';

const LETTERS = {
  A: [' █████ ', '██   ██', '███████', '██   ██', '██   ██'],
  C: [' █████ ', '██     ', '██     ', '██     ', ' █████ '],
  E: ['██████ ', '██     ', '█████  ', '██     ', '██████ '],
  I: ['██', '██', '██', '██', '██'],
  O: [' █████ ', '██   ██', '██   ██', '██   ██', ' █████ '],
  R: ['██████ ', '██   ██', '██████ ', '██  ██ ', '██   ██'],
  S: ['██████ ', '██     ', '██████ ', '    ██ ', '██████ '],
  U: ['██   ██', '██   ██', '██   ██', '██   ██', ' █████ '],
  W: ['██     ██', '██     ██', '██  █  ██', '██ ███ ██', ' ██   ██ '],
  ',': ['   ', '   ', '   ', ' ██', '██ '],
  '?': [' █████ ', '██   ██', '   ██  ', '       ', '   ██  '],
  ' ': ['  ', '  ', '  ', '  ', '  '],
};

const renderWord = (text) =>
  [0, 1, 2, 3, 4].map((row) =>
    text.split('').map((ch) => LETTERS[ch][row]).join('  ')
  );

const LINES = [
  ...renderWord('CURIOUS,'),
  '', // word break
  ...renderWord('ARE WE?'),
];

const FRAMES = LINES.map((_, i) => {
  const startIndex = LINES.length - 1 - i;
  return '\n'.repeat(startIndex) + LINES.slice(startIndex).join('\n');
});

const FRAME_MS = 160;

export default function RiserConsoleEgg() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const logoStyle = [
      'color: #00FF7F',
      'font-size: 11px',
      'line-height: 1',
      'text-shadow: 0 0 10px rgba(0, 255, 127, 0.35)',
    ].join(';');

    let cancelled = false;
    let timeoutId;

    const playFrame = (index) => {
      if (cancelled) return;

      if (index < FRAMES.length) {
        console.clear();
        console.log(`%c${FRAMES[index]}`, logoStyle);
        timeoutId = setTimeout(() => playFrame(index + 1), FRAME_MS);
        return;
      }
    };

    timeoutId = setTimeout(() => playFrame(0), 300);

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, []);

  return null;
}