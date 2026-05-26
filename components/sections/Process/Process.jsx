import StepCard from '@/components/StepCard/StepCard';

import compassUrl from '@/assets/process-section/compass.png?url';
import puzzleUrl from '@/assets/process-section/puzzle.png?url';
import keyUrl from '@/assets/process-section/key.png?url';
import { processSteps } from '@/app/data.json';
import styles from './Process.module.css';

const stepImages = [
  {
    url: compassUrl,
    dimensions: {
      width: 107,
      height: 120
    }
  },
  {
    url: puzzleUrl,
    dimensions: {
      width: 130,
      height: 90
    }
  },
  {
    url: keyUrl,
    dimensions: {
      width: 110,
      height: 110
    }
  },
];

export default function Process() {
  return (
    <section id='process-section' className={`${styles['process-section']} wrapper-container`} aria-labelledby="process-section">
      <div className={`${styles['layout']} wrapper`}>

        <h2>
          התהליך
        </h2>

        <p>
          לאחר שתפנו אלינו, נקיים שיחה קצרה בגובה העיניים. נתמקד באתגרים הנוכחיים, בשאיפות, ופוטנציאל פיתוח העסק שלכם בעזרתנו. ברגע שנרגיש את הקליק, נצא לדרך משותפת ומרגשת ליצירת פתרון שיתפר בדיוק עבורכם - ואלו השלבים:
        </p>

        {processSteps.map(({ id, title, description, opening }, i) => {
          const stepImage = stepImages[i];
          return (
            <StepCard
              key={id}
              title={title}
              opening={opening}
              description={description}
              stepImage={stepImage} />
          );
        })}

      </div>
    </section >
  )
}