const defaultState = {
  dataTasks: [],
  error: "",
  isLoading: true,
};


export const GET_DATA_TASKS = "GET_DATA_TASKS";
export const ADD_DATA_TASK = "ADD_DATA_TASK";
export const GET_ERROR_TASKS = "GET_ERROR_TASKS";
export const GET_isLoading_TASKS = "GET_isLoading_TASKS";

export default function TasksReducer(state = defaultState, action) {
  switch (action.type) {
    case GET_DATA_TASKS:
      return    {...state , dataTasks : [...action.payload]  }
    case ADD_DATA_TASK:
      return { ...state, dataTasks: [...state.dataTasks , action.payload]  };
    case GET_ERROR_TASKS:
      return { ...state, error: `${action.payload}` };
    case GET_isLoading_TASKS:
      return { ...state, isLoading: action.payload };

    default:
      return state;
  }
}

export const setDataTasks = (payload) => ({ type: GET_DATA_TASKS, payload });
export const setNewTask = (payload) => ({ type: ADD_DATA_TASK, payload });
export const setErrorTasks = (payload) => ({ type: GET_ERROR_TASKS, payload });
export const setisLoadingTasks = (payload) => ({type: GET_isLoading_TASKS, payload});
