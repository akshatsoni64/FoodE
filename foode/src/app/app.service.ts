import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

import { Cart } from './Models/Cart';
import { Favourites } from './Models/Favourites';
import { Food } from './Models/Food';
import { Order } from './Models/Order';
import { User } from './Models/User';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  apiUrl = "http://localhost:3000/";
  isAuth: EventEmitter<{auth: boolean, user: any}> = new EventEmitter();
  $cart: EventEmitter<Cart[]> = new EventEmitter();

  constructor(private http: HttpClient) { }

  getCurrentUser(): User{
    let uname: any = '';
    if("user" in sessionStorage){
      uname = sessionStorage.getItem('user')
      uname = JSON.parse(uname)
    }
    return uname
  }

  getUser(user: string){
    return this.http.get<User[]>(`${this.apiUrl}users/?username=${user}`)
  }

  emitAuthMode(val: boolean){
    this.isAuth.emit({
      auth: val,
      user: (val) ? this.getCurrentUser() : undefined
    })
  }

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
  getOrders(){
    return this.http.get<Order[]>(`${this.apiUrl}orders/?user=${this.getCurrentUser()['id']}`)
  }

  createOrder(cart: Cart[], address: string){
    let cartTotal = 0;
    cart.forEach((item)=>{
      cartTotal += parseInt(item.totalprice.toString())
    })
    let order: Order = {
      user: parseInt(this.getCurrentUser()['id'].toString() || '2'),
      cart: cart,
      address: address,
      totalprice: cartTotal
    }
    cart.forEach((item)=>{
      this.http.patch(`${this.apiUrl}cart/${item.id}`, {
        active: false
      }).subscribe()
    })
    return this.http.post(`${this.apiUrl}orders/`, order).subscribe((res)=>{
      this.getCart().subscribe((data)=>{
        this.$cart.emit(data)
      })
    })
  }

  getCart(){
    return this.http.get<Cart[]>(`${this.apiUrl}cart?user=${this.getCurrentUser()['id']}&active=true`);
  }

  add2Cart(food: Food){
    this.http.get<Cart[]>(`${this.apiUrl}cart?user=${this.getCurrentUser()['id']}&food.id=${food.id}&active=true`).subscribe((data)=>{
      if(data.length > 0){
        let q = parseInt((data[0]['quantity'] + 1).toString());
        this.http.patch(
          `${this.apiUrl}cart/${data[0]['id']}/`,
          {
            totalprice: data[0]['food']['price'] * q,
            quantity: q
          }
        ).subscribe()
      }
      else{
        let item = {
          "food": food, "user": 2, totalprice: food.price,
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
      'quantity': q,
      'totalprice': cart.food.price*q
    };
    this.http.patch(`${this.apiUrl}cart/${cart.id}`, data).subscribe();
  }

  getFavourite(){
    return this.http.get<Favourites[]>(`${this.apiUrl}favourites?user=${this.getCurrentUser()['id']}`)
  }

  add2Favourite(foodItem: Food){
    let data = {
      user: this.getCurrentUser()['id'],
      food: foodItem
    }
    return this.http.post<Favourites>(`${this.apiUrl}favourites`, data)
  }

  delFavourite(id: number){
    return this.http.delete(`${this.apiUrl}favourites/${id}`)
  }
}
