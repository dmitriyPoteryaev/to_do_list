import { setDataTasks } from "./TasksReducer";
import { setDataStorage } from "./TasksReducer";
import { setErrorTasks } from "./TasksReducer";
import { setisLoadingTasks } from "./TasksReducer";
import { ContentServies } from "../../API/ContentServies";

import { getDownloadURL } from "firebase/storage";


 /**
   *Функция предназначена для работы со всеми глобалными состояниями в проекте:error,dataTasks,storage,isLoading
   */
export const GetTaskStorage = () => {
  return async function (dispatch) {
    try {
      const res = await Promise.all([
        ContentServies.GetTask(),
        ContentServies.GetStorage(),
      ]);

      const infoStorage = await Promise.all(
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
      dispatch(setDataStorage(infoStorage));
    } catch (e) {
      dispatch(setErrorTasks(e.message));
    } finally {
      dispatch(setisLoadingTasks(false));
    }
  };
};
