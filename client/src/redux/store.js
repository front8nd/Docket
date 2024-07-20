import { configureStore } from "@reduxjs/toolkit";
import NotesSlice from "./NotesSlice";
import authSlice from "./authSlice";
import tokenExpirationMiddleware from "./middleware";

export default configureStore({
  reducer: {
    Notes: NotesSlice,
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tokenExpirationMiddleware),
});
