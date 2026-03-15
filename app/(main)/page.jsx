import SectionTracker from '@/components/SectionsTracker';

import Hero from '@/components/sections/Hero/Hero';
import About from '@/components/sections/About/About';
import Services from '@/components/sections/Services/Services';
import Spotlight from '@/components/sections/Spotlight/Spotlight';
import Process from '@/components/sections/Process/Process';
import Pricing from '@/components/sections/Pricing/Pricing';
import FAQ from '@/components/sections/FAQ/FAQ';
import ContactUs from '@/components/sections/ContactUs/ContactUs';

import { plans, faqs } from '@/app/data.json';
import styles from './page.module.css';

export default async function Home() {

  const jsonLd = {
    '@context': 'https://schema.org',
    "@graph": [
      {
        '@type': 'LocalBusiness',
        'name': 'רייזר',
        'url': 'https://riser.co.il',
        'logo': 'https://riser.co.il/logo.svg',
        'description': 'סטודיו לבניית אתרים ואפלקציות.',
        'email': 'hello@riser.co.il',
        'telephone': '+972-50-4840588',
        'address': {
          '@type': 'דרך הבוסתן, קיבוץ כפר גליקסון',
          'addressCountry': 'IL',
          'addressLocality': 'קיבוץ כפר גליקסון'
        },
        'contactPoint': {
          '@type': 'ContactPoint',
          'telephone': '+972-50-4840588',
          'email': 'hello@riser.co.il',
          'contactType': 'customer service'
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      },
      {
        '@type': 'ItemList',
        'itemListElement': plans.projects.map((plan, index) => ({
          '@type': 'ListItem',
          'position': index + 1,
          'item': {
            '@type': 'Product',
            'name': `${plan.name} Plan`,
            'offers': {
              '@type': 'Offer',
              'price': plan.price,
              'priceCurrency': plan.currency,
              'url': `https://riser.co.il#pricing-plan-${plan.id}`
            }
          }
        }))
      }
    ]
  }

  return (
    <>
      <main className={styles['home']}>
        <SectionTracker
          sectionName="Hero"
          elId="hero-section"
        >
          <Hero />
        </SectionTracker>

        <SectionTracker
          sectionName="About"
          elId="about-section"
        >
          <About />
        </SectionTracker>

        {/* <SectionTracker
          sectionName="Services"
          elId="services-section"
        >
          <Services />
        </SectionTracker> */}

        <SectionTracker
          sectionName="Spotlight"
          elId="spotlight-section"
        >
          <Spotlight />
        </SectionTracker>

        <SectionTracker
          sectionName="Process"
          elId="process-section"
        >
          <Process />
        </SectionTracker>

        <SectionTracker
          sectionName="Pricing"
          elId="pricing-section"
        >
          <Pricing plans={plans} />
        </SectionTracker>


        <SectionTracker
          sectionName="FAQ"
          elId="faq-section"
        >
          <FAQ faqs={faqs} />
        </SectionTracker>

        <SectionTracker
          sectionName="Contact"
          elId="contact-section"
        >
          <ContactUs />
        </SectionTracker>
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}