import { User } from './User';

export interface Review {
	id: string;
	comment: string;
	score: number;
	user: User;
}
