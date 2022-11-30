import { setDataTasks } from "../reducers/TasksReducer";
import { setDataStorage } from "../reducers/TasksReducer";
import { setErrorTasks } from "../reducers/TasksReducer";
import { setisLoadingTasks } from "../reducers/TasksReducer";
import { ContentServies } from "../../API/ContentServies";

import { getDownloadURL, contentType } from "firebase/storage";

export const GetTask = () => {
  return async function (dispatch) {
    try {
      const res = await Promise.all([
        ContentServies.GetQuery(),
        ContentServies.GetStorage(),
      ]);

      const urls = await Promise.all(
        res[1].items.map(async (item) => {
          return {
            url: await getDownloadURL(item),
            name: item._location.path_,
          };
        })
      );

      const tasks = res[0].docs.map((elem) => {
        return { ...elem.data(), id: elem.id };
      });

      dispatch(setDataTasks(tasks));
      dispatch(setDataStorage(urls));
    } catch (e) {
      dispatch(setErrorTasks(e.message));
    } finally {
      dispatch(setisLoadingTasks(false));
    }
  };
};
