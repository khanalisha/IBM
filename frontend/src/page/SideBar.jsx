import axios from "axios";
import React, { useEffect, useState } from "react";

export const SideBar = () => {

  return (
    <div className="side-bar-component">
      <div className="outer-div">
        <div className="p-div">
          <p className="p">Q</p>
        </div>
        <img src="iconsax.svg" alt="" className="w-6 h-6 mt-12" />
        <img src="messagebox.svg" alt="" className="w-6 h-6 mt-8" />


      </div>
    </div>
  );
};
