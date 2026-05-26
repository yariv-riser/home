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

const FRAMES = LINES.map((_, i) => LINES.slice(0, i + 1).join('\n'));

const FRAME_MS = 140;

export default function RiserConsoleEgg() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const logoStyle = [
      'color: #6855FB',
      'font-size: 11px',
      'line-height: 1',
      'text-shadow: 0 0 10px hsla(247, 95%, 66%, 0.35)',
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