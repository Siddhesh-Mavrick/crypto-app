import React from "react";
import CoinImg from '../assets/btc.png'

const Home = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <img src={CoinImg} alt="not found" className="h-[40%] w-[40%] "/>
    </div>
  );
};

export default Home;
