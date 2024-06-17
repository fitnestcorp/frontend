import { Review } from './Review';

export interface Product {
	id: string;
	name: string;
	description: string;
	price: number;
	rate: number;
    stock: number;
	images: string[];
	reviews: Review[];
}
