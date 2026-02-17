'use client';

import { useState, useEffect } from 'react';
import styles from './Email.module.css';

export default function Email({ className }) {

  const
    user = 'HELLO',
    domain = 'RISER.CO.IL',
    [isMounted, setIsMounted] = useState(false),
    fullEmail = `${user}@${domain}`;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <span className={styles.placeholder}>...</span>;
  }

  return (
    <a
      href={`mailto:${fullEmail}`}
      className={className}
      aria-label={`שלחו לנו אימייל לכתובת ${fullEmail}`}
    >
      {fullEmail}
    </a>
  );
}