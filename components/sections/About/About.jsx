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
          <strong>רייזר</strong> מביאה איתה סטנדרט גלובלי המבוסס על למעלה מעשור של ניסיון בפיתוח, אפיון ועיצוב חוויית משתמש עבור פרויקטים ששירתו מיליוני אנשים ברחבי העולם. אנחנו לוקחים על עצמנו את המורכבות הטכנולוגית והעיצובית, עם אפיון מדויק, פתרון בעיות ממוקד ותקשורת חדה, ומשאירים לכם את ההתרגשות לראות את המותג שלכם צומח.
        </p>

      </div>
    </section>
  )
}