"use client";
import React, { useState, useEffect } from "react";
import PeopleIcon from "@mui/icons-material/People";
import CategoryIcon from "@mui/icons-material/Category";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import TimelineIcon from "@mui/icons-material/Timeline";
import BarChartIcon from "@mui/icons-material/BarChart";
import {
  fetchAllOrderNumbers,
  fetchTotalRevenue,
  fetchWeeklyOrderCount,
} from "@/lib/data";
import SalesChart from "./SalesChart";

const Overview = () => {
  const [ordercount, setOrdercount] = useState<number>(0);
  const [totalOrderPrice, setTotalOrderPrice] = useState<number>(0);
  const [weeklyOrderCount, setWeeklyOrderCount] = useState<number>(0);

  const handleFetchStatus = async () => {
    const ordercounts = await fetchAllOrderNumbers();
    const totalOrderPrice = await fetchTotalRevenue();
    const weeklyorder = await fetchWeeklyOrderCount();
    setOrdercount(ordercounts);
    setTotalOrderPrice(totalOrderPrice);
    setWeeklyOrderCount(weeklyorder);
  };

  useEffect(() => {
    handleFetchStatus();
  }, []);

  const overviewItems = [
    {
      logo: <PeopleIcon className="text-[40px] text-[#130a3e]" />,
      title: "Total Number of Visiters",
      value: "251",
    },
    {
      logo: <CategoryIcon className="text-[40px] text-[#130a3e]" />,
      title: "Total Number of Orders",
      value: ordercount,
    },
    {
      logo: <AttachMoneyIcon className="text-[40px] text-[#130a3e]" />,
      title: "Total Income",
      value: totalOrderPrice + "$",
    },
    {
      logo: <TimelineIcon className="text-[40px] text-[#130a3e]" />,
      title: "Order by Week",
      value: weeklyOrderCount,
    },
  ];

  return (
    <div className="overviewContainer h-fit w-full flex flex-col gap-5 text-white">
      <ul className="overviewTopContainer w-full h-[150px] grid grid-cols-4 gap-5">
        {overviewItems.map((item, index) => (
          <li
            className="w-full p-3 flex flex-col items-center justify-center gap-2 bg-[#4048b9] rounded-[5px] cursor-pointer hover:bg-[#636cea]"
            key={index}
          >
            <div className="flex items-center gap-2">
              {item.logo}
              <p className="text-[15px] font-semibold">{item.title}</p>
            </div>
            <div className="itemValuesContainer">
              <p className="text-[17px] font-light">{item.value}</p>
            </div>
          </li>
        ))}
      </ul>
      <div className="overviewBottomContainer w-full h-fit pb-[50px] p-3 bg-[#4048b9] rounded-md">
        <div className="titleContainer flex items-center gap-2">
          <BarChartIcon className="text-[40px] text-[#130a3e]" />
          <p className="text-[18px] font-medium">Monthly Sales Statistics</p>
        </div>
        <SalesChart />
      </div>
    </div>
  );
};

export default Overview;
