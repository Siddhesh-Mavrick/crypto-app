import api from "@/services/api";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";

const Exchanges = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await api.get("/exchanges");
      setData(data);
      console.log(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      {loading ? (
        <div className="">
          <Loader />
        </div>
      ) : (
        <div className="flex items-center justify-center flex-wrap gap-6">
          {data.map((exApp, index) => {
            return (
              <Link to={exApp.url} target="blank">
                <Card
                  key={exApp.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden w-[200px] h-[300px] hover:shadow-xl transition-shadow duration-300 cursor-pointer flex flex-col  items-center justify-center"
                >
                  <CardHeader className="">
                    <img
                      src={exApp.image}
                      alt={`${exApp.name} logo`}
                      className="w-16 h-16 rounded-full self-center"
                    />
                    <div>
                      <CardTitle className="text-lg font-bold text-gray-800 text-center self-center">
                        {exApp.name}
                      </CardTitle>
                      <CardDescription className="text-gray-600 text-center ">
                        <h1 className="font-bold text-xl m-4">{index + 1}</h1>
                        <span>{exApp.country ? `${exApp.country}` : "NA"}</span>
                      </CardDescription>
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Exchanges;
