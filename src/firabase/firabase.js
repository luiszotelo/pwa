import { initializeApp } from "firebase/app";
import {getFirestore, onSnapshot, doc,addDoc, collection , setDoc, updateDoc, getDoc}  from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBdaB4Pf_OBopQpMHuPYvBsnh3pqKy6m-k",
  authDomain: "prueba-firebase-a957d.firebaseapp.com",
  databaseURL: "https://prueba-firebase-a957d-default-rtdb.firebaseio.com",
  projectId: "prueba-firebase-a957d",
  storageBucket: "prueba-firebase-a957d.appspot.com",
  messagingSenderId: "381566866117",
  appId: "1:381566866117:web:fcf2c6a7a38449dbae96ac",
  measurementId: "G-0S9RZZXLJL"
};

// Initialize Firebase

let fb = null
class Firabase {
  constructor(config) {
    if (!fb) {
      this.app = initializeApp(config)
      this.db = getFirestore(this.app)
    }
  }

  async createService(data) {
    try {
      const docRef = await addDoc(collection(this.db, "service"), data);
      return docRef.id
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  async getService (id) {
    try {
      const querySnapshot = await getDoc(doc(this.db, "service", id));
      return querySnapshot.data()
    } catch(e){
      console.error("Error getting document: ", e);
    }
  }
  async updatePoints(id, newPoints) {
    try {
      // const data = this.getService(id).data().trajectory
      const s = await this.getService(id)
      await updateDoc(doc(this.db, "service", id), {trajectory:[...s.trajectory,newPoints] });
      // updateDoc(doc(db, "tasks", id), newFields);
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  }


  obtenerDocumentoPorID =  async  (documentoID, callback) => {
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




}


export const fbm = new Firabase(firebaseConfig)
