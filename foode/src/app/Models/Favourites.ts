import { Food } from "./Food";
import { User } from "./User";

export interface Favourites{
    id: number,
    user: User,
    food: Food
}