import { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

const SignUpPage = () => {
  const [changeSignup, setChangeSignup] = useState(true);

  return (
    <div className=" min-h-screen flex flex-col bg-purple-50 ">
      <h1 className="text-4xl font-bold p-5 px-10 text-purple-500">logo</h1>
      <div className="flex justify-evenly mt-20 mx-36  ">
        <div className="  flex-col  w-full ">
          <h2 className="text-purple-500 text-3xl font-semibold ">
            Welcome to files app
          </h2>

          {changeSignup ? (
            <LoginForm setChangeSignup={setChangeSignup}></LoginForm>
          ) : (
            <RegisterForm setChangeSignup={setChangeSignup}></RegisterForm>
          )}
        </div>
        <div className="w-full h-[30rem] relative   rounded-lg overflow-hidden">
          <img src="signupPic.png  " className="h-full"></img>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
