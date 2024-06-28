import { Order } from "./Order";

export interface User {
	id: string;
	email: string;
	first_name: string;
	last_name: string;
	birth_date: string;
	role: string;
	orders: Order[];
}
