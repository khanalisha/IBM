import { ALL_SEARCH_USER } from "./actionType";

const initState = {
  isLoading: false,
  isError: false,
  users: [],
};

export const reducer = (state = initState, action) => {
  switch (action.type) {
    case ALL_SEARCH_USER:
      return {
        ...state,
        isLoading: false,
        isError: false,
        users: action.payload,
      };
    default:
      return state;
  }
};
