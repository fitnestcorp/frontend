import { Box, Typography } from '@mui/material';

import { PieChart } from '@/components';

interface Props {
	labels: string[];
	values: number[];
	title: string;
}

export const PieChartUsage = ({ labels, values, title }: Props) => {
	const colors = [
		'rgba(255, 99, 132, 0.2)',
		'rgba(54, 162, 235, 0.2)',
		'rgba(255, 206, 86, 0.2)',
		'rgba(75, 192, 192, 0.2)',
		'rgba(153, 102, 255, 0.2)',
		'rgba(255, 159, 64, 0.2)',
		'rgba(199, 199, 199, 0.2)',
		'rgba(83, 102, 255, 0.2)',
		'rgba(255, 193, 7, 0.2)',
		'rgba(60, 179, 113, 0.2)',
		'rgba(255, 69, 0, 0.2)',
		'rgba(106, 90, 205, 0.2)',
		'rgba(240, 128, 128, 0.2)',
		'rgba(255, 20, 147, 0.2)',
		'rgba(0, 191, 255, 0.2)',
		'rgba(244, 164, 96, 0.2)',
		'rgba(34, 139, 34, 0.2)',
		'rgba(255, 215, 0, 0.2)',
		'rgba(138, 43, 226, 0.2)',
		'rgba(75, 0, 130, 0.2)',
	];

	const borderColor = colors.map((color) => color.replace('0.2', '1'));

	const data = {
		labels,
		datasets: [
			{
				label: 'Unidades Vendidas',
				data: values,
				backgroundColor: colors,
				borderColor: borderColor,
				borderWidth: 1,
			},
		],
	};

	return (
		<Box>
			<Typography variant="h5" align="center" mb={2} fontWeight={'bold'}>
				{title}
			</Typography>
			<PieChart data={data} title={title} />
		</Box>
	);
};
