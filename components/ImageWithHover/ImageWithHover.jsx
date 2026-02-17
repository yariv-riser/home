import Image from 'next/image';
import styles from './ImageWithHover.module.css';

const ImageWithHover = ({
  src,
  alt,
  title,
  subtitle,
  width = 406,
  height = 497
}) => {
  return (
    <figure className={styles['container']}>
      <div className={styles['imageWrapper']}>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={styles['image']}
        />
        <div className={styles['overlay']} aria-hidden="true" />
      </div>

      <figcaption className={styles['caption']}>
        <h3 className={styles['title']}>{title}</h3>
        <p className={styles['subtitle']}>{subtitle}</p>
      </figcaption>
    </figure>
  );
};

export default ImageWithHover;