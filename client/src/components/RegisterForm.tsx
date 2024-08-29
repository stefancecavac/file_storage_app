import React from "react";
import { motion } from "framer-motion";

type SignupProp = {
  setChangeSignup: (prev: boolean) => void;
};

const RegisterForm: React.FC<SignupProp> = ({ setChangeSignup }) => {
  return (
    <motion.form
      initial={{ x: -200, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="mt-5 absolute  flex flex-col"
    >
      <p className="mb-5 text-gray-500">Register with your credentials</p>

      <label className="flex flex-col text-gray-500 ">
        Email
        <input className="bg-gray-100 border-2 mt-1 border-gray-200 rounded-lg px-2 p-1 focus:outline-none"></input>
      </label>

      <label className="flex flex-col text-gray-500 my-5 ">
        Password
        <input className="bg-gray-100 border-2 mt-1 border-gray-200 rounded-lg px-2 p-1 focus:outline-none"></input>
      </label>

      <label className="flex flex-col text-gray-500 mb-5">
        Confirm Password
        <input className="bg-gray-100 border-2 mt-1 border-gray-200 rounded-lg px-2 p-1 focus:outline-none"></input>
      </label>

      <button
        type="submit"
        className="bg-purple-500 text-xl  text-white transition-all rounded-lg p-1 border-2 border-purple-500 hover:bg-purple-100 hover:text-purple-500 "
      >
        Register
      </button>

      <div className=" my-10 relative">
        <hr></hr>
        <p className="absolute -bottom-3 bg-purple-50 text-gray-500  left-1/2 transform -translate-x-1/2 px-2">
          Or
        </p>
      </div>

      <button type="button" onClick={() => setChangeSignup(true)}>
        Login
      </button>
    </motion.form>
  );
};

export default RegisterForm;
