import { Cart } from "./Cart";
import { User } from "./User";

export interface Order{
    user: number,
    address: string,
    cart: Cart[],
    totalprice: number
}