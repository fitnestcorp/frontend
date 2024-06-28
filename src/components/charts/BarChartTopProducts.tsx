import { Box, Typography } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';

import { Product } from '@/interfaces';

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

interface Props {
	products: Product[];
}

export const BarChartTopProducts = ({ products }: Props) => {
	const sortedProducts = [...products]
		.sort(
			(a, b) =>
				(b.stock?.unities_sold ?? 0) - (a.stock?.unities_sold ?? 0)
		)
		.slice(0, 10);

	const data = {
		labels: sortedProducts.map((product) => product.name),
		datasets: [
			{
				label: 'Unidades Vendidas',
				data: sortedProducts.map(
					(product) => product.stock.unities_sold
				),
				backgroundColor: 'rgba(54, 162, 235, 0.8)',
				borderColor: 'rgba(0, 0, 0, 1)',
				borderWidth: 1,
			},
		],
	};

	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: 'top' as const,
			},
		},
	};

	return (
		<Box>
			<Typography variant="h5" align="center" mb={2} fontWeight={'bold'}>
				Top 10 Productos Más Vendidos
			</Typography>
			<Bar data={data} options={options} />
		</Box>
	);
};
