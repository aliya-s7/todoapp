import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateFilterStatus } from "../redux/todoSlice";

const FilterButtons = () => {
  const [filterSelected, setFilterSelected] = useState();
  const filterStatus = useSelector((state) => state.todos.filterStatus);
  const dispatch = useDispatch();

  const updateFilter = (e) => {
    dispatch(updateFilterStatus(e.target.value));
  };

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
        <option value="All">All</option>
        <option value="usernameAscending">Username in ascending order</option>
        <option value="usernameDescending">Username in descending order</option>
        <option value="emailAscending">Email in ascending order</option>
        <option value="emailDescending">Email in descending order</option>
        <option value="completed">Completed status</option>
        <option value="pending">Pending status</option>
      </select>
    </div>
  );
};

export default FilterButtons;
