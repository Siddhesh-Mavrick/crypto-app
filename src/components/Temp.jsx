import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "./Loader";
import api from "@/services/api";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@radix-ui/react-label";
import {
  Badge,
  HStack,
  Progress,
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber,
  VStack,
} from "@chakra-ui/react";
import { Text } from "lucide-react";

const Coindetails = () => {
  const [loading, setLoading] = useState(true);
  const [coin, setCoin] = useState({});
  const [currency, setCurrency] = useState("inr");
  const params = useParams();
  const [symbol, setSymbol] = useState("₹");

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await api.get(`coins/${params.id}`);
        console.log(data);
        setCoin(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    getData();
  }, [params.id]);

  return (
    <div className="min-h-[80vh]">
      {loading ? (
        <div className="flex items-center justify-center min-h-[80vh] w-full">
          <Loader />
        </div>
      ) : (
        <>
          <div className="">
            <div className="self-start">
              <RadioGroup
                defaultValue="inr"
                onValueChange={(value) => {
                  setCurrency(value);
                  setSymbol(
                    value === "inr" ? "₹" : value === "usd" ? "$" : "€"
                  );
                }}
                className="flex max-w-full items-center gap-4 m-3 self-start"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="inr" id="option-inr" />
                  <Label htmlFor="option-inr">INR</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="eur" id="option-eur" />
                  <Label htmlFor="option-eur">EUR</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="usd" id="option-usd" />
                  <Label htmlFor="option-usd">USD</Label>
                </div>
              </RadioGroup>

              <div>
                <p className="text-center text-gray-400">
                  Last Updated on {new Date(coin.last_updated).toLocaleString()}
                </p>

                <img src={coin.image.large} alt={coin.name} />

                <Stat>
                  <StatLabel>{coin.name}</StatLabel>
                  <StatNumber>
                    {symbol} {coin.market_data.current_price[currency]}
                  </StatNumber>

                  <StatHelpText>
                    <StatArrow
                      type={
                        coin.market_data.market_cap_change_percentage_24h < 0
                          ? "decrease"
                          : "increase"
                      }
                    />
                    {coin.market_data.market_cap_change_percentage_24h}%
                  </StatHelpText>
                </Stat>

                <Badge
                  fontSize="2xl"
                  color="white"
                  bgColor="blackAlpha.800"
                  p={2}
                >
                  {`#${coin.market_cap_rank}`}
                </Badge>

                <CustomBar
                  high={coin.market_data.high_24h[currency]}
                  low={coin.market_data.low_24h[currency]}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const CustomBar = ({ high, low }) => (
  <VStack w={"full"}>
    <Progress value={50} colorScheme={"teal"} w={"full"} />
    <HStack justifyContent={"space-between"} w={"full"}>
      <Badge colorScheme={"red"}>{low}</Badge>
      <Text fontSize={"sm"}>24H Range</Text>
      <Badge colorScheme={"green"}>{high}</Badge>
    </HStack>
  </VStack>
);

export default Coindetails;
