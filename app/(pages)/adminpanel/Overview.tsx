import React from "react";
import PeopleIcon from "@mui/icons-material/People";
import CategoryIcon from "@mui/icons-material/Category";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import TimelineIcon from "@mui/icons-material/Timeline";
import BarChartIcon from "@mui/icons-material/BarChart";

const Overview = () => {
  const overviewItems = [
    {
      logo: <PeopleIcon className="text-[40px] text-[#130a3e]" />,
      title: "Total Number of Visiters",
      value: "574",
    },
    {
      logo: <CategoryIcon className="text-[40px] text-[#130a3e]" />,
      title: "Total Number of Orders",
      value: "1386",
    },
    {
      logo: <AttachMoneyIcon className="text-[40px] text-[#130a3e]" />,
      title: "Total Income",
      value: "185.334$",
    }, //grafik
    {
      logo: <TimelineIcon className="text-[40px] text-[#130a3e]" />,
      title: "Order by Week",
      value: "100",
    }, //grafik
  ];
  return (
    <div className="overviewContainer h-full w-full flex flex-col gap-5 text-white">
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
      <div className="overviewBottomContainer w-full h-[400px] p-3 bg-[#4048b9]">
        <div className="titleContainer flex items-center gap-2">
          <BarChartIcon className="text-[40px] text-[#130a3e]" />
          <p className="text-[18px] font-medium">Sales Statistics</p>
        </div>
      </div>
    </div>
  );
};

export default Overview;
