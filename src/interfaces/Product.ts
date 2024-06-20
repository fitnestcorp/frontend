import { Category } from './Category';
import { Review } from './Review';

export interface Stock {
	id: string;
	stock: number;
	unities_sold: number | null;
}

export interface Product {
	id: string;
	name: string;
	type: string;
	create_date: string;
	description: string;
	price: number;
	image_url: string[];
	category: Category;
	status: string;
	stock: Stock;
	reviews: Review[];
	rate: number;
}
