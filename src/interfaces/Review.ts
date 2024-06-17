import { User } from './User';

export interface Review {
	id: string;
	comment: string;
	rate: number;
	user: User;
}
