import apiClient from "./apiClient";
import { store } from "store/store";
import { showModal } from "features/modalSlice/slice";

const authService = {
  register: async (userData) => {
    try {
      const response = await apiClient.post("/auth/register/", userData);
      const { access } = response.data;
      if (access) {
        // Dispatch the success modal without awaiting showModal
        store.dispatch(
          showModal({
            message: "Registration Success, Please Log In",
            status: 200,
            type: "success",
          })
        );
        // Optionally return the response for further processing
        return response;
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const errorData = error.response.data;
        const messages = [];

        // Aggregate error messages for email and username
        if (errorData.email) {
          // Join multiple email errors if provided as an array
          const emailErrors = Array.isArray(errorData.email)
            ? errorData.email.join(", ")
            : errorData.email;
          messages.push(`Email: ${emailErrors}`);
        }
        if (errorData.username) {
          const usernameErrors = Array.isArray(errorData.username)
            ? errorData.username.join(", ")
            : errorData.username;
          messages.push(`Username: ${usernameErrors}`);
        }

        // Dispatch a detailed error modal if we have messages; otherwise, a generic one
        if (messages.length > 0) {
          store.dispatch(
            showModal({
              message: messages.join("\n"),
              status: 400,
              type: "error",
              time: 3000,
            })
          );
        } else {
          store.dispatch(
            showModal({
              message: "An error occurred during registration.",
              status: 400,
              type: "error",
            })
          );
        }
      } else {
        // Handle network or unexpected errors
        console.error("Unexpected error:", error.message);
        store.dispatch(
          showModal({
            message: "A network error occurred. Please try again.",
            status: 500,
            type: "error",
          })
        );
      }
      // Propagate the error for further handling
      throw error;
    }
  },
  login: async (credentials) => {
    try {
      const response = await apiClient.post("/auth/login/", credentials);
      const { access } = response.data;

      if (access) {
        localStorage.setItem("accessToken", access);
        console.log("Stored the token");
        store.dispatch(
          await showModal({
            message: "You logged in successfully!",
            status: 200,
            type: "success",
          })
        );
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        store.dispatch(
          showModal({
            message: "Invalid credentials",
            status: 401,
            type: "error",
          })
        );
        return Promise.reject(err);
      } else {
        store.dispatch(
          showModal({
            message: "Error service. Try later",
            status: err.response?.status || 500,
            type: "error",
          })
        );
      }
      throw err;
    }
  },

  logout: async () => {
    localStorage.removeItem("accessToken");
  },
};

export default authService;
