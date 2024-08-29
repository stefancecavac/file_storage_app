import React from "react";
import { motion } from "framer-motion";

type modalProps = {
  modaOpen: boolean;
  setModalOpen: (open: boolean) => void;
};

const SignupModal: React.FC<modalProps> = ({ modaOpen, setModalOpen }) => {
  return (
    modaOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed top-0 left-0 right-0 bottom-0 z-20 flex justify-center items-center bg-white-50 bg-gray-500/70  "
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="bg-white rounded-lg  "
        >
          <div className=" flex items-center justify-between p-3">
            <h2 className="text-xl font-bold ">Register</h2>
            <svg
              onClick={() => setModalOpen(false)}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-7 hover:cursor-pointer rounded-full hover:bg-gray-200"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </div>
        </motion.div>
      </motion.div>
    )
  );
};

export default SignupModal;
