import Link from 'next/link';

import HeroLogo from '@/components/HeroLogo';

import styles from './Hero.module.css';

export default async function Hero() {
  return (
    <section id='hero-section' className={`${styles['hero-section']} wrapper-container`} aria-labelledby="hero-section">
      <div className={`${styles['layout']} wrapper`}>

        {/* <HeroLogo className={styles['hero-logo']} /> */}

        <h1>חוויות דיגיטליות. פשוטות. יפהפיות. יוצאות דופן.</h1>

        <h2>
          <strong>רייזר</strong> הופכת את החזון שלכם למציאות שעובדת בשבילכם. <strong>בניית אתרים וחנויות, אפליקציות ופתרונות AI</strong> שיאפשרו לכם לרוץ קדימה אל עבר המטרות שלכם בביטחון מלא.
        </h2>

        <div className={styles['cta-container']}>
          <Link className='btn cta' href="#contact-section">בואו נדבר</Link>
          <Link className='btn' href="#services-section">מה אנחנו מציעים</Link>
        </div>

      </div>
    </section>
  )
}