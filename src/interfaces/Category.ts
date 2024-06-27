import { Group } from './Group';
import { Product } from './Product';

export interface Category {
	id: string;
	name: string;
	description: string;
	image_url: string;
	group: Group;
	products: Product[];
}
