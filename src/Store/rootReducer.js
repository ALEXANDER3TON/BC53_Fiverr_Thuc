import { combineReducers } from "@reduxjs/toolkit";
import {  UserReducer } from "./LoginAdminSlice/slice";

export const rootReducer = combineReducers({
  // Add your reducers here.
  User: UserReducer,
});
