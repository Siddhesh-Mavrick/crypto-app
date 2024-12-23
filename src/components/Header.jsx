import React from "react";

import { Link, NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="w-full flex items-center justify-between p-4">
      <div>
        <h1 className="font-medium text-3xl select-none cursor-pointer">
          Coin<span className="text-orange-400 ">X</span>
        </h1>
      </div>

      <div className="flex items-center gap-5">
        <NavLink
          to={"/"}
          className={({ isActive }) =>
            isActive ? "text-orange-400 underline text-xl" : "text-gray-400 text-xl"
          }
        >
          Home
        </NavLink>
        <NavLink
          to={"/coin"}
          className={({ isActive }) =>
            isActive ? "text-orange-400 underline text-xl" : "text-gray-400 text-xl"
          }
        >
          Coins
        </NavLink>
        <NavLink
          to={"/exchanges"}
          className={({ isActive }) =>
            isActive ? "text-orange-400 underline text-xl" : "text-gray-400 text-xl"
          }
        >
          Exchanges
        </NavLink>
      </div>
    </div>
  );
};

export default Header;
