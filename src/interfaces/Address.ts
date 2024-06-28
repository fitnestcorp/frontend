import { City } from "./City";

export interface Address {
    id:string;
    address: string;
    phone_number: string;
    zip_code: string;
    city: City;
  }