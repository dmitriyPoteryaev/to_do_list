import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

//Initialize Firebase
const app = firebase.initializeApp({
  apiKey: "AIzaSyDoPPphgEGAyZRmTEfP25qH-5TxgFOmA24",
  authDomain: "to-do-list-17b94.firebaseapp.com",
  projectId: "to-do-list-17b94",
  storageBucket: "to-do-list-17b94.appspot.com",
  messagingSenderId: "5810038808",
  appId: "1:5810038808:web:577c6843ed358e01a93b6d",
  measurementId: "G-SG29PZFMPB",
});

const db = firebase.firestore();

export class ContentServies {
  // всё для firebase

  static async changeValue(id, cur_value) {
    db.collection("messages").doc(id).update({
      Desctiption: cur_value,
    });
  }

  static async removeTask(id) {
    db.collection("messages").doc(id).delete();
  }

  static async changeStatus(id, status) {
    db.collection("messages").doc(id).update({
      active: status,
    });
  }

  static async addTask(taskObj) {
    db.collection("messages").add(taskObj);
  }

  static async getApp() {
  
    return app;
  }

  static async GetQuery() {
    const response = await db.collection("messages").get();

    return response;
  }
}
