import Link from 'next/link';

import Tablet3D from '@/components/Tablet3D/Tablet3D';
import Rocket3D from '@/components/Rocket3D/Rocket3D';
import Bulb3D from '@/components/Bulb3D/Bulb3D';
import styles from './Hero.module.css';

export default async function Hero() {
  return (
    <section id='hero-section' className={`${styles['hero-section']} wrapper-container`} aria-labelledby="hero-section">
      <div className={`${styles['layout']} wrapper`}>

        <ul className={styles["title-grid"]}>
          <li className={`${styles['a']}`}>הופכים</li>
          <li className={`${styles['b']}`}>חלום</li>
          <li className={styles['logo-container']}>
            <Rocket3D />
          </li>
          <li className={`${styles['c']}`}>למוצר</li>
          <li className={styles['logo-container']}>
            <Tablet3D />
          </li>
          <li className={`${styles['d']}`}>דיגיטלי</li>
          <li className={styles['logo-container']}>
            <Bulb3D />
          </li>
          <li className={`${styles['e']}`}>שעובד</li>
          <li className={`${styles['f']}`}>עבורכם</li>
        </ul>


        {/* <h1>הופכים חלום למוצר דיגיטלי שעובד עבורכם</h1> */}

        <h2>
          אנחנו רייזר. מומחים בבניית אתרים וחנויות, אפליקציות ופתרונות דיגיטליים מתקדמים שיאפשרו לכם לרוץ קדימה אל עבר המטרות העסקיות שלכם בביטחון מלא.
        </h2>

        <div className={styles['cta-container']}>
          <Link className='btn cta' href="#contact-section">בואו נדבר</Link>
          <Link className='btn' href="#services-section">מה אנחנו מציעים</Link>
        </div>

      </div>
    </section>
  )
}