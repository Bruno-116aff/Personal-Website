export const analyticsEventNames = [
  'case_study_open',
  'cv_click',
  'email_click',
  'linkedin_click',
  'telegram_click',
  'github_click',
] as const;

export type AnalyticsEventName = (typeof analyticsEventNames)[number];
type AnalyticsEventParams = Record<string, string | number | boolean>;

declare global {
  interface Window {
    dataLayer?: unknown[][];
    gtag?: (...args: unknown[]) => void;
  }
}

const configuredMeasurementId = getConfiguredMeasurementId();
const sentEventKeys = new Set<string>();
let isInitialized = false;

export const ga4CspSources = {
  scriptSrc: ['https://www.googletagmanager.com'],
  connectSrc: ['https://www.google-analytics.com', 'https://region1.google-analytics.com'],
} as const;

export function normalizeMeasurementId(value: string | undefined) {
  const measurementId = value?.trim().toUpperCase();
  return measurementId && /^G-[A-Z0-9]+$/.test(measurementId) ? measurementId : null;
}

function getConfiguredMeasurementId() {
  if (typeof window === 'undefined') return null;
  return normalizeMeasurementId(import.meta.env.VITE_GA4_MEASUREMENT_ID);
}

function canUseBrowser() {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}

export function isAnalyticsEnabled() {
  return Boolean(configuredMeasurementId);
}

export function initializeAnalytics() {
  if (!configuredMeasurementId || !canUseBrowser()) return false;
  if (isInitialized) return true;

  window.dataLayer ??= [];
  window.gtag ??= (...args: unknown[]) => {
    window.dataLayer?.push(args);
  };

  const scriptSelector = `script[data-ga4-measurement-id="${configuredMeasurementId}"]`;
  if (!document.querySelector(scriptSelector)) {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(configuredMeasurementId)}`;
    script.dataset.ga4MeasurementId = configuredMeasurementId;
    document.head.append(script);
  }

  window.gtag('js', new Date());
  window.gtag('config', configuredMeasurementId);
  isInitialized = true;
  return true;
}

export function trackAnalyticsEvent(
  eventName: AnalyticsEventName,
  params?: AnalyticsEventParams,
) {
  if (!initializeAnalytics()) return false;

  window.gtag?.('event', eventName, params);
  return true;
}

export function trackAnalyticsEventOnce(
  key: string,
  eventName: AnalyticsEventName,
  params?: AnalyticsEventParams,
) {
  if (!isAnalyticsEnabled() || sentEventKeys.has(key)) return false;

  const wasTracked = trackAnalyticsEvent(eventName, params);
  if (wasTracked) sentEventKeys.add(key);
  return wasTracked;
}
