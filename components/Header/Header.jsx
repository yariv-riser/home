'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useNavigation } from '@/context/NavigationContext';
import logoUrl from '@/assets/logo.svg?url';
import { X } from 'lucide-react';
import { sendGAEvent } from '@/utils/analytics';
import { navLinks } from '@/app/data.json';

import styles from './Header.module.css';

const Header = () => {
  const { navState, handleLinkClick } = useNavigation();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  const isLanding = useRef(true);

  useEffect(() => {

    const timer = setTimeout(() => {
      isLanding.current = false;
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (navState.isActive) {
      setIsVisible(!navState.shouldHideHeader);
    }
  }, [navState]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (navState.isActive) {
        lastScrollY.current = currentScrollY;
        return;
      }

      if (!isLanding.current && window.location.hash) {
        history.replaceState(null, null, window.location.pathname + window.location.search);
      }

      if (currentScrollY > lastScrollY.current && currentScrollY > 10) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY.current) {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navState.isActive]);
  const onNavClick = (e, href) => {
    sendGAEvent('button_click', {
      category: 'engagement',
      label: 'Header Contact Button',
      value: 'lead_intent'
    });
    setIsMenuOpen(false);
    handleLinkClick(e, href, true);
  };

  const onLogoClick = (e) => {
    setIsMenuOpen(false);
    handleLinkClick(e, '/', false);
  };

  return (
    <header className={`${styles.header} ${isVisible ? '' : styles.hidden}`} role="banner">
      <div className={`${styles.layout} wrapper`}>

        <Link
          href="/"
          onClick={onLogoClick}
          className={styles.logoLink}
          aria-label="Go to Homepage"
        >
          <Image src={logoUrl} alt="רייזר" width={120} height={40} priority />
        </Link>

        <nav className={`${isMenuOpen ? styles.navOpen : ''}`} aria-label="Main Navigation">
          {isMenuOpen && (
            <button type="button" className={styles['close-btn']} onClick={() => setIsMenuOpen(false)}>
              <X size={60} strokeWidth={3} />
            </button>
          )}

          <ul className={styles.navList}>
            {navLinks.map(link => (
              <li key={link.name} className={styles.navItem}>
                <Link
                  href={link.href}
                  className={styles.navLink}
                  onClick={(e) => onNavClick(e, link.href)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href='/#contact-section'
            className={`btn cta ${styles['header-cta']}`}
            onClick={(e) => onNavClick(e, '/#contact-section')}
          >
            בואו נדבר
          </Link>
        </nav>

        <button className={styles.mobileToggle} onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span className={isMenuOpen ? styles.barOpen : styles.bar}></span>
          <span className={isMenuOpen ? styles.barOpen : styles.bar}></span>
          <span className={isMenuOpen ? styles.barOpen : styles.bar}></span>
        </button>

      </div>
    </header>
  );
};

export default Header;