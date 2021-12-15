import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

import { Cart } from './Models/Cart';
import { Favourites } from './Models/Favourites';
import { Food } from './Models/Food';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private apiUrl = "http://localhost:3000/";
  private user = sessionStorage.getItem('user');
  $cart: EventEmitter<Cart[]> = new EventEmitter();

  constructor(private http: HttpClient) { }

  // Admin only
  addFood(food: {name: string, description: string, price: number}){
    return this.http.post(`${this.apiUrl}food/`, food)
  }

  updateFood(food: {name: string, description: string, price: number}, id: number){
    return this.http.put(`${this.apiUrl}food/${id}/`, food)
  }

  delFood(id: number){
    this.http.delete(`${this.apiUrl}food/${id}`).subscribe((data)=>console.log(data))
  }

  // Common
  getFood(): Observable<Food[]>{
    return this.http.get<Food[]>(`${this.apiUrl}food/`);
  }

  // User only
  getCart(){
    return this.http.get<Cart[]>(`${this.apiUrl}cart?user=${this.user}&active=true`);
  }

  add2Cart(food: Food){
    this.http.get<Cart[]>(`${this.apiUrl}cart?user=${this.user}&food.id=${food.id}&active=true`).subscribe((data)=>{
      if(data.length > 0){
        this.http.patch(`${this.apiUrl}cart/${data[0]['id']}/`, {quantity: <number>data[0]['quantity']+1}).subscribe()
      }
      else{
        let item = {
          "food": food, "user": 2,
          "active": true, "quantity": 1
        };
        this.http.post(`${this.apiUrl}cart/`, item).subscribe((res) => {
          this.getCart().subscribe((data)=>{
            this.$cart.emit(data)
          })
        });
      }
    });
  }

  delCart(id:number){
    this.http.delete(`${this.apiUrl}cart/${id}/`).subscribe((data)=>{
      this.getCart().subscribe((data)=>{
        this.$cart.emit(data)
      })
    })
  }

  updateCart(cart:Cart, operation: string): void{
    var q = operation == "add" ? cart.quantity + 1 : cart.quantity - 1;

    var data = {
      'quantity': q
    };
    this.http.patch(`${this.apiUrl}cart/${cart.id}`, data).subscribe();
  }

  getFavourite(){
    return this.http.get<Favourites[]>(`${this.apiUrl}favourites?user=${this.user}`)
  }

  add2Favourite(foodItem: Food){
    let data = {
      user: this.user,
      food: foodItem
    }
    return this.http.post<Favourites>(`${this.apiUrl}favourites`, data)
  }

  delFavourite(id: number){
    return this.http.delete(`${this.apiUrl}favourites/${id}`)
  }
}
