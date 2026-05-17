import Link from 'next/link';

import Tablet3D from '@/components/Tablet3D/Tablet3D';
import Rocket3D from '@/components/Rocket3D/Rocket3D';
import Bulb3D from '@/components/Bulb3D/Bulb3D';
import styles from './Hero.module.css';

export default async function Hero() {
  return (
    <section id='hero-section' className={`${styles['hero-section']} wrapper-container`} aria-labelledby="hero-section">
      <div className={`${styles['layout']} wrapper`}>

        <div className={styles['intro']}>
          <div className={styles['text']}>
            <h1>הופכים חלום למוצר דיגיטלי שעובד עבורכם<span>_</span></h1>
            <h2>
              <strong>אנחנו רייזר.</strong> מומחים בבניית אתרים וחנויות, אפליקציות ופתרונות דיגיטליים מתקדמים שיאפשרו לכם לרוץ קדימה אל עבר המטרות העסקיות שלכם בביטחון מלא.
            </h2>
          </div>
          <div className={styles['cta-container']}>
            <Link className='btn cta' href="#contact-section">בואו נדבר</Link>
            <Link className='btn' href="#pricing-section">מה אנחנו מציעים</Link>
          </div>
        </div>

        <div className={styles['graphic']}>
          <div className={`${styles['model-container']} ${styles['m1']}`}>
            <Tablet3D />
          </div>
          <div className={`${styles['model-container']} ${styles['m2']}`}>
            <Bulb3D />
          </div>
          <div className={`${styles['model-container']} ${styles['m3']}`}>
            <Rocket3D />
          </div>
        </div>


      </div>
    </section>
  )
}