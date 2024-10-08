import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import { createTheme } from '@mui/material/styles';
// import ThemePallete from 'enl-api/palette/themePalette';
import { PieChart, Pie, Sector } from 'recharts';

// const theme = createTheme(ThemePallete.greenTheme);
const color = {
  primary: 'black',
  secondary: 'red',
};

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';
  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`PV ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

renderActiveShape.propTypes = {
  cx: PropTypes.number,
  cy: PropTypes.number,
  midAngle: PropTypes.number,
  innerRadius: PropTypes.number,
  outerRadius: PropTypes.number,
  startAngle: PropTypes.number,
  endAngle: PropTypes.number,
  fill: PropTypes.string,
  payload: PropTypes.string,
  percent: PropTypes.number,
  value: PropTypes.number,
};

renderActiveShape.defaultProps = {
  cx: 0,
  cy: 0,
  midAngle: 0,
  innerRadius: 0,
  outerRadius: 0,
  startAngle: 0,
  endAngle: 0,
  fill: '#eee',
  payload: '',
  percent: 0,
  value: 0,
};

const data6 = [
  {
    name: 'Group A',
    value: 400,
  },
  {
    name: 'Group B',
    value: 300,
  },
  {
    name: 'Group C',
    value: 300,
  },
  {
    name: 'Group D',
    value: 200,
  },
];

function PieAnalytic() {
  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = (evt: any) => {
    const index = data6.findIndex((p) => p.name === evt.name);
    setActiveIndex(index);
  };

  return (
    <PieChart
      width={550}
      height={400}
      margin={{
        top: 5,
        right: 5,
        left: 120,
        bottom: 5,
      }}
    >
      <Pie
        dataKey="value"
        activeIndex={activeIndex}
        activeShape={renderActiveShape}
        data={data6}
        cx={150}
        cy={200}
        innerRadius={60}
        outerRadius={100}
        fill={color.secondary}
        fillOpacity="0.8"
        onMouseEnter={(event) => onPieEnter(event)}
      />
    </PieChart>
  );
}

export default PieAnalytic;
