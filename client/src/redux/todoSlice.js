import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import useAxios from "../hooks/useAxios";

export const getTodos = createAsyncThunk("todos/getTodos", async () => {
  return await useAxios.get("/todos");
});

export const postTodo = createAsyncThunk("todos/postTodo", async (body) => {
  return await useAxios.post("/todo", body);
});

export const editTodo = createAsyncThunk("todos/editTodo", async (body) => {
  return await useAxios.put("/todo", body);
});

export const login = createAsyncThunk("users/login", async (body) => {
  return await useAxios.post("/login", body);
});

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [],
    auth: {
      auth: localStorage.getItem("auth"),
      user: localStorage.getItem("user"),
      token: localStorage.getItem("token"),
    },
    status: null,
    editTodo: null,
    filterStatus: "All",
  },
  reducers: {
    updateFilterStatus: (state, action) => {
      state.filterStatus = action.payload;
    },
    setEditTodo: (state, action) => {
      state.editTodo = action.payload;
    },
    logout: (state, action) => {
      state.auth = null;
      localStorage.clear();
    },
  },
  extraReducers: {
    [getTodos.pending]: (state) => {
      state.status = "Pending";
    },

    [getTodos.fulfilled]: (state, action) => {
      state.status = "Fulfilled";
      state.todos = action.payload.data;
    },

    [getTodos.rejected]: (state) => {
      state.status = "Rejected";
    },
    [postTodo.pending]: (state) => {
      state.status = "Pending";
    },

    [postTodo.fulfilled]: (state, action) => {
      state.status = "Fulfilled";
      state.todos.push(action.payload.data);
    },

    [postTodo.rejected]: (state) => {
      state.status = "Rejected";
    },
    [editTodo.pending]: (state) => {
      state.status = "Pending";
    },

    [editTodo.fulfilled]: (state, action) => {
      state.status = "Fulfilled";
      state.todos[
        state.todos.findIndex(
          (todo) => todo.todo_id === action.payload.data.todo_id
        )
      ] = action.payload.data;
    },

    [editTodo.rejected]: (state) => {
      state.status = "Rejected";
    },
    [login.pending]: (state) => {
      state.status = "Pending";
    },

    [login.fulfilled]: (state, action) => {
      state.status = "Fulfilled";
      state.auth = action.payload.data;
    },

    [login.rejected]: (state) => {
      state.status = "Rejected";
    },
  },
});

export const { updateFilterStatus, setEditTodo, logout } = todoSlice.actions;
export default todoSlice.reducer;
