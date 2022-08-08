import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { editTodo } from "../redux/todoSlice";
import { NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.css";
import useAxios from "../hooks/useAxios";

const EditTodoForm = ({ todo }) => {
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    if (todo) {
      setDescription(todo.description);
    } else {
      setDescription("");
    }
  }, [todo]);

  const onChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (description === todo.description) {
      NotificationManager.warning("Nothing was changed!", "Warning");
    } else if (description === "") {
      NotificationManager.warning("The input is empty!", "Warning");
    } else {
      const checkAuth = await useAxios.get("/isUserAuth", {
        token: localStorage.getItem("token"),
      });
      console.log("check auth", checkAuth);

      if (checkAuth && checkAuth.data.auth) {
        dispatch(editTodo({ id: todo.todo_id, description }));
        NotificationManager.success("Todo updated successfully!", "Success");
      } else {
        NotificationManager.error("Please sign in", "Unauthorized");
      }
    }
  };
  return (
    <>
      <div
        class="modal fade"
        id="editTodoModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Edit Todo
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form onSubmit={handleSubmit}>
                <div class="mb-3">
                  <label for="message-text" class="col-form-label">
                    Description:
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="description"
                    name="description"
                    value={description}
                    onChange={onChange}
                  />
                </div>

                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  class="btn btn-primary"
                  data-bs-dismiss="modal"
                >
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditTodoForm;
