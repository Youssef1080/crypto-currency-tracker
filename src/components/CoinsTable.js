import { useEffect, useState } from "react";
import { CoinList } from "../api/cryptoApi";
import { useStateContext } from "../contexts/ContextProvider";
import axios from "axios";
import Pagination from "react-js-pagination";
import { Link, useNavigate } from "react-router-dom";
const CoinsTable = () => {
  const { currency } = useStateContext();
  const navigate = useNavigate();

  const [coins, setCoins] = useState([]);
  const [plus, setPlus] = useState(0);
  const [selected, setSelected] = useState("");
  const [serach, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function fetch() {
      const { data } = await axios.get(CoinList(currency));
      setCoins(data);
    }
    fetch();
  }, [currency]);

  const [pagination, setPagination] = useState(["⇐", 1, 2, 3, 4, 5, "⇒"]);

  function searchCurrency() {
    return coins?.filter((coin) => {
      return (
        coin.name.toLocaleLowerCase().includes(serach.toLocaleLowerCase()) ||
        coin.symbol.toLocaleLowerCase().includes(serach.toLocaleLowerCase())
      );
    });
  }
  useEffect(() => {
    handleActive(1);
  }, []);

  function handleActive(text) {
    if (text === selected && text !== "⇐" && text !== "⇒") {
      return {
        style: "white",
        class: "text-white bg-yellow-400 border-x border-yellow-400"
      };
    }
    if (currentPage === +text) {
      console.log(currentPage, text);
      return {
        style: "white",
        class: "text-white bg-yellow-400 border-x border-yellow-400"
      };
    }
  }

  return (
    <div className="sm:p-4 pt-4 flex flex-col items-center justify-center m-4 mb-0 overflow-visible">
      <h2 className="text-center text-xl sm:text-4xl ">
        Cryptocurrency Prices by Market Cap
      </h2>
      <input
        type={"text"}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        placeholder="Search For a Crypto Currency..."
        className="p-3 text-gray-400 placeholder:text-[12px] sm:placeholder:text-md text-md my-5 border border-slate-600 rounded-md"
        style={{ backgroundColor: "transparent", width: "80%" }}
      />
      <table style={{ width: "80%", padding: "16px" }}>
        <thead
          style={{ padding: "16px" }}
          className="p-8 text-slate-900 text-md w-28 rounded-lg font-extrabold text-center bg-yellow-400"
        >
          <tr>
            <td className="sm:p-4 rounded-l-md w-10 text-start sm:text-start text-[10px] sm:text-lg">
              Coin
            </td>
            <td className="text-start text-[10px] w-6 sm:text-lg">Price</td>
            <td className="whitespace-nowrap text-start sm:text-center w-6 text-[10px] sm:text-lg">
              24h Change
            </td>
            <td className=" rounded-r-md w-7 text-end w-6 sm:pr-2 whitespace-nowrap text-[10px] sm:text-lg">
              Market Cap
            </td>
          </tr>
        </thead>
        <tbody>
          {searchCurrency()
            ?.slice((currentPage - 1) * 10, currentPage * 10)
            .map((item) => {
              let profit = item.price_change_percentage_24h > 0;
              return (
                <tr
                  key={item.id}
                  className="p-6 border-b border-slate-600 cursor-pointer hover:bg-black"
                  onClick={() => navigate(`/coins/${item.id}`)}
                >
                  <td className="flex gap-1 sm:gap-3 items-center p-3 pr-0 pl-1 sm:pr-6 sm:p-6">
                    <div className=" w-[30px] sm:w-[60px]">
                      <img
                        src={item.image}
                        className="w-[30px] sm:w-[60px]  "
                      />
                    </div>

                    <div className="flex flex-col items-center justify-center ">
                      <span className="text-[12px] sm:text-lg font-semibold ">
                        {item.symbol.toUpperCase()}
                      </span>
                      <span className="text-[8px] sm:text-sm font-semibold text-gray-400">
                        {item.name}
                      </span>
                    </div>
                  </td>
                  <td className="text-[8px] sm:text-sm ">
                    {`${currency === "INR" ? "₹" : "$"} ${item.current_price
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
                  </td>
                  <td
                    style={{ color: profit ? "green" : "red" }}
                    className="text-[8px] sm:text-sm text-center w-7"
                  >
                    {profit && "+"}{" "}
                    {item.price_change_percentage_24h?.toFixed(2)}
                  </td>
                  <td className="text-end sm:pr-6 text-[8px] sm:text-sm">
                    {`${currency === "INR" ? "₹" : "$"} ${item.market_cap
                      .toString()
                      .slice(0, -6)
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <div
        className="flex bg-transparent mt-4 justify-between border 
        border-gray-300 rounded-lg mb-4"
        style={{ width: "200px" }}
      >
        {pagination.map((item, ind) => (
          <span
            style={{ color: handleActive(item)?.style }}
            className={`border-r w-12 flex items-center justify-center
              cursor-pointer border-gray-300 last:border-none select-none text-yellow-400 ${
                handleActive(item)?.class
              }`}
            key={ind}
            onClick={(e) => {
              setSelected(item);
              if (e.target.textContent === "⇐") {
                currentPage != 1 && setCurrentPage(currentPage - 1);
                currentPage == 6 && setPagination(["⇐", 1, 2, 3, 4, 5, "⇒"]);
              } else if (e.target.textContent === "⇒") {
                currentPage != 10 && setCurrentPage(currentPage + 1);
                currentPage == 5 && setPagination(["⇐", 6, 7, 8, 9, 10, "⇒"]);
              } else {
                setCurrentPage(+e.target.textContent);
              }
              // window.scroll(0, 450);
            }}
          >
            {item === "⇐" || item === "⇒" ? item : +item + plus}
          </span>
        ))}
      </div>
    </div>
  );
};

export default CoinsTable;
