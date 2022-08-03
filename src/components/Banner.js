import { Carousel } from "./import";

const Banner = () => {
  const fd = "url(../assets/banner2.jpg)";
  return (
    <div className="banner">
      <div className="banner-content">
        <div style={{ height: "40%" }}>
          <h1 className="text-6xl font-black mb-6">Crypto Hunter</h1>
          <p className="text-sm text-gray-300">
            Get All The Info Regarding Your Favorite Crypto Currency
          </p>
        </div>
        <Carousel />
      </div>
    </div>
  );
};

export default Banner;
