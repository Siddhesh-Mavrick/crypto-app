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
  Text,
  Box,
  Button,
} from "@chakra-ui/react";
import Chart from "./Chart";

const CoinDetails = () => {
  const [loading, setLoading] = useState(true);
  const [coin, setCoin] = useState({});
  const [currency, setCurrency] = useState("inr");
  const params = useParams();
  const [symbol, setSymbol] = useState("₹");
  const [days, setDays] = useState("24h");
  const [chartArray, setChartArray] = useState([]);

  const btns = ["24h", "7d", "14d", "30d", "60d", "200d", "1y", "max"];

  const switchChartStats = (key) => {
    switch (key) {
      case "24h":
        setDays("24h");
        break;
      case "7d":
        setDays("7d");
        break;
      case "14d":
        setDays("14d");
        break;
      case "30d":
        setDays("30d");
        break;
      case "60d":
        setDays("60d");
        break;
      case "200d":
        setDays("200d");
        break;
      case "1y":
        setDays("365d");
        break;
      case "max":
        setDays("max");
        break;
      default:
        setDays("24h");
        break;
    }
    setLoading(true);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await api.get(`coins/${params.id}`);
        const { data: chartData } = await api.get(
          `coins/${params.id}/market_chart`,
          {
            params: {
              vs_currency: currency,
              days: days,
            },
          }
        );
        setChartArray(chartData.prices);
        setCoin(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    getData();
  }, [params.id, currency, days]); // Added currency and days to dependencies

  return (
    <div className="min-h-[80vh]">
      {loading ? (
        <div className="flex items-center justify-center min-h-[80vh] w-full">
          <Loader />
        </div>
      ) : (
        <>
          <div className="" >
            <div className="self-center ml-16 mr-16">
              <RadioGroup
                defaultValue="inr"
                onValueChange={(value) => {
                  setCurrency(value);
                  setSymbol(
                    value === "inr" ? "₹" : value === "usd" ? "$" : "€"
                  );
                }}
                className="flex max-w-full items-center gap-4 m-3 self-start "
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

              <Box>
                <Chart currency={symbol} arr={chartArray} days={days} />
              </Box>

              <HStack p="4" overflowX={"auto"}>
                {btns.map((i) => (
                  <Button
                    disabled={days === i}
                    key={i}
                    onClick={() => switchChartStats(i)}
                  >
                    {i}
                  </Button>
                ))}
              </HStack>

              <div>
                <p className="text-center text-gray-400">
                  Last Updated on {coin?.last_updated}
                </p>

                <img
                  src={coin?.image?.large}
                  alt={coin?.name}
                  className="w-12 h-12"
                />

                <Stat>
                  <StatLabel>{coin?.name}</StatLabel>
                  <StatNumber>
                    {symbol} {coin?.market_data?.current_price?.[currency] ?? "N/A"}
                  </StatNumber>

                  <StatHelpText>
                    <StatArrow
                      type={
                        coin?.market_data?.market_cap_change_percentage_24h < 0
                          ? "decrease"
                          : "increase"
                      }
                    />
                    {coin?.market_data?.market_cap_change_percentage_24h ?? "N/A"}%
                  </StatHelpText>
                </Stat>

                <Badge
                  fontSize={"2xl"}
                  color={"white"}
                  bgColor={"blackAlpha.800"}
                  p={2}
                  mb={2}
                >
                  {`#${coin?.market_cap_rank ?? "N/A"}`}
                </Badge>

                <CustomBar
                  high={`${symbol} ${coin?.market_data?.high_24h?.[currency] ?? "N/A"}`}
                  low={`${symbol}${coin?.market_data?.low_24h?.[currency] ?? "N/A"}`}
                />

                <Box w={"full"} p={"4"}>
                  <Item
                    title={"Max-Supply"}
                    value={coin?.market_data?.max_supply ?? "N/A"}
                  />
                  <Item
                    title={"Circulating-Supply"}
                    value={coin?.market_data?.circulating_supply ?? "N/A"}
                  />
                  <Item
                    title={"Market Cap"}
                    value={
                      coin?.market_data?.market_cap?.[currency]
                        ? `${symbol} ${coin?.market_data?.market_cap?.[currency]}`
                        : "N/A"
                    }
                  />
                  <Item
                    title={"All-time-low"}
                    value={
                      coin?.market_data?.atl?.[currency]
                        ? `${symbol} ${coin?.market_data?.atl?.[currency]}`
                        : "N/A"
                    }
                  />
                  <Item
                    title={"All-time-high"}
                    value={
                      coin?.market_data?.ath?.[currency]
                        ? `${symbol} ${coin?.market_data?.ath?.[currency]}`
                        : "N/A"
                    }
                  />
                </Box>
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
      <Text fontSize={"sm"} colorScheme={"yellow"}>
        24H Range
      </Text>
      <Badge colorScheme={"green"}>{high}</Badge>
    </HStack>
  </VStack>
);

const Item = ({ title, value }) => {
  return (
    <HStack justifyContent={"space-between"} w={"full"} my={"4"}>
      <Text fontFamily={"Bebas Neue"} letterSpacing={"widest"}>
        {title}
      </Text>
      <Text>{value}</Text>
    </HStack>
  );
};

export default CoinDetails;
