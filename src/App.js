import { Routes, Route } from "react-router-dom";
import Foooter from "./components/Foooter";
import { Header } from "./components/import";
import { CoinPage, HomePage } from "./pages/import";
import "./App.css";
function App() {
  return (
    <div className="App ">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/coins/:id" element={<CoinPage />} />
      </Routes>
      <Foooter />
    </div>
  );
}

export default App;
