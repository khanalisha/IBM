import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ALL_SEARCH_USER } from "../redux/userReducer/actionType";
import { getUser } from "../redux/userReducer/action";

export const AddUser = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const dispatch = useDispatch();
  console.log(search);
  console.log(searchResult, "set");

  const { users } = useSelector((store) => store.userReducer.users);
  console.log(users);

  useEffect(() => {
    const filter_sort = {
      name: search,
    };
    dispatch(getUser(setSearchResult, filter_sort));
  }, [search]);
  const handleSubmit = () => {};
  return (
    <div>
      <form class="p-8 w-96">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">
            Group Name
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Group Name"
          />
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">
            Add user
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Add User"
          />
        </div>

        <button className="btn bg-blue" type="submit" onClick={handleSubmit}>
          Add users
        </button>
      </form>
    </div>
  );
};
