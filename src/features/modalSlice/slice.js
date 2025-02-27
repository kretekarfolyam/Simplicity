import { createSlice } from "@reduxjs/toolkit";

/*
  Будем хранить глобальное состояние вида:
  {
    isOpen: false,        // нужно ли показывать модалку
    status: null,         // код ошибки или успеха (например, 401, 200)
    message: "",          // текст сообщения
    type: "error"|"info"  // тип сообщения: error, success, warning, etc.
  }
*/

const initialState = {
  isOpen: false,
  status: null,
  time: 1500,
  message: "",
  type: "info",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    showModal: (state, action) => {
      // action.payload = { message, status, type }
      state.isOpen = true;
      state.message = action.payload.message;
      state.time = action.payload.time || 1500;
      state.status = action.payload.status || null;
      state.type = action.payload.type || "info";
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.message = "";
      state.status = null;
      state.type = "info";
      state.time = 1500;
    },
  },
});

export const { showModal, closeModal } = uiSlice.actions;
export default uiSlice.reducer;
