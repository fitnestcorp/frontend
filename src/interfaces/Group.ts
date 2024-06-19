import { Category } from './Category';

export interface Group {
	name: string;
	description: string;
	image_url: string;
	categories: Category[];

}
