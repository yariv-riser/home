import Image from 'next/image';

import styles from './About.module.css';

export default function About() {
  return (
    <section id='about-section' className={`${styles['about-section']} wrapper-container`} aria-labelledby="about-section">
      <div className={`${styles['layout']} wrapper`}>

        <h2>
          עיצוב חכם. חוויה פשוטה. הפנים החדשות שלכם במרחב הוירטואלי.
        </h2>

        <p>
          רייזר מתמחה בעיצוב ופיתוח חוויות משתמש שנעים להשתמש בהן, החל מאתרי תדמית ועד לפתרונות AI חדשניים המותאמים אישית לצרכים שלכם.
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