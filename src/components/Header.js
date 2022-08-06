import { useStateContext } from "../contexts/ContextProvider";
import { Link } from "react-router-dom";
const Header = () => {
  const { setCurrency, currency } = useStateContext();
  return (
    <div
      className="static p-3 sm:mx-10 "
      style={{
        boxShadow:
          "0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)"
      }}
    >
      <div className="flex items-center justify-between">
        <Link
          to={"/"}
          style={{ color: "gold" }}
          className="font-black text-md sm:text-xl text-orange-400 cursor-pointer whitespace-nowrap"
        >
          Crypto Tracker
        </Link>
        <div className="flex items-center gap-3 sm:gap-6">
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="border border-gray-300 bg-transparent p-1 sm:p-2 rounded-md cursor-pointer "
          >
            <option className="bg-slate-900 ">USD</option>
            <option className="bg-slate-900 ">INR</option>
          </select>
          <button
            style={{ backgroundColor: "gold" }}
            className=" text-md rounded-sm p-1 sm:p-2 sm:px-5 cursor-pointer text-slate-900 bg-orange-400"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
