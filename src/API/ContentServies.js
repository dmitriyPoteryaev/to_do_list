import axios from "axios";

export class ContentServies {
  // ранее здесь был локальный url .За счёт этого фронт куртился на локальному порту через json-server

  static async GetQuery() {
    const response = await axios.get(
      "https://my-json-server.typicode.com/falk20/demo/todos"
    );

    return response;
  }
}
