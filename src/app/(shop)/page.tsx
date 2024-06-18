import { Box } from '@mui/material';

import { Banner, CategorySwiper } from '@/components';
import { SeedCategory, initialData } from '@/seed/seed';

const categories = initialData.categories;

export const Home = () => {
	const entrenamiento = categories.find(
		(category) => category.name === 'entrenamiento'
	);

	const equipamiento = categories.find(
		(category) => category.name === 'equipamiento'
	);

	return (
		<Box>
			<Banner
				image={'/banners/Yoga.png'}
				title={''}
			/>
			<CategorySwiper categories={entrenamiento?.subcategories!} />
		</Box>
	);
};

export default Home;
