import React, { useEffect, useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

const COLORS = [
  '#8884d8', '#82ca9d', '#ffc658', '#d0ed57',
  '#a4de6c', '#8dd1e1', '#83a6ed', '#8a7fdd',
  '#d084ed', '#ed6495'
];

const DonutTooltip = ({ active, payload }) => {
  if (active && payload && payload.length > 0) {
    const { name, type, totalDamage } = payload[0].payload;
    return (
      <div className="bg-gray-800 text-white p-2 rounded shadow">
        <p><strong>Name:</strong> {name}</p>
        <p><strong>Type:</strong> {type}</p>
        <p><strong>Total Damage:</strong> {totalDamage.toFixed(0)}</p>
      </div>
    );
  }
  return null;
};

function DamageDonutChart({ data }) {
  const [groupedData, setGroupedData] = useState([]);

  useEffect(() => {
    if (data?.damageInstances) {
      const grouped = {};

      data.damageInstances.forEach(({ name, type, damageValue }) => {
        if (!grouped[name]) {
          grouped[name] = { name, type, totalDamage: 0 };
        }
        grouped[name].totalDamage += damageValue;
      });

      setGroupedData(Object.values(grouped));
    }
  }, [data]);

  if (!groupedData.length) return null;

  return (
    <div className="text-white w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={groupedData}
            dataKey="totalDamage"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            innerRadius={40}
            label={({ name }) => name}
          >
            {groupedData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<DonutTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default DamageDonutChart;
