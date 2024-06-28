import { Box, Container, Paper, Typography } from '@mui/material';
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

/**
 * BarChartTopProducts component renders a bar chart displaying the top 10 best-selling products.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Product[]} props.products - The array of products to be displayed in the bar chart.
 * @returns {JSX.Element} The rendered BarChartTopProducts component.
 */
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
		<Container
			maxWidth="md"
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
			}}
		>
			<Paper sx={{ p: 4, width: '100%' }}>
				<Typography
					variant="h5"
					align="center"
					mb={2}
					fontWeight={'bold'}
				>
					Top 10 Productos Más Vendidos
				</Typography>

				<Bar data={data} options={options} />
			</Paper>
		</Container>
	);
};
