import { initializeApp } from "firebase/app";
import {
  getFirestore,
  onSnapshot,
  query,
  doc,
  addDoc,
  collection,
  updateDoc,
  getDoc,
  where,
  setDoc,
} from "firebase/firestore";
console.log(import.meta.env.VITE_ID_DB);
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY_FB,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_DATABASE_URL,
  projectId: import.meta.env.VITE_ID_DB,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

// Initialize Firebase

let fb = null;
class Firabase {
  constructor(config) {
    if (!fb) {
      this.app = initializeApp(config);
      this.db = getFirestore(this.app);
    }
  }

  async createService(ideService, data) {
    //find service with idService
    //if exist return id
    //else create new service
    try {
      const doc2 = doc(this.db, "service", `${ideService}`);
      const d = await getDoc(doc2);
      if (d.exists()) {
        return d.id;
      }
      await setDoc(doc(collection(this.db, "service"), `${ideService}`), data);
      return ideService;
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  async getService(id) {
    try {
      const querySnapshot = await getDoc(doc(this.db, "service", id));
      return querySnapshot.data()
    } catch (e) {
      console.error("Error getting document: ", e);
    }
  }
  async updatePoints(id, newPoints) {
    try {
      // const data = this.getService(id).data().trajectory
      const s = await this.getService(id);
      await updateDoc(doc(this.db, "service", id), {
        trajectory: [...s.trajectory, newPoints],
      });
      // updateDoc(doc(db, "tasks", id), newFields);
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  }

  async updateStatusAlert(id) {
    console.log(id);
    try {
      await updateDoc(doc(this.db, "alertService", id), {
        atendida: true,
      });
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  }

  obtenerDocumentoPorID = async (documentoID, callback) => {
    const documentRef = await doc(this.db, "service", documentoID);

    const unsubscribe = await onSnapshot(documentRef, (doc) => {
      if (doc.exists()) {
        const datos = doc.data();

        // Llama al callback y pasa los datos del documento
        callback(datos);
      } else {
        console.log("El documento no existe.");
      }
    });

    return unsubscribe;
  };

  updateStatus = async (id, toChange) => {
    try {
      await updateDoc(doc(this.db, "service", id), toChange);
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  };

  async createAlertService(data) {
    try {
      const docRef = await addDoc(collection(this.db, "alertService"), data);
      console.log("Document written with ID: ", docRef);
      return docRef.id;
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  async observarAlert(callback) {
    const q = query(
      collection(this.db, "alertService"),
      where("atendida", "==", false)
    );
    const unsubscribe = await onSnapshot(q, (querySnapshot) => {
      const alerts = [];
      querySnapshot.forEach((doc) => {
        alerts.push({ id: doc.id, ...doc.data() });
      });
      callback(alerts);
    });
    return unsubscribe;
  }

  async observarServices(callback) {
    const q = query(
      collection(this.db, "service"),
      where("completed", "==", false)
    );
    const unsubscribe = await onSnapshot(q, (querySnapshot) => {
      const services = [];
      querySnapshot.forEach((doc) => {
        services.push({ id: doc.id, ...doc.data() });
      });
      callback(services);
    });
    return unsubscribe;
  }
}

export const fbm = new Firabase(firebaseConfig);
