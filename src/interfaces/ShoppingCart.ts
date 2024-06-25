import { ShoppingCartItem } from "./ShoppingCartItem";
import { User } from "./User";

export interface ShoppingCart {
    id: string;
    items: ShoppingCartItem[];
    sub_total: number;
    user: User;
  }