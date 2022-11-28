import { setDataTasks } from "../reducers/TasksReducer";
import { setErrorTasks } from "../reducers/TasksReducer";
import { setisLoadingTasks } from "../reducers/TasksReducer";
import { ContentServies } from "../../API/ContentServies";

export const GetTask = () => {
  return async function (dispatch) {
    try {
      let res = await ContentServies.GetQuery();
      let data = res.docs.map((elem) => {
        return { ...elem.data(), id: elem.id };
      });

      dispatch(setDataTasks(data));
    } catch (e) {
      dispatch(setErrorTasks(e.message));
    } finally {
      dispatch(setisLoadingTasks(false));
    }
  };
};
