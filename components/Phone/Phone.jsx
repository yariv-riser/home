'use client';

import { useState, useEffect } from 'react';
import styles from './Phone.module.css';

export default function SecurePhone({ className }) {

  const
    partA = "+972",
    partB = "504",
    partC = "840588",
    fullNumber = `${partA}-${partB}-${partC}`,
    telLink = `tel:${partA}${partB}${partC}`,
    [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <span className={styles.placeholder}>...</span>;
  }

  return (
    <a
      href={telLink}
      className={className}
      aria-label={`צרו איתנו קשר בטלפון ${fullNumber}`}
    >
      {fullNumber}
    </a>
  );
}