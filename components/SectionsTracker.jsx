"use client";
import { useEffect } from 'react';
import { sendGAEvent } from '../utils/analytics';

export default function SectionTracker({ sectionName, elId, children }) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            sendGAEvent('section_view', {
              section_name: sectionName
            });
            // Optional: Stop observing after first view to avoid spamming data
            observer.disconnect();
          }
        });
      },
      { threshold: 0.5 } // Trigger when 50% of the section is visible
    );

    const element = document.getElementById(elId);
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [sectionName]);

  return children;
}