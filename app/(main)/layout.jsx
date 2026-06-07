import SectionTracker from '@/components/SectionsTracker';
import { NavigationProvider } from '@/context/NavigationContext';
import { headers } from 'next/headers';
import { userAgent } from 'next/server';

import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

export default async function MainLayout({ children }) {

  const reqHeaders = await headers();
  const { device } = userAgent({ headers: reqHeaders });

  return (
    <NavigationProvider>
      <SectionTracker
        sectionName="Header"
        elId="header"
      >
        <Header deviceType={device.type || 'desktop'} />
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