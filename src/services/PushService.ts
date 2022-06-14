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
import { pushStatus, userToken } from "./provider/updateState";
import axios from "axios";

const pushCollectionRef = collection(db, "pushs");
class PushDataService {
  addPush = (newPush: any) => {
    function spawnNotification() {
      var options = {
        body:
          pushStatus.messageStatus +
          "\r\n" +
          "Это сообщение самоликвидируется через 10 секунд.",
        icon: "/logo192.png",
        image: pushStatus.imageStatus || null,
      };

      var n = new Notification(pushStatus.titleStatus, options);

      setTimeout(n.close.bind(n), 10000);
    }
    const serverKey =
      "AAAAC2hIGTU:APA91bHe6DmQgfd45dWKMhWwX4lb0M4pAMZu18Tml5rlwyMzPQ10y-qXPaZlCUQUaxxF8vk3ndqfrpJ4AmvJgl23ZpGitXXO4xAkZKagQwl0yTr6JV0t47EsTNUgVMM0mCR6xwG1AdN5";
    const message = {
      token: userToken.token,
      notification: {
        title: pushStatus.titleStatus,
        body: pushStatus.messageStatus,
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
      messageId: userToken.id,
    };
    const headers = {
      Authorization: `Bearer ${serverKey}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    const push = async () => {
      await axios({
        method: "post",
        url: `https://fcm.googleapis.com/v1/test-e97df/messages:send?key=${serverKey}`,
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
      // spawnNotification();
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
