import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { getStorage, deleteObject } from "firebase/storage";
import { ref, listAll } from "firebase/storage";

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

  /**
   *Функция предназначена для изменения описания конкретной таски в БД firebase
   * @param {string} id  уникальный id конкретной таски в БД firebase
   * @param {string} cur_value  новое описание конкретной таски в БД firebase
   */
  static async changeValue(id, cur_value) {
    db.collection("messages").doc(id).update({
      Desctiption: cur_value,
    });
  }
  /**
   *Функция предназначена для удаления конкретной таски в БД firebase
   * @param {string} id  уникальный id конкретной таски в БД firebase
   */
  static async removeTask(id) {
    db.collection("messages").doc(id).delete();
  }
  /**
   *Функция предназначена для изменения статуса конкретной таски в БД firebase
   * @param {string} id  уникальный id конкретной таски в БД firebase
   *  @param {string} status   новый статус конкретной таски в БД firebase
   */
  static async changeStatus(id, status) {
    db.collection("messages").doc(id).update({
      active: status,
    });
  }
  /**
   *Функция предназначена для добавления таски в БД firebase
   * @param {object} taskObj  объект с полным описанием добавленной таски
   */
  static async addTask(taskObj) {
    db.collection("messages").add(taskObj);
  }
  // WORK WITH STORAGE

  static getApp() {
    const storage = getStorage(app);

    return storage;
  }
  /**
   *Функция предназначена для получения всех тасок из firebase
   * @return {object} response
   */
  static async GetTask() {
    const response = await db.collection("messages").get();

    return response;
  }
  /**
   *Функция предназначена для получения всех тасок из firebase
   * @return  {object} response
   */
  static async GetStorage() {
    const fileListRef = ref(ContentServies.getApp());

    const response = await listAll(fileListRef);

    return response;
  }
  /**
   *Функция предназначена для удаления конкретного файла из storage firebase
   * @param {object} obj
   */
  static async DeleteFile(obj) {
    deleteObject(obj);
  }
}
