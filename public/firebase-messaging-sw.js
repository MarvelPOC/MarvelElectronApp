importScripts("https://www.gstatic.com/firebasejs/7.19.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/7.19.0/firebase-messaging.js");

var firebaseConfig = {
  apiKey: "AIzaSyA31YXiyqRA4Vxj5Dk8IpNVce2C_87SA64",
  authDomain: "webpushnotification-9f8e4.firebaseapp.com",
  databaseURL: "https://webpushnotification-9f8e4.firebaseio.com",
  projectId: "webpushnotification-9f8e4",
  storageBucket: "webpushnotification-9f8e4.appspot.com",
  messagingSenderId: "595856955925",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
  const promiseChain = clients
    .matchAll({
      type: "window",
      includeUncontrolled: true
    })
    .then(windowClients => {
      for (let i = 0; i < windowClients.length; i++) {
        const windowClient = windowClients[i];
        windowClient.postMessage(payload);
      }
    })
    .then(() => {
      //return registration.showNotification("Notification Title");
    });
  return promiseChain;
});

self.addEventListener('notificationclick', function(event) {
  // Event Listner
});
