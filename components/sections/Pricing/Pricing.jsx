'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';

import styles from './Pricing.module.css'

export default function Plans({ plans }) {

  const [mode, setMode] = useState('projects');

  function handlePlanTypeChange() {
    setMode(mode === 'projects' ? 'hours' : 'projects');
  }

  return (
    <section id='pricing-section' className={`${styles['pricing-section']} wrapper-container`}>
      <div className={`${styles['layout']} wrapper`}>

        <h2>
          ההשקעה הטובה ביותר שתעשו בעסק שלכם לשנים רבות קדימה
        </h2>

        <p>
          לבנות נוכחות דיגיטלית זה דבר מאתגר. בדיוק בגלל זה בנינו עבורכם מסלולים שקופים ומודולריים, שיתאימו בדיוק לקצב הצמיחה שלכם. מהצעד הראשון ועד למסירה – אנחנו השותפים שלכם למסע.
        </p>

        <div className={`${styles['plan-switch']} card`}>
          <label htmlFor="planType">פרוייקט חדש</label>
          <label className='switch'>
            <input
              id="planType"
              type="checkbox"
              onChange={handlePlanTypeChange}
              checked={mode === 'hours'}
            />
            <span className="slider"></span>
          </label>
          <label htmlFor="planType">בנק שעות</label>
        </div>

        {plans[mode].map(plan => (
          <article className={`${styles['plan']} card hover-float`} key={plan.id}>

            <h3 id={`plan-${plan.id}`}>{plan.name}</h3>

            <h4>{plan.description}</h4>

            {plan.features &&
              <ul aria-label={`${plan.name} פרטי חבילת`}>
                {plan.features.map((feature, i) => (
                  <li key={i}><Check />{feature}</li>
                ))}
              </ul>
            }

            <div className={styles['price']}>
              {mode === 'projects' ? <span>החל מ-</span> : ''}
              <span>₪</span>
              <span>{plan.price}</span>
            </div>

            <a
              className='btn cta'
              aria-describedby={`חבילת-${plan.id}`}
              href='#contact-section'
            >
              {plan.cta}
            </a>

          </article>
        ))}

      </div>
    </section>
  )
}