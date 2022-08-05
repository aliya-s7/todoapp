import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./App.css";
import ListTodos from "./components/ListTodos";
import SigninForm from "./components/SigninForm";
import AddTodoForm from "./components/AddTodoForm";
import { logout } from "./redux/todoSlice";

function App() {
  const auth = useSelector((state) => state.todos.auth);
  const status = useSelector((state) => state.todos.status);
  const dispatch = useDispatch();

  return (
    <div className="container-sm" style={{ padding: "0 18%" }}>
      <SigninForm />
      <h1 className="text-center my-5">Todo app</h1>
      {auth && auth.auth ? (
        <span
          class="d-inline-block"
          tabindex="0"
          data-bs-toggle="tooltip"
          title="Logout"
          style={{ float: "right", marginTop: "-15px" }}
        >
          <button type="button" class="btn" onClick={() => dispatch(logout())}>
            <i class="bi bi-box-arrow-right" style={{ fontSize: "32px" }}></i>
          </button>
        </span>
      ) : (
        <button
          type="button"
          class="btn"
          style={{ float: "right", marginTop: "-15px" }}
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          data-bs-whatever="@mdo"
        >
          <i class="bi bi-person-circle" style={{ fontSize: "32px" }}></i>
        </button>
      )}
      <AddTodoForm status={status} />
      <ListTodos />
    </div>
  );
}

export default App;
