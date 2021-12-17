import { Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faMinusCircle, faPlusCircle, faShoppingBasket } from '@fortawesome/free-solid-svg-icons';
import { AppService } from '../app.service';
import { Cart } from '../Models/Cart';
import { Order } from '../Models/Order';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart!: Cart[];
  cartCount!: number;
  faplus = faPlusCircle;
  faminus = faMinusCircle;
  facross = faTrashAlt;
  fashop = faShoppingBasket;

  constructor(private service: AppService, private router: Router) { }

  ngOnInit(): void {
    this.service.getCart().subscribe((data: Cart[]) => {
      this.cart = data
      this.cartCount = this.cart.length
    })
  }

  addCartItem(item: Cart){
    this.service.updateCart(item, "add");
    this.cart.forEach((cartItem)=>{
      if(cartItem.id == item.id){
        item.quantity += 1
        item.totalprice = item.food.price*item.quantity
      }
    })
  }

  delCartItem(id: number){
    this.service.delCart(id)
    this.cart = this.cart.filter(data=>data.id!=id)
    this.cartCount -= 1
  }

  removeCartItem(item: Cart){
    this.service.updateCart(item, "sub");    
    this.cart.forEach((cartItem)=>{
      if(cartItem.id == item.id){
        item.quantity -= 1
        item.totalprice = item.food.price*item.quantity
      }
    })
  }

  calcPrice(): number{
    var sum: number = 0;
    this.cart.forEach((item)=>{
      sum+=parseInt(item.totalprice.toString())
    })
    return sum
  }

  placeOrder(address: string){
    if(address==''){
      alert("Address is required")
    }
    else{
      this.service.createOrder(this.cart, address)
      this.router.navigate(['user', 'order'])
    }
  }

}
