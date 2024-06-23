import { User } from './User';

// export interface Review {
// 	id: string;
// 	comment: string;
// 	score: number;
// 	user: User;
// }
export interface Review {
	id: string;
	author: string;
	publication_date: string;
	score: number;
	title: string;
	content: string;
}
