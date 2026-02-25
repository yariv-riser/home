'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import styles from './Whatsapp.module.css';

export default function SecureWhatsapp({ className }) {

  const
    partA = "972",
    partB = "504",
    partC = "840588",
    fullNumber = `${partA}${partB}${partC}`,
    [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <span className={styles.placeholder}>...</span>;
  }

  return (
    <Link
      className={className}
      href={`https://wa.me/${fullNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`צרו איתנו קשר בוואטסאפ`}
    >
      וואטסאפ
    </Link>
  );
}