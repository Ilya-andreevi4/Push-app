import { db } from "../firebase";
import { collection, getDocs, getDoc, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";

const pushCollectionRef = collection(db, "pushs");
class PushDataService {
  
  addPush = (newPush:any) => {
    return addDoc(pushCollectionRef, newPush);
  };

  updatePush = (id:any, updatedPush:any) => {
    const pushDoc = doc(db, "pushs", id);
    return updateDoc(pushDoc, updatedPush);
  };

  deletePush = (id:any) => {
    const pushDoc = doc(db, "pushs", id);
    return deleteDoc(pushDoc);
  };

  getAllPushs = () => {
    return getDocs(pushCollectionRef);
  }

  getPush = (id:any) => {
    const pushDoc = doc(db, "pushs", id);
    return getDoc(pushDoc);
  }
}

export default new PushDataService()