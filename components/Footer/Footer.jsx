'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useNavigation } from '@/context/NavigationContext';

import Whatsapp from '../Whatsapp/Whatsapp';
import Phone from '../Phone/Phone';
import Email from '../Email/Email';

import Ball3D from '@/components/Ball3D/Ball3D';
import { navLinks } from '@/app/data.json';
import styles from './Footer.module.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { handleLinkClick } = useNavigation();

  return (
    <footer id='footer' className={`${styles['footer']} wrapper-container`} role="contentinfo">
      <div className={`${styles['layout']} wrapper`}>
        <address className={styles['contact-info']}>
          <Link
            className={styles['logo-link']}
            href="/"
            aria-label="חזרה לדף הבית"
            onClick={(e) => handleLinkClick(e, '/', true)}
          >
            <Image height={70} width={70} src='/logo.svg' alt='לוגו' />
          </Link>

          <Email className={styles['email']} />
          <Phone className={styles['phone']} />
          <Whatsapp className={styles['whatsapp']} />

          <a href="https://maps.app.goo.gl/DrQUqJvB8PopMZNN9" target="_blank" rel="noopener noreferrer">
            קיבוץ כפר גליקסון
          </a>
        </address>

        <nav className={styles['sections-nav']} aria-label="ניווט בדף הבית">
          <ul>
            {navLinks.map(({ name, href }) => (
              <li key={name}>
                <Link
                  href={href}
                  onClick={(e) => handleLinkClick(e, href, true)}
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <ul className={styles['social-links']}>
          <li><a href="https://www.facebook.com/riserinteractive/">פייסבוק</a></li>
          {/* <li><a href="https://instagram.com">אינסטגרם</a></li> */}
          {/* <li><a href="https://linkedin.com">לינקדאין</a></li> */}
        </ul>

        <p className={styles['copyright']}>© {currentYear} רייזר. כל הזכויות שמורות.</p>

        <nav className={styles['legal-nav']}>
          <ul>
            <li><Link href="/legal/accessibility">נגישות</Link></li>
            <li><Link href="/legal/privacy">מדיניות פרטיות</Link></li>
            <li><Link href="/legal/terms">תנאי שימוש</Link></li>
          </ul>
        </nav>
      </div>

      <div className={styles["ball-container"]}>
        <Ball3D />
      </div>
    </footer>
  );
};

export default Footer;