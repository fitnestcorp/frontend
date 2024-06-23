import { Product } from "./Product";

export interface OrderItem {
    id: string;
    quantity: number;
    product: Product;
  }