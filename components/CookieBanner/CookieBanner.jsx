'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './CookieBanner.module.css';

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('riser-cookie-consent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('riser-cookie-consent', 'granted');
    setShowBanner(false);

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        'analytics_storage': 'granted'
      });
    }
  };

  const handleDecline = () => {
    localStorage.setItem('riser-cookie-consent', 'denied');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <aside
      className={styles['cookie-banner']}
      role="dialog"
      aria-labelledby="cookie-title"
      aria-describedby="cookie-desc"
      tabIndex={0}
    >
      <div className={styles['inner']}>
        <div className={styles['content-wrapper']}>
          <p id="cookie-desc" className={styles['banner-text']}>
            אנחנו משתמשים בכלי אנליטיקה במטרה לבנות חוויה טובה יותר עבורכם. למידע נוסף, קראו את{' '}
            <Link href="/legal/privacy" className={styles['legal-link']}>
              מדיניות הפרטיות
            </Link>{' '}
            ו-
            <Link href="/legal/terms" className={styles['legal-link']}>
              תנאי השימוש
            </Link>{' '}
            שלנו.
          </p>
        </div>
        <div className={styles['button-group']}>
          <button
            className={styles['accept-btn']}
            onClick={handleAccept}
            aria-label="אישור מעקב סטטיסטי"
          >
            אישור
          </button>
          <button
            className={styles['decline-btn']}
            onClick={handleDecline}
            aria-label="דחיית מעקב סטטיסטי"
          >
            דחייה
          </button>
        </div>
      </div>
    </aside>
  );
}