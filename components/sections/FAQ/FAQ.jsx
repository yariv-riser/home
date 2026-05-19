
import QuestionMark3D from '@/components/QuestionMark3D/QuestionMark3D';

import styles from './FAQ.module.css';

export default function FAQ({ faqs }) {
  return (
    <section id='faq-section' className={`${styles['faq-section']} wrapper-container`} aria-labelledby="faq-section">
      <div className={`${styles['layout']} wrapper`}>

        <h2 id="faq-heading">
          אנחנו יודעים שלצאת לדרך חדשה זה צעד משמעותי.
        </h2>

        <p>
          אספנו עבורך את השאלות שתמיד עולות, עם תשובות שיתנו לכם את הביטחון לקחת את העסק לשלב הבא.
        </p>

        <ul>
          {faqs.map(faq => (
            <li key={faq.question}>
              <details name="faq-accordion">
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            </li>
          ))}
        </ul>

        <div className={`${styles['question-mark']}`}>
          <QuestionMark3D />
        </div>
      </div>


    </section>
  )
}