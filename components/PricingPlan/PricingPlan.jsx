import React from 'react';

import { CircleCheck } from 'lucide-react';
import styles from './PricingPlan.module.css'

export default function PricingPlan(
  { id,
    deviceType,
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

      {deviceType === 'mobile' ?
        <a
          href={`https://wa.me/+972504840588`}
          className={`btn cta`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`צרו איתנו קשר בוואטסאפ לדבי חבילת ${name}`}
          aria-describedby={`חבילת-${name}`}
        >
          {cta}
        </a>
        :
        <a
          href='#contact-section'
          className='btn cta'
          aria-describedby={`חבילת-${name}`}
        >
          {cta}
        </a>
      }
    </article>
  )
}