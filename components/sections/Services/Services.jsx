import ImageWithHover from '@/components/ImageWithHover/ImageWithHover';

import styles from './Services.module.css';

export default function Services() {
  return (
    <section id='services-section' className={`${styles['services-section']} wrapper-container`} aria-labelledby="services-section">
      <div className={`${styles['layout']} wrapper`}>

        <h2>
          בואו נהפוך את החלומות העסקיים שלכם למציאות דיגיטלית שאי אפשר להתעלם ממנה.
        </h2>

        <p>
          שחררו את הדאגות הטכניות ותנו לנו לסלול עבורכם את הדרך להצלחה ולצמיחה יציבה ללא מעצורים.
        </p>

        <ImageWithHover
          src="https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg"
          alt="Website"
          title="אתר"
          subtitle="יצירת רושם מקצועי ומלוטש שפותח דלתות וסוגר עסקאות."
        />

        <ImageWithHover
          src="https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg"
          alt="Website"
          title="אפליקציה"
          subtitle="מערכות שהופכות תהליכים לקלים, ומפנות לכם זמן לניהול ופיתוח העסק."
        />

        <ImageWithHover
          src="https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg"
          alt="Website"
          title="בינה מלאכותית"
          subtitle="פתרונות חכמים שנותנים לכם כוח טכנולוגי של חברות ענק ועוזרים לכם להוביל בשוק."
        />

      </div>
    </section>
  )
}