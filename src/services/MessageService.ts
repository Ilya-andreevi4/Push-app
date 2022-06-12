
import axios from 'axios';
import { getMessaging, getToken } from 'firebase/messaging';
import { useEffect } from 'react';
import { useSnapshot } from 'valtio';
import { userToken } from '../routes/Main/PushList/updateState';

function MessageService() {
  const messaging = getMessaging();
  const snap: any = useSnapshot(userToken);
  const isTokenSentToServer=(currentToken: any) => {
    return (
      window.localStorage.getItem("sentFirebaseMessagingToken") === currentToken
    );
  }

  const setTokenSentToServer=(currentToken: any)=> {
    window.localStorage.setItem(
      "sentFirebaseMessagingToken",
      currentToken ? currentToken : ""
    );
  }

 const sendTokenToServer= async(currentToken: any) => {
    if (!isTokenSentToServer(currentToken)) {
      try {
        const formData = new FormData();
        formData.append('token', currentToken)
        const response = await axios.post(
          `https://firestore.googleapis.com/v1/projects/test-e97df/databases/(default)/documents/userTokens`,
          formData,
          { headers: { Authorization: `Bearer 104246255864963682409` } }
        );
        
        console.log("token success sended");
        sendTokenToServer(response.data)
        setTokenSentToServer(currentToken);
      } catch (e) {
        console.log("Error with send token. ", e);
      }
    } else {
      console.log("Токен уже отправлен на сервер.");
    }
  }
  
  function requestPermission() {
    return new Promise(function (resolve, reject) {
      const permissionResult = Notification.requestPermission(function (
        result
      ) {
        // Поддержка устаревшей версии с функцией обратного вызова.
        resolve(result);
      });
      if (permissionResult) {
        permissionResult.then(resolve, reject);
      }
    }).then(function (permissionResult) {
      if (permissionResult !== "granted") {
        throw new Error("Permission not granted.");
      }
    });
  }

  useEffect(() => {
    getToken(messaging, {
      vapidKey:
        "BMe3lq08yT-UDNxnrAQfnL1nroniS30iZ_uxjf8oSnmvSVbgWW7HacH7Gp3c43AVTGOKxCXnRsN6kY1dX58RiQE",
    })
      .then( async (currentToken) => {
        if (currentToken) {
          console.log("try to send token:", currentToken);
          // Send the token to your server and update the UI if necessary
          try {
            userToken.token=currentToken;
            sendTokenToServer(currentToken);
            console.log("try to send token:", currentToken);
          } catch (e) {
            console.log("Error occurred while retrieving token. ", e);
          }
        } else {
          requestPermission();
        }
      })
      .catch((err) => {
        console.log("An error occurred while retrieving token. ", err);
        // ...
      });
  }, [])

  window.addEventListener("load", async () => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/firebase-messaging-sw.js")
        .then(function (reg) {
          // регистрация сработала
        })
        .catch(function (error) {
          // регистрация прошла неудачно
          console.log("SW registration failed with: " + error);
        });
    }
  });
}
export default MessageService
  
