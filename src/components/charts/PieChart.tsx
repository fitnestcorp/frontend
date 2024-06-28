import { Pie } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	ArcElement,
	Tooltip,
	Legend,
	layouts,
} from 'chart.js';

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

/**
 * PieChart component displays a pie chart with the provided data and title.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Object} props.data - The data object for the pie chart.
 * @param {string[]} props.data.labels - Array of labels for the chart.
 * @param {Object[]} props.data.datasets - Array of dataset objects for the chart.
 * @param {string} props.data.datasets.label - The label for the dataset.
 * @param {number[]} props.data.datasets.data - Array of data points for the chart.
 * @param {string[]} props.data.datasets.backgroundColor - Array of background colors for the chart segments.
 * @param {string[]} props.data.datasets.borderColor - Array of border colors for the chart segments.
 * @param {number} props.data.datasets.borderWidth - The width of the border for the chart segments.
 * @param {string} props.title - The title of the chart.
 * @returns {JSX.Element} The rendered PieChart component.
 */

export const PieChart = ({ data, title }: Props) => {
	const options = {
		responsive: true,
		aspectRatio: 1.5,
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
