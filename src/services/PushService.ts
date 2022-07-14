import { db } from "../firebase";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import axios from "axios";
import { IPush, LocalPushs } from "../app/models/IPush";
import { localPushs } from "./provider/proxyStates";
import { useUserAuth } from "./provider/AuthProvider";

class PushDataService {
  addPush = (newPush: IPush, userId?: string) => {
    
    
    function spawnNotification() {
      var options = {
        title: newPush.title,
        body: "Вы отправили сообщение: \r\n" + newPush.message,
        icon: "/logo192.png",
        image: newPush.image || null,
      };

      var n = new Notification(newPush.title, options);

      setTimeout(n.close.bind(n), 10000);
    }
    const serverKey = newPush.configsSetting.APIKey;
    const message = {
      to: newPush.configsSetting.deviceToken,
      notification: {
        title: newPush.title,
        body: newPush.message,
        image: newPush.image || "/logo192.png",
      },
      data: {
        time: [new Date().toLocaleTimeString(), new Date().toDateString()]
          .toString()
          .split(",")
          .join(" "),
      },
      fcmOptions: {
        link: "https://test.stroygrad66.ru",
      },
      from: serverKey,
      collapseKey: "green",
    };
    const headers = {
      Authorization: `Bearer ${serverKey}`,
      "Content-Type": "application/json",
    };

    const push = async () => {
      await axios({
        method: "post",
        url: `https://fcm.googleapis.com/fcm/send`,
        data: message,
        headers: headers,
      })
        .then((res) => {
          console.log("Success send push-notification. ", res);
        })
        .catch((e) => {
          console.error("Error with send push-notification! ", e);
        });
    };

    const sendPushNotification = () => {
      console.log(newPush);
      
      if(userId){
        const pushCollectionRef = collection(db, "users/" + userId + "/pushs");
        addDoc(pushCollectionRef, newPush).catch((error) => {
          var errorMessage = error.message;
          console.error(errorMessage);
        });
      } else {
        localPushs.pushs.push(newPush);
        sessionStorage.setItem(
          "pushs",
          JSON.stringify( localPushs )
        );
      }
      spawnNotification();
      push();
    };
    return sendPushNotification();
  };

  updatePush = (id: any, updatedPush: any) => {
    const { user } = useUserAuth();
    if (user) {
      const pushDoc = doc(db, "pushs", id);
      return updateDoc(pushDoc, updatedPush).catch((error) => {
        var errorMessage = error.message;
        console.error(errorMessage);
      });
    } else {
      const updatePushs = localPushs.pushs.map((c: IPush) => {
        if (c.id === updatedPush.id) {
          return updatedPush;
        }
        return c;
      });
      sessionStorage.setItem("pushs", JSON.stringify({ pushs: updatePushs }));
      localPushs.pushs = updatePushs;
    }
  };

  deletePush = (id: any, uid?: string) => {
    if (uid) {
      const pushDoc = doc(db, "users/" + uid + "/pushs", id);
      return deleteDoc(pushDoc).catch((error) => {
        var errorMessage = error.message;
        console.error(errorMessage);
      });
    } else {
      localPushs.pushs.map((p: IPush) => {
        if (p.id === id) {
          var pushIndex = localPushs.pushs.indexOf(p);
          return localPushs.pushs.splice(pushIndex, 1);
        } else return p;
      });
      sessionStorage.setItem("pushs", JSON.stringify(localPushs));
    }
  };

  getAllPushs = (userId?: string) => {
    if (userId) {
      const pushCollectionRef = collection(db, "users/" + userId + "/pushs");
      return getDocs(pushCollectionRef).catch((error) => {
        var errorMessage = error.message;
        console.error(errorMessage);
      });
    } else {
      const isPushList = sessionStorage.getItem("configs");
      if (isPushList) {
        const sessionPushs: LocalPushs = JSON.parse(isPushList);
        if (sessionPushs.pushs) {
          localPushs.pushs = sessionPushs.pushs.map(
            (doc: IPush) => ({ ...doc, id: doc.id } as any)
          );
        }
      } else return;
    }
  };

  getPush = (id: any, uid?: string) => {
    if (uid) {
      const pushDoc = doc(db, "users/" + uid + "/pushs", id);
      return getDoc(pushDoc).catch((error) => {
        var errorMessage = error.message;
        console.error(errorMessage);
      });
    } else {
      const Push = localPushs.pushs.map((p: IPush) => {
        if (p.id === id) {
          return p;
        } else return null;
      });
      return Push;
    }
  };
}

export default new PushDataService();
