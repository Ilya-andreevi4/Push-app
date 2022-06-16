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
import { IPush } from "../app/models/IPush";

const pushCollectionRef = collection(db, "pushs");
class PushDataService {
  addPush = (newPush: IPush) => {
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
        image: newPush.image||"/logo192.png",
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

    // ToDo
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
      addDoc(pushCollectionRef, newPush);
      spawnNotification();
      push();
    };
    return sendPushNotification();
  };

  updatePush = (id: any, updatedPush: any) => {
    const pushDoc = doc(db, "pushs", id);
    return updateDoc(pushDoc, updatedPush);
  };

  deletePush = (id: any) => {
    const pushDoc = doc(db, "pushs", id);
    return deleteDoc(pushDoc);
  };

  getAllPushs = () => {
    return getDocs(pushCollectionRef);
  };

  getPush = (id: any) => {
    const pushDoc = doc(db, "pushs", id);
    return getDoc(pushDoc);
  };
}

export default new PushDataService();
