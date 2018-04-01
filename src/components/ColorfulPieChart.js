import React from "react";
import {
	PieChart,
	Pie,
	Tooltip,
	Legend,
	ResponsiveContainer,
	Cell
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#f44336", "#e91e63", "#00bcd4", "#ff5722", "#ff9800", "#8bc34a"];

const ColorfulPieChart = ({ data }) => (
	<ResponsiveContainer width={"100%"} height={250}>
		<PieChart>
			<Tooltip />
			<Legend />
			<Pie
				data={data}
				dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={50} fill="#8884d8">
				{
					data.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)
				}
			</Pie>
		</PieChart>
	</ResponsiveContainer>
);

export default ColorfulPieChart;
