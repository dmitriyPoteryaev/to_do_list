
/**
 * @param {object} defaultState Глобалное состояние 
 * @param {Array}   dataTasks массив всех тасок
 * @param {Array}   storage массив для storage
 * @param {stating}   error  состояние ошибки
 * @param {boolean}   isLoading состояние загрузки
 */

const defaultState = {
  dataTasks: [],
  storage: [],
  error: "",
  isLoading: true,
};

export const GET_DATA_TASKS = "GET_DATA_TASKS";
export const GET_ERROR_TASKS = "GET_ERROR_TASKS";
export const GET_isLoading_TASKS = "GET_isLoading_TASKS";

// storage

export const GET_DATA_STORAGE = "GET_DATA_STORAGE";
/**
 *TasksReducer- функция , которая изменяет глобальное состояние .
 * @param  {object} state Глобальное состояние
 * @param {object} action по action.type reducer ориентируется , что нужно поменять в глобальное состояниии
 * , а action.payload - значение , на которое нужно поменять состояние
 *  @return {object}
 */
export default function TasksReducer(state = defaultState, action) {
  switch (action.type) {
    case GET_DATA_TASKS:
      return { ...state, dataTasks: [...action.payload] };
    case GET_DATA_STORAGE:
      return { ...state, storage: [...action.payload] };
    case GET_ERROR_TASKS:
      return { ...state, error: `${action.payload}` };
    case GET_isLoading_TASKS:
      return { ...state, isLoading: action.payload };

    default:
      return state;
  }
}

// несколько уже готовых функций для изменния глобальных состояний

/**
 *Функция ,связана с изменением глобального состояния dataTasks в Redux
 */
export const setDataTasks = (payload) => ({ type: GET_DATA_TASKS, payload });
/**
 *Функция ,связана с изменением глобального состояния storage в Redux
 */
export const setDataStorage = (payload) => ({
  type: GET_DATA_STORAGE,
  payload,
});
/**
 *Функция ,связана с изменением глобального состояния error в Redux
 */
export const setErrorTasks = (payload) => ({ type: GET_ERROR_TASKS, payload });
/**
 *Функция ,связана с изменением глобального состояния isLoading в Redux
 */
export const setisLoadingTasks = (payload) => ({
  type: GET_isLoading_TASKS,
  payload,
});
