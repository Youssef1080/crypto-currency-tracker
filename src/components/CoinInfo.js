import { useStateContext } from "../contexts/ContextProvider";
// import ReactHtmlParser from "react-html-parser";
const CoinInfo = ({ singleCoin }) => {
  const { currency } = useStateContext();
  return (
    <div
      style={{}}
      className="flex flex-col px-4 items-center justify-center text-white w-full media mt-6"
    >
      <img src={singleCoin?.image?.large} style={{ width: "200px" }} />
      <h1 className="my-5 text-5xl font-black">{singleCoin?.name}</h1>
      <p
        className="mb-4"
        style={{
          width: "100%",
          fontFamily: "Montserrat",
          lineHeight: "1.8",
          //   padding: 25,
          //   paddingBottom: 15,
          paddingTop: 0,
          textAlign: "justify"
        }}
      >
        {singleCoin?.description?.en?.split(". ")[0]}
      </p>
      <p className="flex gap-2 self-start xl:self-start sm:self-center items-center justify-center mb-3 text-xl">
        <span className="font-black text-xl sm:text-3xl">Rank:</span>
        {singleCoin?.market_cap_rank}
      </p>
      <p className="flex gap-2 self-start xl:self-start sm:self-center items-center justify-center mb-3  text-xl">
        <span className="font-black text-xl sm:text-3xl whitespace-nowrap">
          Current Price:
        </span>
        <p className="text-sm sm:text-xl">
          {`${currency === "INR" ? "₹" : "$"} ${
            currency === "INR"
              ? singleCoin?.market_data?.current_price?.inr
                  ?.toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : singleCoin?.market_data?.current_price?.usd
                  ?.toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }`}
        </p>
      </p>
      <p className="flex gap-2 self-start xl:self-start sm:self-center items-center justify-center text-xl">
        <span className="font-black text-xl sm:text-3xl whitespace-nowrap">
          Market Cap:
        </span>
        <p className="text-sm sm:text-xl overflow-hidden">
          {`${currency === "INR" ? "₹" : "$"} ${
            currency === "INR"
              ? singleCoin?.market_data?.market_cap?.inr
                  ?.toString()
                  .substr(0, 11)
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : singleCoin?.market_data?.market_cap?.usd
                  ?.toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }`}
        </p>
      </p>
    </div>
  );
};

export default CoinInfo;
