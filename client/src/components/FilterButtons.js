import { useDispatch, useSelector } from "react-redux";
import { updateFilterStatus } from "../redux/todoSlice";

const FilterButtons = () => {
  const filterStatus = useSelector((state) => state.todos.filterStatus);
  const dispatch = useDispatch();

  const updateFilter = (e) => {
    dispatch(updateFilterStatus(e.target.value));
  };

  const options = [
    {
      value: "All",
      label: "All",
    },
    {
      value: "usernameAscending",
      label: "Username in ascending order",
    },
    {
      value: "usernameDescending",
      label: "Username in descending order",
    },
    {
      value: "emailAscending",
      label: "Email in ascending order",
    },
    {
      value: "emailDescending",
      label: "Email in descending order",
    },
    {
      value: "completed",
      label: "Completed",
    },
    {
      value: "pending",
      label: "Pending",
    },
  ];

  return (
    <div style={{ display: "flex", padding: "20px 0 20px" }}>
      filter:
      <select
        class="form-select"
        style={{ width: "50%", marginLeft: "20px" }}
        aria-label="Username"
        value={filterStatus}
        onChange={updateFilter}
      >
        {options.map((option) => (
          <option value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  );
};

export default FilterButtons;
