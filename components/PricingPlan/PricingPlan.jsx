import React from 'react';

import { CircleCheck } from 'lucide-react';
import styles from './PricingPlan.module.css'

export default function PricingPlan(
  { id,
    name,
    description,
    featuresTitle,
    features,
    price,
    cta,
    mode }) {
  return (
    <article className={`${styles['plan']} ${styles[mode]} hover-float`} key={id}>

      <h3 id={`plan-${id}`}>{name}</h3>

      <h4>{description}</h4>

      <div className={styles['price']}>
        {mode === 'projects' ? <span>החל מ-</span> : ''}
        <span>₪</span>
        <span>{price}</span>
      </div>

      <hr className={styles['divider']} />

      {featuresTitle && <small>{featuresTitle}</small>}

      {features &&
        <ul aria-label={`${name} פרטי חבילת`}>
          {features.map((feature, i) => (
            <li key={i}>
              {mode === 'projects' ? <CircleCheck color='#B4B4B4' /> : ''}
              {feature}
            </li>
          ))}
        </ul>
      }

      <a
        className='btn cta'
        aria-describedby={`חבילת-${id}`}
        href='#contact-section'
      >
        {cta}
      </a>

    </article>
  )
}