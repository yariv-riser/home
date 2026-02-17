'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

const NavigationContext = createContext();

export const NavigationProvider = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();

  const [navState, setNavState] = useState({
    isActive: false,
    shouldHideHeader: true
  });

  const scrollToHash = (hash, shouldHideHeader) => {
    const id = hash.replace('#', '');

    setNavState({ isActive: true, shouldHideHeader });

    let attempts = 0;
    const maxAttempts = 60;
    const interval = setInterval(() => {
      const element = document.getElementById(id);

      if (element) {
        clearInterval(interval);

        element.scrollIntoView({ behavior: 'smooth' });

        setTimeout(() => {
          setNavState(prev => ({ ...prev, isActive: false }));
        }, 2000);
      } else {
        attempts++;
        if (attempts >= maxAttempts) {
          clearInterval(interval);
          setNavState(prev => ({ ...prev, isActive: false }));
        }
      }
    }, 50);
  };

  const handleLinkClick = (e, href, shouldHideHeader = true) => {

    if (href.includes('#')) {
      e.preventDefault();
      const [path, hash] = href.split('#');
      const targetPath = path === '' ? '/' : path;

      if (pathname === targetPath) {
        scrollToHash(hash, shouldHideHeader);
      } else {
        setNavState({ isActive: true, shouldHideHeader });
        router.push(href);
      }
    }
    else if (href === '/') {
      e.preventDefault();
      setNavState({ isActive: true, shouldHideHeader: false });

      if (pathname === '/') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => {
          setNavState(prev => ({ ...prev, isActive: false }));
        }, 1000);
      } else {
        router.push('/');
      }
    }
  };

  useEffect(() => {
    if (window.location.hash) {
      scrollToHash(window.location.hash, true);
    }
  }, [pathname]);

  return (
    <NavigationContext.Provider value={{ navState, handleLinkClick }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => useContext(NavigationContext);