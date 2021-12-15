import { Component, OnChanges, OnInit } from '@angular/core';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faMinusCircle, faPlusCircle, faShoppingBasket } from '@fortawesome/free-solid-svg-icons';
import { AppService } from '../app.service';
import { Cart } from '../Models/Cart';

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
  fashop = faShoppingBasket

  constructor(private service: AppService) { }

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
      }
    })
  }

  delCartItem(id: number){
    this.service.delCart(id)
    this.cart = this.cart.filter(data=>data.id!=id)
  }

  removeCartItem(item: Cart){
    this.service.updateCart(item, "sub");    
    this.cart.forEach((cartItem)=>{
      if(cartItem.id == item.id){
        item.quantity -= 1
      }
    })
  }

}
