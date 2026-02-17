export const sendGAEvent = (eventName, params) => {
  console.log('sent GA event:', eventName, params);
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params);
  }
};