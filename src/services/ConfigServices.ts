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
import { IConfig } from "../app/models/IConfig";

class ConfigDataService {
  addConfig = (newConfig: IConfig, userId: string) => {
    const configCollectionRef = collection(db, "users/" + userId + "/configs");
    return addDoc(configCollectionRef, newConfig);
  };

  updateConfig = (id: any, updatedConfig: any) => {
    const configDoc = doc(db, "configs", id);
    return updateDoc(configDoc, updatedConfig);
  };

  deleteConfig = (id: any, userId: string) => {
    const configDoc = doc(db, "users/" + userId + "/configs", id);
    return deleteDoc(configDoc);
  };

  getAllConfigs = (userId: string) => {
    const configCollectionRef = collection(db, "users/" + userId + "/configs");
    return getDocs(configCollectionRef);
  };

  getConfig = (id: any, userId: string) => {
    const configDoc = doc(db, "users/" + userId + "/configs", id);
    return getDoc(configDoc);
  };
}

export default new ConfigDataService();
