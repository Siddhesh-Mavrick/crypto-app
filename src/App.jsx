import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Coin from "./components/Coin";
import Exchanges from "./components/Exchanges";
import Coindetails from "./components/CoinDetails";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Header />
      <div className=""> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/coin" element={<Coin />} />
          <Route path="/exchanges" element={<Exchanges />} />
          <Route path="/coin/:id" element={<Coindetails />} /> 
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
