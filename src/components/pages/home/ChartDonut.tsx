import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend
} from 'recharts';

interface ChartDonutProps {
  data: { name: string; value: number }[];
  colors?: string[];
  innerRadius?: number;
  outerRadius?: number;
  paddingAngle?: number;
  cx?: number | string;
  cy?: number | string;
}

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = (
  { cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any
) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const ChartDonut: React.FC<ChartDonutProps> = ({
  data,
  colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'],
  innerRadius = 60,
  outerRadius = 80,
  paddingAngle = 5,
  cx = '50%',
  cy = '50%',
}) => {
  return (
    <div style={{ width: '100%', height: '250px' }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            cx={cx}
            cy={cy}
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            paddingAngle={paddingAngle}
            dataKey="value"
            label={renderCustomizedLabel}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value: number, name: string) => `${value}`} />
          <Legend
            layout="horizontal"
            verticalAlign="bottom"
            align="left"
            payload={data.map((item, index) => ({
              value: item.name,
              type: 'square',
              color: colors[index % colors.length],
            }))}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartDonut;
