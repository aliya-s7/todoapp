import { useState } from "react";
import { useDispatch } from "react-redux";
import { postTodo } from "../redux/todoSlice";
import FormInput from "./AddTodoFormInput";
import { createNotification } from "./Notifications";
import {
  NotificationManager,
  NotificationContainer,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

const AddTodoForm = ({ status }) => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    description: "",
    status: "pending",
  });

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      errorMessage: "Please enter username!",
      label: "Username",
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      label: "Email",
      errorMessage: "Please enter valid email!",
      required: true,
    },
    {
      id: 3,
      name: "description",
      type: "text",
      placeholder: "Task description",
      label: "Description",
      errorMessage: "Please enter description!",
      required: true,
    },
  ];

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(postTodo(values)).then((res) => {
      if (res.payload.status === 200) {
        NotificationManager.success("Todo was created successfully", "Success");
      } else {
        NotificationManager.error("Something went wrong", "Error");
      }
    });
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <>
      <button
        class="btn btn-primary"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapseExample"
        aria-expanded="false"
        aria-controls="collapseExample"
      >
        Add Todo
      </button>
      <div class="collapse" id="collapseExample">
        <div class="card card-body" style={{ marginTop: "20px" }}>
          <form onSubmit={handleSubmit}>
            {inputs.map((input) => (
              <FormInput
                key={input.id}
                {...input}
                value={values[input.name]}
                onChange={onChange}
              />
            ))}
            <button
              type="submit"
              class="btn btn-primary"
              data-bs-toggle="collapse"
              data-bs-target="#collapseExample"
            >
              Save
            </button>
          </form>
        </div>
      </div>
      <NotificationContainer />
    </>
  );
};

export default AddTodoForm;
