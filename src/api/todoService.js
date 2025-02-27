import apiClient from "./apiClient";
import { store } from "store/store";
import { showModal } from "features/modalSlice/slice";

const apiService = {
  getTodos: async () => {
    try {
      const response = await apiClient.get(`/todos/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      return response;
    } catch (err) {
      if (err.response && err.response.status === 401) {
        store.dispatch(
          await showModal({
            message: "Session expired, please log in!",
            status: 400,
            type: "error",
          })
        );
        return Promise.reject(err);
      }
      throw err;
    }
  },

  getTodoById: async (id) => {
    const response = await apiClient.get(`/todos/${id}`);
    return response.data;
  },

  createTodo: async (taskData) => {
    try {
      const response = await apiClient.post(`/todos/`, taskData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      store.dispatch(
        await showModal({
          message: "Created successfully!",
          status: 200,
          type: "success",
        })
      );
      return response.data;
    } catch (err) {
      if (err.response && err.response.status === 401) {
        localStorage.removeItem("accessToken");
        store.dispatch(
          await showModal({
            message: "Session expired, please log in!",
            status: 400,
            type: "error",
          })
        );
      }
      throw err;
    }
  },

  updateTodo: async (id, data) => {
    try {
      const response = await apiClient.patch(`/todos/${id}/`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      store.dispatch(
        await showModal({
          message: "Updated successfully!",
          status: 200,
          type: "info",
        })
      );
      return response.data;
    } catch (err) {
      if (err.response && err.response.status === 401) {
        localStorage.removeItem("accessToken");
        store.dispatch(
          await showModal({
            message: "Session expired, please log in!",
            status: 400,
            type: "error",
          })
        );
      }

      throw err;
    }
  },
  deleteTodo: async (id) => {
    try {
      const response = await apiClient.delete(`/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      store.dispatch(
        await showModal({
          message: "Deleted successfully!",
          status: 200,
          type: "warning",
        })
      );
      return response.data;
    } catch (err) {
      if (err.response && err.response.status === 401) {
        localStorage.removeItem("accessToken");
        store.dispatch(
          await showModal({
            message: "Session expired, please log in!",
            status: 400,
            type: "error",
          })
        );
      }
      throw err;
    }
  },
};

export default apiService;
