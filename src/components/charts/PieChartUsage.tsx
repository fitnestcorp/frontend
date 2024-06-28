import { Box, Container, Paper, Typography } from '@mui/material';

import { PieChart } from '@/components';

interface Props {
	labels: string[];
	values: number[];
	title: string;
}

export const PieChartUsage = ({ labels, values, title }: Props) => {
	const blueColors = [
		'rgba(135, 206, 250, 0.5)',
		'rgba(0, 191, 255, 0.5)',
		'rgba(30, 144, 255, 0.5)',
		'rgba(100, 149, 237, 0.5)',
		'rgba(70, 130, 180, 0.5)',
		'rgba(65, 105, 225, 0.5)',
		'rgba(0, 0, 255, 0.5)',
		'rgba(0, 0, 205, 0.5)',
		'rgba(0, 0, 139, 0.5)',
		'rgba(25, 25, 112, 0.5)',
		'rgba(72, 61, 139, 0.5)',
		'rgba(106, 90, 205, 0.5)',
		'rgba(123, 104, 238, 0.5)',
		'rgba(147, 112, 219, 0.5)',
		'rgba(138, 43, 226, 0.5)',
		'rgba(75, 0, 130, 0.5)',
		'rgba(72, 61, 139, 0.5)',
		'rgba(65, 105, 225, 0.5)',
		'rgba(70, 130, 180, 0.5)',
	];

	const borderColor = blueColors.map((color) => color.replace('0.5', '1'));

	const data = {
		labels,
		datasets: [
			{
				label: 'Unidades Vendidas',
				data: values,
				backgroundColor: blueColors,
				borderColor: borderColor,
				borderWidth: 1,
			},
		],
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
					{title}
				</Typography>
				<Box sx={{ width: '100%', height: '500px' }}>
					<PieChart data={data} title={title} />
				</Box>
			</Paper>
		</Container>
	);
};
