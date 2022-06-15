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
import { pushStatus } from "./provider/updateState";
import axios from "axios";

const pushCollectionRef = collection(db, "pushs");
class PushDataService {
  addPush = (newPush: any) => {
    function spawnNotification() {
      var options = {
        title:pushStatus.titleStatus,
        body: "Вы отправили сообщение: \r\n" + pushStatus.messageStatus,
        icon: "/logo192.png",
        image: pushStatus.imageStatus || null,
      };

      var n = new Notification(pushStatus.titleStatus, options);

      setTimeout(n.close.bind(n), 10000);
    }
    const serverKey = pushStatus.configPush.APIKey;
    const message = {
      to: pushStatus.configPush.deviceToken,
      notification: {
        title: pushStatus.titleStatus,
        body: pushStatus.messageStatus,
        icon: "/logo192.png",
        image: pushStatus.imageStatus || null,
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
      Authorization: `Bearer ${pushStatus.configPush.APIKey}`,
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
