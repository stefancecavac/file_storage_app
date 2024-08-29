import { useLocation } from "react-router-dom";
import SearchComponent from "./SearchComponent";
import UserInfo from "./UserInfo";

const Header = () => {
  const location = useLocation();

  return (
    <div className="flex justify-between px-5 bg-slate-50 items-center border-b-2 border-slate-200  p-1">
      {location.pathname != "/files" ? (
        <SearchComponent></SearchComponent>
      ) : (
        <div />
      )}

      <UserInfo></UserInfo>
    </div>
  );
};

export default Header;
