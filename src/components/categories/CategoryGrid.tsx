import { SeedCategory } from '@/seed/seed';
import { CategoryCard } from './CategoryCard';

interface Props {
	categories: SeedCategory[];
}

export const CategoryGrid = ({ categories }: Props) => {
	return (
		<section className="py-8">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<h2 className="text-center text-2xl font-bold mb-8">
					ENTRENAMIENTO
				</h2>
				<div className="flex flex-wrap justify-center gap-4">
					{categories.map((category, index) => (
						<div
							key={category.name}
							className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex justify-center"
						>
							<CategoryCard
								href={`/${category.name}`}
								name={category.name}
								imageSrc={category.image}
							/>
						</div>
					))}
				</div>
			</div>
		</section>

		// <section className="py-8">
		// 	<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		// 		<h2 className="text-center text-2xl font-bold mb-8">
		// 			ENTRENAMIENTO
		// 		</h2>
		// 		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
		// 			{categories.map((category, index) => (
		// 				<div
		// 					key={category.name}
		// 					className={`${
		// 						index >= 3 ? 'md:col-span-1' : ''
		// 					}`}
		// 				>
		// 					<CategoryCard
		// 						href={`/${category.name}`}
		// 						name={category.name}
		// 						imageSrc={category.image}
		// 					/>
		// 				</div>
		// 			))}
		// 		</div>
		// 	</div>
		// </section>
	);
};
