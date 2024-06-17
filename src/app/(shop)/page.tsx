import { Box } from '@mui/material';

import { CategorySwiper } from '@/components';
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
		<div>
			<CategorySwiper categories={entrenamiento?.subcategories!} />
		</div>
	);
};

export default Home;
