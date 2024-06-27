import { Product } from "./Product";

export interface ShoppingCartItem {
    id: string;
    product: Product;
    quantity: number;
    price: number;
  }