import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { userData, userSchema } from "../types";
import { useAuthContext } from "../context/AuthContext";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";

type SignupProp = {
  setChangeSignup: (prev: boolean) => void;
};

const LoginForm: React.FC<SignupProp> = ({ setChangeSignup }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<userData>({ resolver: zodResolver(userSchema) });

  const { login, loginError } = useAuthContext();

  const submitForm = (data: userData) => {
    login(data);
  };

  return (
    <motion.form
      onSubmit={handleSubmit(submitForm)}
      initial={{ x: 200, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="mt-5 absolute flex flex-col"
    >
      <p className="mb-5 text-gray-500">Login with your credentials</p>

      <label className="flex flex-col text-gray-500 ">
        Email
        <input
          {...register("email")}
          className="bg-gray-100 border-2 mt-1 border-gray-200 rounded-lg px-2 p-1 focus:outline-none"
        ></input>
        {(errors.email?.message || loginError?.message) && (
          <span className="text-red-500 p-2">
            {errors.email?.message || loginError?.message}
          </span>
        )}
      </label>

      <label className="flex flex-col text-gray-500 my-5 ">
        Password
        <input
          {...register("password")}
          className="bg-gray-100 border-2 mt-1 border-gray-200 rounded-lg px-2 p-1 focus:outline-none"
        ></input>
        {(errors.password?.message || loginError?.message) && (
          <span className="text-red-500 p-2">
            {errors.password?.message || loginError?.message}
          </span>
        )}
      </label>

      <button
        type="submit"
        className="bg-purple-500 text-xl  text-white transition-all rounded-lg p-1 border-2 border-purple-500 hover:bg-purple-100 hover:text-purple-500 "
      >
        Login
      </button>

      <div className=" my-10 relative">
        <hr></hr>
        <p className="absolute -bottom-3 bg-purple-50 text-gray-500  left-1/2 transform -translate-x-1/2 px-2">
          Or
        </p>
      </div>

      <button onClick={() => setChangeSignup(false)} type="button">
        Register
      </button>
    </motion.form>
  );
};

export default LoginForm;
