import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTodos } from "../redux/todoSlice";
import FilterButtons from "./FilterButtons";
import EditTodoForm from "./EditTodoForm";
import TodoItem from "./TodoItem";

const ListTodos = () => {
  const todos = useSelector((state) => state.todos.todos);
  const loading = useSelector((state) => state.todos.status);
  const filterStatus = useSelector((state) => state.todos.filterStatus);
  const auth = useSelector((state) => state.todos.auth);
  const editTodo = useSelector((state) => state.todos.editTodo);
  const [filteredTodos, setFilteredTodos] = useState(todos);
  const [paginatedTodos, setPaginatedTodos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const todos_per_page = 3;
  const dispatch = useDispatch();

  const filterHandler = () => {
    switch (filterStatus) {
      case "All":
        setFilteredTodos(todos);
        break;
      case "usernameAscending":
        setFilteredTodos(
          [...todos].sort((a, b) => {
            return a.username.length - b.username.length;
          })
        );
        break;
      case "usernameDescending":
        setFilteredTodos(
          [...todos].sort((a, b) => {
            return b.username.length - a.username.length;
          })
        );
        break;
      case "emailAscending":
        setFilteredTodos(
          [...todos].sort((a, b) => {
            return a.email.length - b.email.length;
          })
        );
        break;
      case "emailDescending":
        setFilteredTodos(
          [...todos].sort((a, b) => {
            return b.email.length - a.email.length;
          })
        );
        break;
      case "completed":
        setFilteredTodos(
          [...todos].filter((todo) => {
            return todo.status === "completed";
          })
        );
        break;
      case "pending":
        setFilteredTodos(
          [...todos].filter((todo) => {
            return todo.status === "pending";
          })
        );
        break;
    }
  };

  const listPagination = () => {
    const start = (currentPage - 1) * todos_per_page;
    const end = start + todos_per_page;
    setPaginatedTodos(filteredTodos && filteredTodos.slice(start, end));
  };

  const Pagination = () => {
    const pages = Math.ceil(filteredTodos.length / todos_per_page);
    let button = [];
    for (let i = 1; i < pages + 1; i++) {
      button.push(
        <li className={`page-item ${i === currentPage && "active"}`} key={i}>
          <a class="page-link" href="#" onClick={() => setCurrentPage(i)}>
            {i}
          </a>
        </li>
      );
    }
    return button;
  };

  useEffect(() => {
    dispatch(getTodos());
  }, []);

  useEffect(() => {
    setFilteredTodos(todos);
  }, [todos]);

  useEffect(() => {
    listPagination();
  }, [currentPage, filteredTodos]);

  useEffect(() => {
    filterHandler();
  }, [filterStatus]);

  return (
    <>
      <FilterButtons />
      {loading === "Pending" ? (
        <div class="text-center">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : loading === "Fulfilled" ? (
        <>
          {paginatedTodos.map((todo) => (
            <TodoItem todo={todo} auth={auth} />
          ))}

          <EditTodoForm todo={editTodo} />
        </>
      ) : (
        <b>something gone wrong</b>
      )}

      {todos.length > 3 && (
        <nav aria-label="...">
          <ul class="pagination">
            <Pagination />
          </ul>
        </nav>
      )}
    </>
  );
};

export default ListTodos;
