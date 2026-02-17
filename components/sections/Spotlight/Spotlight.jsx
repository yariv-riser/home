import Image from 'next/image';

import styles from './Spotlight.module.css'

export default function Spotlight() {
  return (
    <section id='spotlight-section' className={`${styles['spotlight-section']} wrapper-container`} aria-labelledby="spotlight-section">
      <div className={`${styles['layout']} wrapper`}>

        <h2>
          ליצור חוויות אינטראקטיביות מרגשות על ידי העלאת איכות החוויה הדיגיטלית של עסקים, מיזמים ורעיונות.
        </h2>

        <p>
          אנחנו הופכים רעיונות למציאות דיגיטלית עוצמתית. משלב התכנון ועד ליישום הפתרון שדוחף את העסק שלכם קדימה.         אנחנו הופכים רעיונות למציאות דיגיטלית עוצמתית. משלב התכנון ועד ליישום הפתרון שדוחף את העסק שלכם קדימה.
        </p>

        <figure>
          <Image
            src="https://picsum.photos/id/101/600/400"
            alt="Mountain"
            fill
          />
        </figure>

        <figure>
          <Image
            src="https://picsum.photos/id/101/600/400"
            alt="Mountain"
            fill
          />
        </figure>

        <figure>
          <Image
            src="https://picsum.photos/id/101/600/400"
            alt="Mountain"
            fill
          />
        </figure>

      </div>
    </section>
  )
}