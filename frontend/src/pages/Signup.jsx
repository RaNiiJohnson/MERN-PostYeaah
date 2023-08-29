import React from "react";
import { motion as m } from "framer-motion";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSignup } from "../actions/user.action";

const containerVariants = {
  hidden: {
    opacity: 0,
    x: "-100vw",
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
    x: "-100vw",
    transition: { ease: "easeInOut" },
  },
};
export default function Signup() {
  const [error, setError] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/user/signup", {
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
      window.location = "/";
    }
    dispatch(useSignup(data));
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
          initial={{ x: 200 }}
          animate={{ x: 0 }}
          transition={{
            type: "spring",
            stiffness: 300,
          }}
        >
          Insription
        </m.p>
        <m.input
          initial={{ x: 200 }}
          animate={{ x: 0 }}
          transition={{
            type: "spring",
            stiffness: 300,
          }}
          type="text"
          placeholder="Prenom"
          autoComplete="off"
          onChange={(e) =>
            setName(
              [e.target.value]
                .map((name) => name[0].toUpperCase() + name.slice(1))
                .join("")
            )
          }
        />
        <m.input
          initial={{ x: 150 }}
          animate={{ x: 0 }}
          transition={{
            type: "spring",
            stiffness: 190,
          }}
          type="text"
          placeholder="Email"
          autoComplete="off"
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
            stiffness: 260,
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          value="S'incrire"
        />
        <m.div variants={containerVariants} className="error">
          {}
          {error}
        </m.div>
      </form>
    </m.div>
  );
}
