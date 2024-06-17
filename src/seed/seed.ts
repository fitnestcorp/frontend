export interface SeedProduct {
	title: string;
	description: string;
	slug: string;
	price: number;
	images: string[];
	stock: number;
	rating: Rating;
	category: ValidCategories;
}

interface Rating {
	rate: number;
	reviews: number;
}

export interface SeedCategory {
	name: ValidCategories;
	slug: string;
	image: string;
	subcategories?: SeedCategory[];
}

type ValidCategories =
	| 'entrenamiento'
	| 'equipamiento'
	| 'servicios'
	| 'cardio'
	| 'fuerza'
	| 'funcional'
	| 'boxeo'
	| 'yoga';

interface SeedData {
	products: SeedProduct[];
	categories: SeedCategory[];
}

export const initialData: SeedData = {
	products: [
		{
			title: 'Mancuernas de 10kg',
			description: 'Mancuernas de 10kg 🙂👍',
			slug: 'mancuernas_10kg',
			price: 50000,
			images: [
				'mancuernas-10kg-1.jpg',
				// 'mancuernas-10kg-2.jpg',
				// 'mancuernas-10kg-3.jpg',
			],
			stock: 10,
			rating: { rate: 4.5, reviews: 20 },
			category: 'fuerza' || 'entrenamiento',
		},
		{
			title: 'Esterillas de yoga',
			description: 'Esterillas de yoga 🧘‍♀️🧘‍♂️',
			slug: 'esterillas_yoga',
			price: 40000,
			images: [
				'esterillas-yoga-1.jpg',
				// 'esterillas-yoga-2.jpg',
				// 'esterillas-yoga-3.jpg',
			],
			stock: 20,
			rating: { rate: 4.2, reviews: 12 },
			category: 'yoga' || 'entrenamiento',
		},
	],
	categories: [
		{
			name: 'entrenamiento',
			slug: 'entrenamiento',
			image: 'entrenamiento.jpg',
			subcategories: [
				{
					name: 'cardio',
					slug: 'cardio',
					image: 'cardio.jpg',
				},
				{
					name: 'fuerza',
					slug: 'fuerza',
					image: 'fuerza.jpg',
				},
				{
					name: 'funcional',
					slug: 'funcional',
					image: 'funcional.jpg',
				},
				{
					name: 'boxeo',
					slug: 'boxeo',
					image: 'boxeo.jpg',
				},
				{
					name: 'yoga',
					slug: 'yoga',
					image: 'yoga.jpg',
				},
			],
		},
		{
			name: 'equipamiento',
			slug: 'equipamiento',
			image: 'equipamiento.jpg',
		},
		{
			name: 'servicios',
			slug: 'servicios',
			image: 'servicios.jpg',
		},
		{
			name: 'cardio',
			slug: 'cardio',
			image: 'cardio.jpg',
		},
		{
			name: 'fuerza',
			slug: 'fuerza',
			image: 'fuerza.jpg',
		},
		{
			name: 'funcional',
			slug: 'funcional',
			image: 'funcional.jpg',
		},
		{
			name: 'boxeo',
			slug: 'boxeo',
			image: 'boxeo.jpg',
		},
		{
			name: 'yoga',
			slug: 'yoga',
			image: 'yoga.jpg',
		},
	],
};
