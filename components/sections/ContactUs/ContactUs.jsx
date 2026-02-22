'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './ContactUs.module.css';

export default function ContactUs() {

  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');

    const formData = new FormData(e.target);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      newsletter: formData.get('newsletter') === 'on',
      timestamp: new Date().toISOString()
    };

    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzM78SzxOAHPVGn6kVZ5McKYfKDLziClNwa0D6fZ6Y-2k31t6O-royFbAMarJMsJD27Lw/exec';

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      setStatus('success');

      e.target.reset();

    } catch (error) {
      console.error('Form submission error:', error);
      setStatus('error');
    }
  };

  return (
    <section
      id='contact-section'
      className={`${styles['contact-section']} wrapper-container`}
      aria-labelledby="contact-heading"
    >
      <div className={`${styles['layout']} wrapper`}>

        <h2 id="contact-heading">
          מוכנים להצמיח את העסק שלכם? אנחנו כאן כדי שזה יקרה.
        </h2>
        <p>
          לעשות את הצעד הבא בעולם הדיגיטל זה דבר מציף, אבל בדיוק בשביל זה אנחנו פה - השאירו פרטים ונצא לדרך
        </p>

        <form className='card' onSubmit={handleSubmit}>
          <div className={`${styles['input-group']}`}>
            <label htmlFor='name'>שם מלא</label>
            <input
              type="text"
              name="name"
              autoComplete="name"
              required
              disabled={status === 'submitting'}
            />
          </div>

          <div className={`${styles['input-group']}`}>
            <label htmlFor='email'>אימייל</label>
            <input
              required
              type="email"
              name="email"
              autoComplete="email"
              disabled={status === 'submitting'}
            />
          </div>

          <div className={`${styles['input-group']}`}>
            <label htmlFor="phone">טלפון</label>
            <input
              required
              type="tel"
              name="phone"
              autoComplete="tel"
              inputMode="numeric"
              pattern="[0-9\-\s]*"
              minLength={10}
              maxLength={14}
              disabled={status === 'submitting'}
            />
          </div>

          <label className='checkbox-section'>
            <input
              type="checkbox"
              name="newsletter"
              disabled={status === 'submitting'}
            />
            <span>אשמח לקבל מדי פעם השראה, טיפים וכלים (מבטיחים לא להציק, ותמיד אפשר להסיר).</span>
          </label>

          <small>
            הפרטים שתמסרו ישמשו לצורך חזרה לפנייתך בלבד, בהתאם ל
            <Link href="/legal/privacy">מדיניות הפרטיות</Link>.
          </small>

          {(status !== 'idle' && status !== 'submitting') ? (
            <div aria-live="polite" className={`${styles['status-message']} ${styles[status === 'success' ? 'success' : 'error']}`}>
              {status === 'success' && (
                <p>
                  ההודעה נשלחה! נחזור אליכם בהקדם.
                </p>
              )}
              {status === 'error' && (
                <p>
                  אירעה שגיאה. נסו שנית מאוחר יותר.
                </p>
              )}
            </div>
          ) : ''}

          <button
            className='btn cta'
            type="submit"
            disabled={status === 'submitting' || status === 'success'}
          >
            {status === 'submitting' ? 'שולח פרטים...' : 'בואו נצא לדרך'}
          </button>

        </form>

      </div>
    </section>
  );
}