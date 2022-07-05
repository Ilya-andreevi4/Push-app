import { addDoc, collection } from "firebase/firestore";
import { getMessaging, getToken } from "firebase/messaging";
import { useEffect } from "react";
import { db } from "../firebase";
import { userToken } from "./provider/proxyStates";

function MessageService() {
  const messaging = getMessaging();
  const isTokenSentToServer = (currentToken: any) => {
    return (
      window.localStorage.getItem("sentFirebaseMessagingToken") === currentToken
    );
  };

  const setTokenSentToServer = (currentToken: any) => {
    window.localStorage.setItem(
      "sentFirebaseMessagingToken",
      currentToken ? currentToken : ""
    );
  };

  const sendTokenToServer = async (currentToken: any) => {
    if (!isTokenSentToServer(currentToken)) {
      try {
        const configCollectionRef = collection(db, "userTokens");
        const token = {
          token: currentToken,
          time: [
            new Date().toLocaleTimeString(),
            new Date().toDateString(),
          ]
            .toString()
            .split(",")
            .join(" "),
        };
        addDoc(configCollectionRef, token)
          .then((response) => {
            console.log("token success sended", response);
          })
          .catch((err) => {
            console.error("err with send token", err);
          });
        setTokenSentToServer(currentToken);
      } catch (e) {
        console.log("Error with send token. ", e);
      }
    } else {
      console.log("Токен уже отправлен на сервер.");
    }
  };

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
      .then(async (currentToken) => {
        if (currentToken) {
          // Send the token to your server and update the UI if necessary
          try {
            userToken.token = currentToken;
            console.log("try to send token:", currentToken);
            sendTokenToServer(currentToken);
          } catch (e) {
            console.log("Error while retrieving token. ", e);
          }
        } else {
          requestPermission();
        }
      })
      .catch((err) => {
        console.log("An error occurred while retrieving token. ", err);
        // ...
      });
  }, []);

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
export default MessageService;
