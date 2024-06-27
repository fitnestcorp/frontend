import { Category } from './Category';

export interface Group {
	id:string;
	name: string;
	description: string;
	image_url: string;
	categories: Category[];

}
