import { Compass, Layers2, Check } from 'lucide-react';
import StepCard from '@/components/StepCard/StepCard';

import { processSteps } from '@/app/data.json';
import styles from './Process.module.css';

const ICON_MAP = { Compass, Layers2, Check };

export default function Process() {
  return (
    <section id='process-section' className={`${styles['process-section']} wrapper-container`} aria-labelledby="process-section">
      <div className={`${styles['layout']} wrapper`}>

        <h2>
          התהליך
        </h2>

        <p>
          תהליך היצירה צריך להיות חלק, צלול ומרגש בדיוק כמו התוצאה הסופית. כך נהפוך את הרעיון שלך לנכס דיגיטלי מלוטש – בביטחון ובשקיפות מלאה:
        </p>

        {processSteps.map(({ id, title, description, opening, iconName }) => {
          const IconComponent = ICON_MAP[iconName];
          return (
            <StepCard
              key={id}
              title={title}
              opening={opening}
              description={description}
              icon={IconComponent} />
          );
        })}

      </div>
    </section >
  )
}