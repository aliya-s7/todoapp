import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { editTodo, setEditTodo } from "../redux/todoSlice";
import useAxios from "../hooks/useAxios";
import { NotificationManager } from "react-notifications";

const TodoItem = ({ todo, auth }) => {
  const [todoStatus, setTodoStatus] = useState(false);
  const dispatch = useDispatch();

  const updateTodoStatus = async () => {
    setTodoStatus(!todoStatus);

    const checkAuth = await useAxios.get("/isUserAuth", {
      token: localStorage.getItem("token"),
    });

    if (checkAuth && checkAuth.data.auth) {
      dispatch(
        editTodo({
          id: todo.todo_id,
          status: !todoStatus ? "completed" : "pending",
        })
      );
    } else {
      NotificationManager.error("Please sign in", "Unauthorized");
    }
  };

  useEffect(() => {
    if (todo.status === "completed") {
      setTodoStatus(true);
    } else {
      setTodoStatus(false);
    }
  }, [todo.status]);

  return (
    <div className="card mb-3" key={todo.todo_id}>
      <div className="card-body" style={{ flex: "10px 10px" }}>
        {auth && auth.user === "admin" && (
          <input
            class="form-check-input"
            type="checkbox"
            onChange={updateTodoStatus}
            value={todoStatus}
            checked={todoStatus || todo.status === "completed"}
            id="flexCheckDefault"
            style={{ marginTop: "15px" }}
          />
        )}
        <div
          style={{ paddingLeft: "20px", display: "inline-block", width: "60%" }}
        >
          <h5 className="card-title">{todo.description}</h5>
          <h6 className="card-subtitle mb-2 text-muted">
            <i class="bi bi-person-fill"></i>
            <span style={{ padding: "0 10px 0 5px" }}>{todo.username}</span>
            <i class="bi bi-envelope-fill"></i>
            <span style={{ padding: "0 10px 0 5px" }}>{todo.email}</span>
          </h6>
        </div>

        <div style={{ float: "right", marginTop: "10px" }}>
          {todo.edited === true && (
            <span class="badge rounded-pill bg-secondary">Edited by admin</span>
          )}

          <span
            class={`badge rounded-pill ${
              todo.status === "completed" ? "bg-success" : "bg-primary"
            }`}
          >
            {todo.status}
          </span>
        </div>
        {auth && auth.user === "admin" && (
          <button
            type="button"
            class="btn"
            onClick={() => dispatch(setEditTodo(todo))}
            style={{ float: "right", marginTop: "5px" }}
            data-bs-toggle="modal"
            data-bs-target="#editTodoModal"
            data-bs-whatever="@mdo"
          >
            <i class="bi bi-pencil-square"></i>
          </button>
        )}
      </div>
    </div>
  );
};

export default TodoItem;
