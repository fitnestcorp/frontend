import { Address } from "./Address";
import { OrderItem } from "./OrderItem";
import { PaymentMethod } from "./PaymentMethod";
import { Status } from "./Status";
import { User } from "./User";

export interface Order {
    id: string;
    total_price: number;
    status: Status;
    creation_date: Date;
    shipment_date?: Date;
    received_date?: Date;
    items: OrderItem[];
    user: User;
    address: Address;
    payment_method: PaymentMethod;
  }