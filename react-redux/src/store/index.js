import { createStore } from "redux";

const initialState = {
  todoList: [
    { id: 0, text: "Finish 18 section", completed: false },
    { id: 1, text: "Finish 19 section", completed: false },
  ],
  visibilityFilter: "SHOW_ALL", //SHOW_COMPLETED, SHOW_ACTIVE,
};

const todoReducer = (state = initialState, action) => {
  if (action.type === "ADD_TODO") {
    const newTodo = {
      id: state.todoList[state.todoList.length - 1].id + 1,
      text: action.payload,
      completed: false,
    };
    return {
      ...state,
      todoList: state.todoList.concat(newTodo),
    };
  }
  if (action.type === "TOGGLE_TODO") {
    const index = state.todoList.findIndex((todo) => todo.id === action.id);
    const toggled = {
      ...state.todoList[index],
      completed: !state.todoList[index].completed,
    };
    const updated = [
      ...state.todoList.slice(0, index),
      toggled,
      ...state.todoList.slice(index + 1),
    ];

    return {
      ...state,
      todoList: updated,
    };
  }

  if (action.type === "SHOW_ALL") {
    return {
      ...state,
      visibilityFilter: action.type,
    };
  }
  if (action.type === "SHOW_COMPLETED") {
    return {
      ...state,
      visibilityFilter: action.type,
    };
  }
  if (action.type === "SHOW_ACTIVE") {
    return {
      ...state,
      visibilityFilter: action.type,
    };
  }
  return state;
};

const visibilityFilter = (state = "SHOW_ALL", action) => {};
const store = createStore(todoReducer);

export default store;
