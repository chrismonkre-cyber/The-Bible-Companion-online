// Handles notification permission, SW scheduling, and in-app fallback

const REMINDER_KEY = 'dailyBreadReminder';
const FIRED_TODAY_KEY = 'bc_reminder_fired_date';

/**
 * Request notification permission.
 */
export async function requestPermission() {
  if (!('Notification' in window)) return 'unsupported';
  if (Notification.permission === 'granted') return 'granted';
  const result = await Notification.requestPermission();
  return result;
}

/**
 * Register the SW and send the schedule. Called on save and on app load.
 */
export async function syncScheduleWithSW(reminder) {
  if (!('serviceWorker' in navigator)) return false;
  try {
    const reg = await navigator.serviceWorker.register('/sw.js', { scope: '/' });
    await navigator.serviceWorker.ready;

    // Listen for SW asking us to resend schedule
    navigator.serviceWorker.addEventListener('message', (event) => {
      if (event.data && event.data.type === 'REQUEST_SCHEDULE') {
        const stored = getStoredReminder();
        sendScheduleToSW(stored);
      }
    });

    sendScheduleToSW(reminder);
    return true;
  } catch (e) {
    console.warn('SW registration failed:', e);
  }
  return false;
}

function sendScheduleToSW(reminder) {
  if (!navigator.serviceWorker.controller) return;
  navigator.serviceWorker.controller.postMessage({
    type: 'SCHEDULE_NOTIFICATION',
    time: reminder.time,
    enabled: reminder.enabled && Notification.permission === 'granted',
  });
}

/**
 * Save reminder settings and sync with SW.
 */
export async function saveAndSchedule(reminder) {
  localStorage.setItem(REMINDER_KEY, JSON.stringify(reminder));
  await syncScheduleWithSW(reminder);
  // Also check in-app fallback immediately after saving
  checkAndFireInAppFallback();
}

/**
 * Get stored reminder settings.
 */
export function getStoredReminder() {
  try {
    return JSON.parse(localStorage.getItem(REMINDER_KEY)) || { enabled: false, time: '08:00' };
  } catch {
    return { enabled: false, time: '08:00' };
  }
}

/**
 * In-app fallback: if the reminder time has passed today and we haven't
 * shown it yet, fire a Notification directly (works when app is open).
 * Call this on every app load.
 */
export function checkAndFireInAppFallback() {
  const reminder = getStoredReminder();
  if (!reminder.enabled) return;
  if (!('Notification' in window) || Notification.permission !== 'granted') return;

  const today = new Date().toDateString();
  const lastFired = localStorage.getItem(FIRED_TODAY_KEY);
  if (lastFired === today) return; // Already fired today

  const [hours, minutes] = reminder.time.split(':').map(Number);
  const now = new Date();
  const hasPassedToday =
    now.getHours() > hours ||
    (now.getHours() === hours && now.getMinutes() >= minutes);

  if (hasPassedToday) {
    localStorage.setItem(FIRED_TODAY_KEY, today);
    new Notification('The Bible Companion 🕊️', {
      body: 'Your Daily Bread is ready. Take a moment for peace.',
      icon: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a207975202b78c9fed1d29/bb84683c8_generated_image.png',
      tag: 'daily-reminder',
    });
  }
}

// Legacy exports kept for compatibility
export function shouldShowFallbackPopup() { return false; }
export function markFallbackShownToday() {}
export function reminderTimePassed() {
  const reminder = getStoredReminder();
  if (!reminder.enabled) return false;
  const [hours, minutes] = reminder.time.split(':').map(Number);
  const now = new Date();
  return now.getHours() > hours || (now.getHours() === hours && now.getMinutes() >= minutes);
}