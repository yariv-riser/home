import Image from 'next/image';

import styles from './About.module.css';

export default function About() {
  return (
    <section id='about-section' className={`${styles['about-section']} wrapper-container`} aria-labelledby="about-section">
      <div className={`${styles['layout']} wrapper`}>

        <h2>
          עיצוב חכם. חוויה פשוטה. תדמית משודרגת.
        </h2>

        <p>
          <strong>רייזר</strong> מביאה איתה סטנדרט גלובלי המבוסס על למעלה מעשור של ניסיון בפיתוח, אפיון ועיצוב חוויית משתמש עבור פרויקטים ששירתו מיליוני אנשים ברחבי העולם. אנחנו לוקחים על עצמנו את המורכבות הטכנולוגית והעיצובית, עם אפיון מדויק, פתרון בעיות ממוקד ותקשורת חדה, ומשאירים לך את ההתרגשות לראות את המותג שלך צומח.
        </p>

        <figure>
          <Image
            src="https://images.pexels.com/photos/12899191/pexels-photo-12899191.jpeg"
            alt="Mountain"
            fill
          />
        </figure>

        <figure>
          <Image
            src="https://images.pexels.com/photos/29459444/pexels-photo-29459444.jpeg"
            alt="Mountain"
            fill
          />
        </figure>

        <figure>
          <Image
            src="https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg"
            alt="Mountain"
            fill
          />
        </figure>

      </div>
    </section>
  )
}