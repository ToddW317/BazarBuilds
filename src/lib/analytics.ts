import { Analytics, logEvent } from 'firebase/analytics';
import { analytics } from './firebase';

export const trackEvent = (eventName: string, eventParams?: Record<string, any>) => {
  if (analytics) {
    logEvent(analytics, eventName, eventParams);
  }
}; 