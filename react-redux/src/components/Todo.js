import { useSelector, useDispatch } from "react-redux";
import { useRef } from "react";
import classes from "./Counter.module.css";

const Todo = () => {
  const todoInputRef = useRef();
  const dispatch = useDispatch();
  const todoList = useSelector((state) => state.todoList);
  const visibilityFilter = useSelector((state) => state.visibilityFilter);

  const filterTodos = () => {
    switch (visibilityFilter) {
      case "SHOW_ALL":
        return todoList;
      case "SHOW_COMPLETED":
        return todoList.filter((todo) => todo.completed);
      case "SHOW_ACTIVE":
        return todoList.filter((todo) => !todo.completed);
    }
  };

  const todos = filterTodos();

  const addTodoHandler = () => {
    dispatch({ type: "ADD_TODO", payload: todoInputRef.current.value });
    todoInputRef.current.value = "";
  };

  const todoCompletedHandler = (id) => {
    dispatch({ type: "TOGGLE_TODO", id: id });
  };

  const visibilityFilterHandler = (type) => {
    dispatch({ type: type });
  };

  return (
    <main className={classes.counter}>
      <input ref={todoInputRef} type="text" />
      <button onClick={addTodoHandler}>+</button>
      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{
              textDecoration: todo.completed ? "line-through" : "none",
            }}
            onClick={() => todoCompletedHandler(todo.id)}
          >
            {todo.text}
          </li>
        ))}
      </ul>
      <h1>Current: {visibilityFilter}</h1>
      <button onClick={() => visibilityFilterHandler("SHOW_ALL")}>All</button>
      <button onClick={() => visibilityFilterHandler("SHOW_COMPLETED")}>
        Completed
      </button>
      <button onClick={() => visibilityFilterHandler("SHOW_ACTIVE")}>
        Active
      </button>
    </main>
  );
};

export default Todo;
