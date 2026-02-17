import Link from 'next/link';

import HeroLogo from '@/components/HeroLogo';

import styles from './Hero.module.css';

export default async function Hero() {
  return (
    <section id='hero-section' className={`${styles['hero-section']} wrapper-container`} aria-labelledby="hero-section">
      <div className={`${styles['layout']} wrapper`}>

        <HeroLogo className={styles['hero-logo']} />

        <h1>סטודיו בוטיק ליצירת חוויות דיגיטליות</h1>

        {/* <mark>
          <h2>פשטות ויזואלית.<br />עוצמה טכנולוגית.</h2>
        </mark> */}

        <p>
          <strong>רייזר</strong> יוצרת עבורכם נכסים דיגיטליים שמייצרים אימפקט אמיתי, ומאפשרים לכם לרוץ קדימה אל עבר המטרות שלכם בביטחון מלא.
        </p>

        <div className={styles['cta-container']}>
          <Link className='btn cta' href="#contact-section">בואו נדבר</Link>
          <Link className='btn' href="#services-section">מה אנחנו מציעים</Link>
        </div>

      </div>
    </section>
  )
}