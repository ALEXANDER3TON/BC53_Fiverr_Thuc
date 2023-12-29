import { combineReducers } from "@reduxjs/toolkit";
import { AdminReducer } from "./LoginAdminSlice/slice";

export const rootReducer = combineReducers({
  // Add your reducers here.
  Admin: AdminReducer,
});
