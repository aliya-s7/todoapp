import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/todoSlice";
import {
  NotificationManager,
  NotificationContainer,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

const SigninForm = () => {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const dispatch = useDispatch();

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(login(values)).then((res) => {
      if (res.payload.data.auth) {
        localStorage.setItem("token", res.payload.data.token);
        localStorage.setItem("user", res.payload.data.user);
        localStorage.setItem("auth", res.payload.data.auth);
        NotificationManager.success(res.payload.data.message, "Success");
      } else {
        NotificationManager.error(res.payload.data.message, "Error");
      }
    });
  };

  return (
    <>
      <div
        class="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Login
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
                  <label for="recipient-name" class="col-form-label">
                    Username:
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="username"
                    name="username"
                    onChange={onChange}
                  />
                </div>
                <div class="mb-3">
                  <label for="message-text" class="col-form-label">
                    Password:
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="password"
                    name="password"
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
                  Sign in
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <NotificationContainer />
    </>
  );
};

export default SigninForm;
