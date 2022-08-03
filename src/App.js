import { Routes, Route } from "react-router-dom";

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
    </div>
  );
}

export default App;
