// Service Worker for Bible Companion - Daily Reminders
const REMINDER_KEY = 'dailyBreadReminder';
const FIRED_KEY = 'bc_reminder_fired_date';

let scheduledTimer = null;

function scheduleNotification(time, enabled) {
  // Clear any existing timer
  if (scheduledTimer) {
    clearTimeout(scheduledTimer);
    scheduledTimer = null;
  }

  if (!enabled) return;

  const [hours, minutes] = time.split(':').map(Number);
  const now = new Date();
  const target = new Date();
  target.setHours(hours, minutes, 0, 0);

  // If time already passed today, schedule for tomorrow
  if (target <= now) {
    target.setDate(target.getDate() + 1);
  }

  const msUntil = target.getTime() - now.getTime();

  scheduledTimer = setTimeout(() => {
    fireNotification();
    // Re-schedule for tomorrow
    scheduleNotification(time, true);
  }, msUntil);
}

function fireNotification() {
  self.registration.showNotification('The Bible Companion 🕊️', {
    body: 'Your Daily Bread is ready. Take a moment for peace.',
    icon: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a207975202b78c9fed1d29/bb84683c8_generated_image.png',
    badge: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a207975202b78c9fed1d29/bb84683c8_generated_image.png',
    tag: 'daily-reminder',
    renotify: true,
    data: { url: '/' },
  });
}

// Listen for messages from the app
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SCHEDULE_NOTIFICATION') {
    const { time, enabled } = event.data;
    scheduleNotification(time, enabled);
  }
});

// When notification is clicked, open the app
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if ('focus' in client) return client.focus();
      }
      return clients.openWindow('/');
    })
  );
});

// On SW activation, re-read schedule from all clients
self.addEventListener('activate', (event) => {
  event.waitUntil(
    clients.claim().then(() => {
      // Ask all clients to resend schedule
      return clients.matchAll({ type: 'window' }).then((clientList) => {
        clientList.forEach((client) => {
          client.postMessage({ type: 'REQUEST_SCHEDULE' });
        });
      });
    })
  );
});

self.addEventListener('install', () => {
  self.skipWaiting();
});
