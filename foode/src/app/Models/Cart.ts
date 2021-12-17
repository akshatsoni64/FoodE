import { Food } from "./Food";

export interface Cart{
    id: number,
    user: number,
    food: Food,
    totalprice: number,
    quantity: number,
    active: boolean
}