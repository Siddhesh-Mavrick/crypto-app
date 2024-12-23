import React, { useEffect, useState } from "react";
import api from "@/services/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Loader from "./Loader";
import { Link } from "react-router-dom";

const Coin = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currency, setCurrency] = useState("inr");
  const [symbol, setSymbol] = useState("₹");

  const coin = {
    inr: "₹",
    usd: "$",
    eur: "€",
  };

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await api.get("/coins/markets", {
          params: {
            vs_currency: currency,
            per_page: 500,
            order: "market_cap_desc",
          },
        });
        setData(data);
        setLoading(false);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCoins();
  }, [currency]);

  return (
    <div className="">
      {loading ? (
        <div className="flex items-center justify-center min-h-[80vh]">
          <Loader />
        </div>
      ) : (
        <>
          <div>
            <RadioGroup
              defaultValue="inr"
              onValueChange={(value) => {
                setCurrency(value);

                setSymbol(value === "inr" ? "₹" : value === "usd" ? "$" : "€");
              }}
              className="flex max-w-full items-center gap-4 m-3 self-start self"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="inr" id="option-one" />
                <Label htmlFor="option-one">INR</Label>
              </div>

              <div className="flex items-center space-x-2">
                <RadioGroupItem value="eur" id="option-two" />
                <Label htmlFor="option-two">EUR</Label>
              </div>

              <div className="flex items-center space-x-2">
                <RadioGroupItem value="usd" id="option-three" />
                <Label htmlFor="option-three">USD</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="flex items-center justify-center flex-wrap gap-6">
            {data.map((coin) => {
              return (
                <Link to={`/coin/${coin.id}`}>
                  <Card
                    key={coin.id}
                    className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer flex flex-col  items-center justify-center w-[200px] h-[300px] "
                  >
                    <CardHeader className="">
                      <img
                        src={coin.image}
                        alt={`${coin.name} logo`}
                        className="w-16 h-16 rounded-full mr-4 self-center mb-3"
                      />
                      <div>
                        <CardTitle className="text-center">
                          {coin.name}
                        </CardTitle>

                        <CardDescription className="text-gray-600 text-center mt-5">
                          {coin.symbol.toUpperCase()}
                        </CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">
                      <p className="text-gray-700 font-bold">
                        {symbol + coin.current_price}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Coin;
