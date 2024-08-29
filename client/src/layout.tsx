import React from "react";
import Navbar from "./components/Navbar,";
import Header from "./components/Header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex bg-slate-100 h-screen">
      <div className="w-[14rem] border-r-2 border-slate-200 ">
        <Navbar />
      </div>

      <div className="flex flex-col flex-1">
        <Header />

        <div className="flex flex-1 overflow-hidden">
          <div className=" w-full bg-slate-50 p-5  border-r-2 border-slate-200   overflow-auto">
            {children}
          </div>
          <div id="portal"></div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
