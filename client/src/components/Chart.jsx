import React from "react";
import {
  ComposedChart,
  Line,
  Bar,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Feb 1", high: 85, medium: 58, low: 25 },
  { name: "Feb 5", high: 88, medium: 60, low: 28 },
  { name: "Feb 10", high: 90, medium: 62, low: 30 },
  { name: "Feb 15", high: 87, medium: 19, low: 27 },
];

export const Chart = () => {
  return (
    <div className="p-4 bg-white dark:bg-gray-900 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Data Overview (High, Medium, Low)
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="lightgray" />

          <XAxis dataKey="name" stroke="gray" />
          <YAxis stroke="gray" />

          <Tooltip contentStyle={{ backgroundColor: "#1e293b", color: "white", borderRadius: "8px", padding: "8px" }} />
          <Legend />

          <Area type="monotone" dataKey="low" fill="#06b6d4" stroke="#06b6d4" fillOpacity={0.3} />

       
          <Bar dataKey="medium" fill="#facc15" barSize={40} />

          <Line type="monotone" dataKey="high" stroke="#ef4444" strokeWidth={3} dot={{ r: 5 }} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

