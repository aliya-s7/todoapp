import "./addTodoForm.css";

const FormInput = (props) => {
  const { label, errorMessage, onChange, id, ...inputProps } = props;
  return (
    <div>
      <label>{label}</label>
      <input className="form-control" {...inputProps} onChange={onChange} />
      <span className="add-todo_error-message">{errorMessage}</span>
    </div>
  );
};

export default FormInput;
