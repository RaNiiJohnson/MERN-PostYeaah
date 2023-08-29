import React, { useState } from "react";
import { motion as m } from "framer-motion";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLogin } from "../actions/user.action";
import { isEmpty } from "../helpers";

const containerVariants = {
  hidden: {
    opacity: 0,
    x: "100vw",
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      mass: 0.4,
      damping: 8,
      when: "beforeChildren",
      staggerChildren: 0.4,
    },
  },
  exit: {
    x: "100vw",
    transition: { ease: "easeInOut" },
  },
};
export default function SignIn() {
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const users = useSelector((state) => state.userReducer);

  let name =
    isEmpty(users) &&
    Array.isArray(users) &&
    users.map((user) => (user.email === email ? user.name : ""));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/user/login", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      withCredentials: true,
      headers: { "content-Type": "application/json" },
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error);
    } else {
      console.log(data);
      localStorage.setItem("user", JSON.stringify(data));
      dispatch(useLogin(data));
      window.location = "/";
    }
  };

  return (
    <m.div
      className="auth signUp"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <form onSubmit={handleSubmit} className="authForm">
        <m.p
          initial={{ x: 100 }}
          animate={{ x: 0 }}
          transition={{
            type: "spring",
            stiffness: 100,
          }}
        >
          Connexion
        </m.p>
        <m.input
          initial={{ x: 150 }}
          animate={{ x: 0 }}
          transition={{
            type: "spring",
            stiffness: 120,
          }}
          type="text"
          name="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <m.input
          initial={{ x: 200 }}
          animate={{ x: 0 }}
          transition={{
            type: "spring",
            stiffness: 140,
          }}
          type="password"
          placeholder="Mot de passe"
          onChange={(e) => setPassword(e.target.value)}
        />
        <m.input
          initial={{ x: 250 }}
          animate={{ x: 0 }}
          transition={{
            type: "spring",
            stiffness: 160,
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          value="Se connecter"
        />
        {error && (
          <m.div variants={containerVariants} className="error">
            {}
            {error}
          </m.div>
        )}
      </form>
    </m.div>
  );
}
