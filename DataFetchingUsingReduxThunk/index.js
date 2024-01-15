const { default: axios } = require("axios");
const { createStore, applyMiddleware } = require("redux");
const thunkMiddleware = require("redux-thunk").default;

// constant
const GET_TODOS_REQUEST = "GET_TODOS_REQUEST";
const GET_TODOS_FAILED = "GET_TODOS_FAILED";
const GET_TODOS_SUCCESS = "GET_TODOS_SUCCESS";
const API_URL = "https://jsonplaceholder.typicode.com/todos";

// state
const initialTodosState = {
  isLoading: false,
  todos: [],
  error: null,
};

// action types
const getTodosRequest = () => {
  return {
    type: GET_TODOS_REQUEST,
  };
};

const getTodosFailed = (error) => {
  return {
    type: GET_TODOS_FAILED,
    payload: error,
  };
};

const getTodosSuccess = (todos) => {
  return {
    type: GET_TODOS_SUCCESS,
    payload: todos,
  };
};

// reducer
const todosReducer = (state = initialTodosState, action) => {
  switch (action.type) {
    case GET_TODOS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_TODOS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        todos: action.payload,
      };
    case GET_TODOS_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

// async action creator
const fetchData = () => {
  return (dispatch) => {
    dispatch(getTodosRequest());
    axios
      .get(API_URL)
      .then((response) => {
        const todos = response.data;
        const titles = todos.map((todo) => todo.title);
        dispatch(getTodosSuccess(titles));
      })
      .catch((error) => {
        const errorMessage = error.message;
        dispatch(getTodosFailed(errorMessage));
      });
  };
};

// store
const store = createStore(todosReducer, applyMiddleware(thunkMiddleware));

store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(fetchData());
