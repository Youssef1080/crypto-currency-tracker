import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SingleCoin, HistoricalChart } from "../api/cryptoApi";
import axios from "axios";
import { useStateContext } from "../contexts/ContextProvider";
import CoinInfo from "../components/CoinInfo";
import { chartDays } from "../api/data";
import Loader from "../components/Loader";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Line } from "react-chartjs-2";
// import faker from "faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

//
const CoinPage = () => {
  const { currency } = useStateContext();
  const { id } = useParams();
  const [singleCoin, setSingleCoin] = useState([]);
  const [chart, setChart] = useState([]);
  const [days, setDays] = useState(1);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    async function fetchCoin() {
      const { data } = await axios.get(SingleCoin(id));
      setSingleCoin(data);
    }
    fetchCoin();

    async function fetch() {
      const { data } = await axios.get(HistoricalChart(id, days, currency));
      setChart(data.prices);
    }
    fetch();
  }, [currency, days]);

  const selectedStyle = {
    backgroundColor: "gold",
    color: "black",
    fontWeight: "bold",
    border: "1px solid gold"
  };
  // "bg-yellow-400 text-black font-bold border border-yellow-400";

  function handleActive(text) {
    if (selected === text) {
      return selectedStyle;
    }
  }

  if (!singleCoin.length && !chart.length) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col  xl:flex-row items-center ">
      <CoinInfo singleCoin={singleCoin} />
      <div className="p-4 chart xl:pt-0  w-full mt-6" style={{}}>
        {chart.length && (
          <Line
            data={{
              labels: chart?.map((item) => {
                let date = new Date(item[0]);
                let time =
                  date.getHours() > 12
                    ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                    : `${date.getHours()}:${date.getMinutes()} AM`;
                return days === 1 ? time : date.toLocaleDateString();
              }),
              datasets: [
                {
                  data: chart?.map((item) => item[1]),
                  label: `Price ( Past ${days} Days ) in ${currency}`,
                  borderColor: "#eebc1d"
                }
              ]
            }}
            options={{
              elements: {
                point: {
                  radius: 1
                }
              }
            }}
          />
        )}
        <div
          className="w-full mt-5  flex gap-1 justify-center sm:gap-1 sm:justify-around"
          // style={{
          //   display: "flex",
          //   marginTop: 20,
          //   justifyContent: "space-around",
          //   width: "100%"
          // }}
        >
          {chartDays.map((day) => (
            <button
              style={handleActive(day.label)}
              className={`rounded-lg  sm:py-2 p-1 whitespace-nowrap sm:px-6  
                border text-[12px] sm:text-lg border-yellow-400 bg-transparent `}
              key={day.value}
              onClick={(e) => {
                setDays(day.value);
                setSelected(e.target.textContent);
              }}
              // selected={day.value === days}
            >
              {day.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoinPage;
