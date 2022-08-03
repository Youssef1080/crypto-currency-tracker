import axios from "axios";
import { useEffect, useState } from "react";
import { TrendingCoins } from "../api/cryptoApi";
import { useStateContext } from "../contexts/ContextProvider";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";

const Carousel = () => {
  const { currency } = useStateContext();
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    const fetchTrendingCoins = async () => {
      const { data } = await axios.get(TrendingCoins(currency));
      setTrending(data);
    };

    fetchTrendingCoins();
  }, [currency]);

  const responsive = {
    0: {
      items: 2
    },
    512: {
      items: 4
    }
  };

  return (
    <div style={{ height: "50%", display: "flex", alignItems: "center" }}>
      <AliceCarousel
        responsive={responsive}
        mouseTracking
        autoPlayInterval={1000}
        animationDuration={1500}
        infinite
        disableDotsControls
        disableButtonsControls
        autoPlay
      >
        {trending?.map((item) => {
          let profit = item.price_change_percentage_24h > 0;
          return (
            <Link
              className="flex flex-col justify-center items-center"
              key={item.id}
              to={`/coins/${item.id}`}
            >
              <img
                style={{ width: "80px", height: "80px" }}
                alt={item.name}
                src={item.image}
              />
              <div className="flex mt-2 gap-3 mb-2">
                <span>{item.symbol.toUpperCase()}</span>
                <span style={{ color: profit ? "green" : "red" }}>
                  {profit && "+"} {item.price_change_percentage_24h?.toFixed(2)}
                </span>
              </div>
              <p className="text-lg font-bold">
                {currency === "USD" ? "$" : "₹"}{" "}
                {item.current_price
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </p>
            </Link>
          );
        })}
      </AliceCarousel>
    </div>
  );
};

export default Carousel;
