importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyCCs0WBQeHiIoJWjbc7IP8GGb7knc9yfJw",
    authDomain: "skycommerce-7fec4.firebaseapp.com",
    projectId: "skycommerce-7fec4",
    storageBucket: "skycommerce-7fec4.firebasestorage.app",
    messagingSenderId: "232403511014",
    appId: "1:232403511014:web:318ebb689d678e998b7d27"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    const { title, body } = payload.notification;
    self.registration.showNotification(title, {
        body,
        icon: '/img/logo_blue.png',
        badge: '/img/logo_blue.png',
        tag: 'new-order',
        requireInteraction: true,
        data: { url: 'https://skycommerce.co.kr/contact/' }
    });
});

self.addEventListener('notificationclick', (e) => {
    e.notification.close();
    e.waitUntil(clients.openWindow('https://skycommerce.co.kr/contact/'));
});