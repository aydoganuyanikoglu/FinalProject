"use client";
import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { fetchMonthlySales } from "@/lib/data";

interface SalesDataType {
  sales_month: string;
  total_sales: number;
}

const fillMissingMonths = (
  data: SalesDataType[],
  startMonth: Date,
  endMonth: Date
): SalesDataType[] => {
  const filledData: SalesDataType[] = [];
  const monthMap = new Map(data.map((item) => [item.sales_month, item]));

  let currentMonth = new Date(startMonth);
  while (currentMonth <= endMonth) {
    const formattedMonth = currentMonth.toISOString().slice(0, 7);
    filledData.push(
      monthMap.get(formattedMonth) || {
        sales_month: formattedMonth,
        total_sales: 0,
      }
    );
    currentMonth.setMonth(currentMonth.getMonth() + 1);
  }

  return filledData;
};

const SalesChart = () => {
  const [salesData, setSalesData] = useState<SalesDataType[]>([]);

  useEffect(() => {
    const getSalesData = async () => {
      try {
        const data = await fetchMonthlySales();

        const startMonth = new Date();
        startMonth.setMonth(startMonth.getMonth() - 3);

        const endMonth = new Date();
        endMonth.setMonth(endMonth.getMonth() + 3);

        const filledData = fillMissingMonths(data, startMonth, endMonth);
        setSalesData(filledData);
      } catch (error) {
        console.error("Error fetching sales data:", error);
      }
    };

    getSalesData();
  }, []);

  return (
    <div className="chart-container mt-5 w-full h-fit p-5 bg-blue-500 rounded-md">
      <ResponsiveContainer width="100%" height={500}>
        <LineChart
          data={salesData}
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        >
          <CartesianGrid stroke="rgba(255, 255, 255, 0.2)" />
          <XAxis
            dataKey="sales_month"
            stroke="#fff"
            tick={{ fill: "#fff" }}
            interval={0}
          />
          <YAxis stroke="#fff" tick={{ fill: "#fff" }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#333",
              borderColor: "#fff",
            }}
            labelStyle={{ color: "#fff" }}
            itemStyle={{ color: "#fff" }}
          />
          <Line
            type="monotone"
            dataKey="total_sales"
            stroke="#52eb34"
            strokeWidth={4}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesChart;
