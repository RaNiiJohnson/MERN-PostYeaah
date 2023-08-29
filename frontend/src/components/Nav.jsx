import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Lougout from "./Lougout";

export default function Nav() {
  const currentUser = useSelector((state) => state.currentUserReducer);
  return (
    <>
      {!currentUser ? (
        <div className="navbar">
          <NavLink to="/signup">Incription</NavLink>
          <NavLink to="/signin">Connexion</NavLink>
        </div>
      ) : (
        <div className="navbar nav">
          <h1>{currentUser.email}</h1>
          <Lougout />
        </div>
      )}
    </>
  );
}
