const ul = document.querySelector("ul");
const addBtn = document.getElementById("addTodo");
const showAllBtn = document.getElementById("show-all");
const showCompletedBtn = document.getElementById("show-completed");
const showActiveBtn = document.getElementById("show-active");

const initialState = {
  todoList: [
    { id: 0, text: "Finish 18 section", completed: false },
    { id: 1, text: "Finish 19 section", completed: false },
  ],
  visibilityFilter: "SHOW_ALL", //SHOW_COMPLETED, SHOW_ACTIVE,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_TODO":
      const newTodo = {
        id: state.todoList[state.todoList.length - 1].id + 1,
        text: action.input,
        completed: false,
      };
      return {
        ...state,
        todoList: state.todoList.concat(newTodo),
      };
    case "TOGGLE":
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

    case "SHOW_ALL":
      return {
        ...state,
        visibilityFilter: action.type,
      };
    case "SHOW_COMPLETED":
      return {
        ...state,
        visibilityFilter: action.type,
      };
    case "SHOW_ACTIVE":
      return {
        ...state,
        visibilityFilter: action.type,
      };
    default:
      return state;
  }
}
const store = Redux.createStore(reducer);

function filterVisibilityHandler(filter) {
  const todos = store.getState().todoList;
  switch (filter) {
    case "SHOW_ALL":
      return todos;
    case "SHOW_COMPLETED":
      return todos.filter((todo) => todo.completed);
    case "SHOW_ACTIVE":
      return todos.filter((todo) => !todo.completed);
  }
}

function render() {
  const visibilityFilter = store.getState().visibilityFilter;
  const todos = filterVisibilityHandler(visibilityFilter);
  ul.innerHTML = "";
  todos.map((todo) => {
    const tag = document.createElement("li");
    const text = document.createTextNode(todo.text);

    tag.appendChild(text);
    tag.addEventListener("click", () =>
      store.dispatch({ type: "TOGGLE", id: todo.id })
    );

    ul.appendChild(tag);
    todo.completed && tag.classList.add("striked");
  });
}

render();
store.subscribe(render);

addBtn.addEventListener("click", () => {
  const userInput = document.querySelector("input");
  store.dispatch({ type: "ADD_TODO", input: userInput.value });
  userInput.value = "";
});

showAllBtn.addEventListener("click", () =>
  store.dispatch({ type: "SHOW_ALL" })
);
showCompletedBtn.addEventListener("click", () =>
  store.dispatch({ type: "SHOW_COMPLETED" })
);
showActiveBtn.addEventListener("click", () =>
  store.dispatch({ type: "SHOW_ACTIVE" })
);
