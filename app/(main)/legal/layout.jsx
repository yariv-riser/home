import styles from './layout.module.css';

export default function LegalLayout({ children }) {
  return (
    <main className={`${styles['page']} wrapper-container`}>
      {children}
    </main>
  );
}
