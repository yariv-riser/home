import ScrollToTop from './ScrollToTop';
import styles from './template.module.css'

export default function Template({ children }) {
  return (
    <div className={styles['fadeWrapper']}>
      {children}
      <ScrollToTop />
    </div>
  );
}