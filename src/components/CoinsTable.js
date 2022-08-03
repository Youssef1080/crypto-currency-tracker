import { useEffect, useState } from "react";
import { CoinList } from "../api/cryptoApi";
import { useStateContext } from "../contexts/ContextProvider";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const CoinsTable = () => {
  const { currency } = useStateContext();
  const navigate = useNavigate();

  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [serach, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function fetch() {
      const { data } = await axios.get(CoinList(currency));
      setCoins(data);
    }
    fetch();
  }, [currency]);

  const exercisesPerPage = 10;

  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  const currentExercises = coins.slice(
    indexOfFirstExercise,
    indexOfLastExercise
  );

  function searchCurrency() {
    return coins?.filter((coin) => {
      return (
        coin.name.toLocaleLowerCase().includes(serach.toLocaleLowerCase()) ||
        coin.symbol.toLocaleLowerCase().includes(serach.toLocaleLowerCase())
      );
    });
  }

  //   console.log(searchCurrency().length / 10);

  return (
    <div className="p-4 pt-4 flex flex-col items-center justify-center">
      <h2 className="text-center text-4xl ">
        Cryptocurrency Prices by Market Cap
      </h2>
      <input
        type={"text"}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        placeholder="Search For a Crypto Currency.."
        className="p-3 text-gray-400 text-md my-5 border border-slate-600 rounded-md"
        style={{ backgroundColor: "transparent", width: "80%" }}
      />
      <table style={{ width: "80%", padding: "16px" }}>
        <thead
          style={{ padding: "16px" }}
          className="p-8 text-slate-900 text-md rounded-lg font-extrabold text-center bg-yellow-400"
        >
          <tr>
            <td className="p-4 rounded-l-md text-start">Coin</td>
            <td className="text-start">Price</td>
            <td className="whitespace-nowrap text-start">24h Change</td>
            <td className=" rounded-r-md text-end pr-6">Market Cap</td>
          </tr>
        </thead>
        <tbody>
          {searchCurrency()
            ?.slice(indexOfFirstExercise, indexOfLastExercise)
            .map((item) => {
              let profit = item.price_change_percentage_24h > 0;
              return (
                <tr
                  key={item.id}
                  className="p-6 border-b border-slate-600 cursor-pointer hover:bg-black"
                  onClick={() => navigate(`/coins/${item.id}`)}
                >
                  <td className="flex gap-3 items-center p-6">
                    <img src={item.image} style={{ width: "50px" }} />
                    <div className="flex flex-col items-center justify-center">
                      <span className="text-lg font-semibold ">
                        {item.symbol.toUpperCase()}
                      </span>
                      <span className="text-sm font-semibold text-gray-400">
                        {item.name}
                      </span>
                    </div>
                  </td>
                  <td className="text-sm">
                    {`${currency === "INR" ? "₹" : "$"} ${item.current_price
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
                  </td>
                  <td style={{ color: profit ? "green" : "red" }}>
                    {profit && "+"}{" "}
                    {item.price_change_percentage_24h?.toFixed(2)}
                  </td>
                  <td className="text-end pr-6 text-sm">
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
      <div className="flex gap-2 mt-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
          .slice(0, Math.ceil(searchCurrency().length / 10))
          .map((num) => {
            return (
              <span
                key={num}
                style={{
                  width: "30px",
                  height: "30px"
                  // backgroundColor: isActive && "black",
                  // color: isActive && "white"
                }}
                onClick={(e) => {
                  setCurrentPage(+e.target.textContent);
                  window.scroll(0, 450);
                }}
                className="bg-pink-400 select-none active:bg-black active:text-white hover:bg-pink-300 cursor-pointer text-black font-bold flex justify-center items-center text-md rounded-full"
              >
                {num}
              </span>
            );
          })}
      </div>
    </div>
  );
};

export default CoinsTable;
