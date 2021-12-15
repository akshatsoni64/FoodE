import { Component, Input, OnInit } from '@angular/core';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { AppService } from '../app.service';
import { Cart } from '../Models/Cart';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  @Input() title: string = '';
  facart = faCartPlus;
  faheart = faHeart
  cart!: Cart[];
  cartCount!: number;
  
  constructor(private service: AppService) { }

  ngOnInit(): void {
    this.service.$cart.subscribe((data)=>{
      this.cart = data
      this.cartCount = this.cart.length
    })
    this.fetchCart()
  }

  fetchCart(){
    this.service.getCart().subscribe((data: Cart[]) => {
      this.cart = data
      this.cartCount = this.cart.length
    })
  }
}
