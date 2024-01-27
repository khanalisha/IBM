import axios from "axios";
import { ALL_SEARCH_USER } from "./actionType";

export const getUser = (setSearchResult, params) => async (dispatch) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/user`, {
      params: params,
    });
    const users = res;
    console.log(users, "action");
    setSearchResult(users);
    dispatch({ type: ALL_SEARCH_USER, payload: users });
  } catch (error) {
    console.error("Error fetching users", error);
  }
};
