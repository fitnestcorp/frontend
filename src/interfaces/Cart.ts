export interface Cart {
	id: string;
	userId: string;
	cartItems: CartItem[];
	total: number;
}

export interface CartItem {
	id: string;
	name: string;
	description: string;
	image_url: string;
	price: number;
	quantity: number;
}
