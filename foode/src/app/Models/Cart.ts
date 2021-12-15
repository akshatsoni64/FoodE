import { Food } from "./Food";

export interface Cart{
    id: number,
    user: number,
    food: Food,
    quantity: number,
    active: boolean
}