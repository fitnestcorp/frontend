import { CategoryGrid, Slider } from '@/components';
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
			{/* <Slider
				images={entrenamiento!.subcategories!.map(
					(subcategory) => subcategory.image
				)}
				title={entrenamiento!.name}
				type="categories"
				className="m-3 h-96"
			/> */}
			<CategoryGrid categories={entrenamiento!.subcategories!} />
		</div>
	);
};

export default Home;
