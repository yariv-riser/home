import styles from './StepCard.module.css';

const StepCard = ({ title, description, opening, icon: Icon }) => {
  return (
    <div className={`${styles['step']} card hover-float`}>
      {Icon && (
        <Icon
          size={80}
          strokeWidth={2}
          className={styles['icon']}
          aria-hidden="true"
        />
      )}
      <h3>{title}</h3>
      <p><span>{opening}</span><br />{description}</p>
    </div>
  );
};

export default StepCard;