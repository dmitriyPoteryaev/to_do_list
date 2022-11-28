import { useSelector, useDispatch } from "react-redux";

export const useAddTask = (task) => {
  const dispatch = useDispatch();

  
      console.log('здесь');
      const taskObj = {
        text: task,
        active: false,
      };

  
        dispatch({ type: "ADD_DATA_TASKS", payload: taskObj });

};
