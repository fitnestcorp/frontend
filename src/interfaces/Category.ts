import { Group } from './Group';

export interface Category {
	id: string;
	name: string;
	description: string;
	image_url: string;
	group: Group;
}
