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
    <ResponsiveContainer width="100%" height={300}>
      <BarChart width={150} height={40} data={chartData}>
     
        <defs>
          <linearGradient id="gradientId" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#22c55e" /> {/* Green-500 */}
            <stop offset="100%" stopColor="#06b6d4" /> {/* Cyan-400 */}
          </linearGradient>
        </defs>

        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid strokeDasharray="3 3" />

      
        <Bar dataKey="total" fill="url(#gradientId)" barSize={40} />
      </BarChart>
    </ResponsiveContainer>
  );
};
