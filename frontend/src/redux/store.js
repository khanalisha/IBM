import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";

import { reducer as authuser } from "./authReducer/reducer";
import { reducer as userReducer } from "./userReducer/reducer";

const rootReducer = combineReducers({
  authuser,
  userReducer,
});
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
