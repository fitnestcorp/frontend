import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
	data: {
		labels: string[];
		datasets: {
			label: string;
			data: number[];
			backgroundColor: string[];
			borderColor: string[];
			borderWidth: number;
		}[];
	};
	title: string;
}

export const PieChart = ({ data, title }: Props) => {
	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: 'top' as const,
			},
			title: {
				display: true,
				text: title,
			},
		},
	};

	return <Pie data={data} options={options} />;
};
