'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useNavigation } from '@/context/NavigationContext';
import logoUrl from '@/assets/logo.svg?url';
import { sendGAEvent } from '@/utils/analytics';
import { navLinks } from '@/app/data.json';
import Ball3D from '@/components/Ball3D/Ball3D';
import HeaderContactBtn from '../HeaderContactBtn/HeaderContactBtn';


const Header = ({ deviceType }) => {
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
    <header className={`header ${isVisible ? '' : 'hidden'}`} role="banner">
      <div className={`layout wrapper`}>

        <Link
          href="/"
          onClick={onLogoClick}
          className='logoLink'
          aria-label="Go to Homepage"
        >
          <Image src={logoUrl} alt="רייזר" width={120} height={40} />
        </Link>

        <nav className={`${isMenuOpen ? 'navOpen' : ''}`} aria-label="Main Navigation">

          <ul className='navList'>
            {navLinks.map(link => (
              <li key={link.name} className='navItem'>
                <Link
                  href={link.href}
                  className='navLink'
                  onClick={(e) => onNavClick(e, link.href)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          <HeaderContactBtn deviceType={deviceType} isMenuOpen={isMenuOpen} />

          <div className='ball-container'>
            <Ball3D color='#111' />
          </div>
        </nav>

        <button className='mobileToggle' onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span className={isMenuOpen ? 'barOpen' : 'bar'}></span>
          <span className={isMenuOpen ? 'barOpen' : 'bar'}></span>
          <span className={isMenuOpen ? 'barOpen' : 'bar'}></span>
        </button>

      </div>
    </header>
  );
};

export default Header;