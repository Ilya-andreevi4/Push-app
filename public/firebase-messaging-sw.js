import { getMessaging, getToken } from "firebase/messaging";

// Get registration token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.
const messaging = getMessaging();
getToken(messaging, { vapidKey: "BMe3lq08yT-UDNxnrAQfnL1nroniS30iZ_uxjf8oSnmvSVbgWW7HacH7Gp3c43AVTGOKxCXnRsN6kY1dX58RiQE" }).then((currentToken) => {
  if (currentToken) {
    console.log(currentToken);
  } else {
    // Show permission request UI
    console.log('No registration token available. Request permission to generate one.');
    // ...
  }
}).catch((err) => {
  console.log('An error occurred while retrieving token. ', err);
  // ...
});