import Image from 'next/image';
import styles from './StepCard.module.css';

const StepCard = ({ title, description, opening, stepImage }) => {
  return (
    <div className={`${styles['step']} hover-float`}>
      <Image
        src={stepImage.url}
        height={stepImage.dimensions.height}
        width={stepImage.dimensions.width}
        alt='Step illustration image'
      />
      <div className={`${styles['inner']}`}>
        <h3>{title}</h3>
        <p><span>{opening}</span>{description}</p>
      </div>
    </div>
  );
};

export default StepCard;