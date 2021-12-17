import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faHeart, faShoppingBag, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
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
  faheart = faHeart;
  faorder = faShoppingBag;
  faexit = faSignOutAlt
  authed = false;
  cart!: Cart[];
  cartCount!: number;
  u!: any;
  isAdmin = false;
  
  constructor(
    private service: AppService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.service.isAuth.subscribe((data)=>{
      this.authed = data.auth
      this.u = data.user
      this.isAdmin = data.user.type == "admin"
    })
    
    if("user" in sessionStorage){
      this.u = this.service.getCurrentUser()
      this.isAdmin = this.u.type == "admin"
    }
    
    this.service.$cart.subscribe((data)=>{
      this.cart = data
      this.cartCount = this.cart.length
    })
    this.fetchCart()
    this.authed = ("user" in sessionStorage) ? true : false;
  }

  fetchCart(){
    this.service.getCart().subscribe((data: Cart[]) => {
      this.cart = data
      this.cartCount = this.cart.length
    })
  }

  logout(){
    sessionStorage.removeItem('user')
    this.authed = false;
    this.service.emitAuthMode(false);
    this.router.navigate(['login'])
  }
}
