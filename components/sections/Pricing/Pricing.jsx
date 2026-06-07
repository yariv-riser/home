'use client';

import { useState } from 'react';

import styles from './Pricing.module.css'
import PricingPlan from '@/components/PricingPlan/PricingPlan';

export default function Pricing({ plans, deviceType }) {

  const [mode, setMode] = useState('hours');

  function handlePlanTypeChange() {
    setMode(mode === 'projects' ? 'hours' : 'projects');
  }

  return (
    <section id='pricing-section' className={`${styles['pricing-section']} wrapper-container`}>
      <div className={`${styles['layout']} wrapper`}>

        <h2>
          החבילות
        </h2>

        <p>
          לבנות נוכחות דיגיטלית זה דבר מאתגר.<br />בדיוק בגלל זה בנינו עבורכם מסלולים שיתאימו בדיוק לקצב הצמיחה שלכם.<br />מהצעד הראשון ועד למסירה – אנחנו השותפים שלכם למסע.
        </p>

        {/* <div className={`${styles['plan-switch']}`}>
          <label htmlFor="planType">חיוב לפי סוג פרוייקט</label>
          <label className='switch'>
            <input
              id="planType"
              type="checkbox"
              onChange={handlePlanTypeChange}
              checked={mode === 'hours'}
            />
            <span className="slider"></span>
          </label>
          <label htmlFor="planType">חיוב לפי שעה</label>
        </div> */}

        {plans[mode].map(({ id,
          name,
          description,
          featuresTitle,
          features,
          price,
          cta }) => (
          <PricingPlan
            key={id}
            id={id}
            deviceType={deviceType}
            mode={mode}
            name={name}
            description={description}
            featuresTitle={featuresTitle}
            features={features}
            price={price}
            cta={cta}
          />
        ))}

      </div>
    </section>
  )
}