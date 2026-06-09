'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './CookieBanner.module.css';

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('riser-cookie-consent');

    if (!consent) {
      // First-time visitor: show banner
      setShowBanner(true);
    } else if (consent === 'granted') {
      // Returning visitor: apply their granted consent immediately 
      // so the initial GA4 page_view fires with gcs=G111
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('consent', 'update', {
          'analytics_storage': 'granted'
        });
      }
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('riser-cookie-consent', 'granted');
    setShowBanner(false);

    if (typeof window !== 'undefined' && window.gtag) {
      // 1. Update the consent state
      window.gtag('consent', 'update', {
        'analytics_storage': 'granted'
      });

      // 2. Fire the stitch event so GA4 captures the current URL and UTMs
      window.gtag('event', 'consent_status_updated', {
        consent_status: 'granted',
        page_location: window.location.href // Explicitly pass the full URL with UTMs
      });
    }
  };

  const handleDecline = () => {
    localStorage.setItem('riser-cookie-consent', 'denied');
    setShowBanner(false);

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        'analytics_storage': 'denied'
      });
    }
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