import { Pie } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	ArcElement,
	Tooltip,
	Legend,
	layouts,
} from 'chart.js';
import { Box } from '@mui/material';

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
		maintainAspectRatio: false,
		plugins: {
			legend: {
				position: 'top' as const,
			},
		},
	};

	return (
		<Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
			<Pie data={data} options={options} />
		</Box>
	);
};
