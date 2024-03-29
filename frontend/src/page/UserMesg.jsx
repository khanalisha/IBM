import axios from "axios";
import React, { useEffect, useState } from "react";
import { UserList } from "./UserList";
import { Modal } from "./Modal";
import { AddUser } from "./AddUser";
import { useDispatch, useSelector } from "react-redux";

export const UserMesg = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);

  const OpenModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleAdd = () => {
    OpenModal();
    console.log("ok");
  };

  const handleSubmit = async () => {};

  useEffect(() => {
    const res = axios
      .get(`${process.env.REACT_APP_API_URL}/api/user`)
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      });
  }, []);
  console.log(data);

  return (
    <div className="user-container">
      <div className="p-6 flex a">
        <div className="user-outer-div ">
          <p className="user-p">Messages</p>
          <img src="openimg.svg" alt="" className="w-4 h-4" />
        </div>
        <div className="inner-user-div">
          <p className="inner-user-div-p">12</p>
        </div>
        <img
          src="add.svg"
          alt=""
          className=" h-10 w-10 shrink-0 "
          onClick={handleAdd}
        />
      </div>

      <div>
        <input
          type="text"
          placeholder="Search.."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {data.map((el) => (
        <UserList key={el.id} {...el} />
      ))}

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <AddUser closeModal={closeModal} />
      </Modal>
    </div>
  );
};
