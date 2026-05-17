import Image from 'next/image';
import styles from './StepCard.module.css';

const StepCard = ({ title, description, opening, stepImage }) => {
  return (
    <div className={`${styles['step']} hover-float`}>
      <Image
        src={stepImage.url}
        height={stepImage.height}
        width={stepImage.width}
        alt='Step illustration image'
      />
      <h3>{title}</h3>
      <p><span>{opening}</span>{description}</p>
    </div>
  );
};

export default StepCard;