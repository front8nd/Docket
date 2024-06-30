import { configureStore } from "@reduxjs/toolkit";
import NotesSlice from "./NotesSlice";
import authSlice from "./authSlice";

export default configureStore({
  reducer: {
    Notes: NotesSlice,
    auth: authSlice,
  },
});
