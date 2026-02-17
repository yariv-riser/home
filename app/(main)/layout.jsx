import SectionTracker from '@/components/SectionsTracker';
import { NavigationProvider } from '@/context/NavigationContext';

import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

export default function MainLayout({ children }) {
  return (
    <NavigationProvider>
      <SectionTracker
        sectionName="Header"
        elId="header"
      >
        <Header />
      </SectionTracker>

      {children}

      <SectionTracker
        sectionName="Footer"
        elId="footer"
      >
        <Footer />
      </SectionTracker>

    </NavigationProvider>
  );
}