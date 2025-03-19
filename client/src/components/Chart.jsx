import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { chartData } from "../assets/data";

export const Chart = () => {
  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Sales Overview
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart width={150} height={40} data={chartData}>
          <defs>
            <linearGradient id="gradientId" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#22c55e" /> 
              <stop offset="100%" stopColor="#06b6d4" /> 
            </linearGradient>
          </defs>

          <XAxis dataKey="name" stroke="white" />
          <YAxis stroke="white" />
          <Tooltip contentStyle={{ backgroundColor: "#1f2937", color: "white" }} />
          <Legend 
            formatter={(value) => <span className="text-white">{value}</span>} 
          />
          <CartesianGrid strokeDasharray="3 3" stroke="gray" />

          <Bar dataKey="total" fill="url(#gradientId)" barSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
