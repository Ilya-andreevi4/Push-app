import { db } from "../firebase";
import { collection, getDocs, getDoc, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";

const configCollectionRef = collection(db, "configs");
class ConfigDataService {
  addConfig = (newConfig:any) => {
    return addDoc(configCollectionRef, newConfig);
  };

  updateConfig = (id:any, updatedConfig:any) => {
    const configDoc = doc(db, "configs", id);
    return updateDoc(configDoc, updatedConfig);
  };

  deleteConfig = (id:any) => {
    const configDoc = doc(db, "configs", id);
    return deleteDoc(configDoc);
  };

  getAllConfigs = () => {
    return getDocs(configCollectionRef);
  }

  getConfig = (id:any) => {
    const configDoc = doc(db, "configs", id);
    return getDoc(configDoc);
  }
}

export default new ConfigDataService()