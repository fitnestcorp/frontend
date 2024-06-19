import { Review } from './Review';

export interface Product {
	id: string;
	name: string;
	description: string;
	price: number;
	rate: number;
    stock: number;
	image_url: string[];
	reviews: Review[];
}
