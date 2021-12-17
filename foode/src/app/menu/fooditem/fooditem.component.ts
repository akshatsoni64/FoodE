import { Component, Input, OnInit } from '@angular/core';
import { faHeart as borderHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as filledHeart, faCartPlus, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { AppService } from 'src/app/app.service';
import { Food } from 'src/app/Models/Food';

@Component({
  selector: 'app-fooditem',
  templateUrl: './fooditem.component.html',
  styleUrls: ['./fooditem.component.css']
})
export class FooditemComponent implements OnInit {
  @Input() iteminfo!: {id: number, name: string, description: string, price: number, favourite: number};
  facart = faCartPlus;
  filledHeart = filledHeart;
  unfilledHeart = borderHeart;
  falogin = faSignInAlt;
  authed = false;
  
  constructor(
    private service: AppService,
  ) {}  
  
  ngOnInit(): void {    
    this.authed = "user" in sessionStorage
    this.service.isAuth.subscribe((data)=>{
      this.authed=data.auth
    })
  }
  
  addToCart(food: Food){
    this.service.add2Cart(food)
  }

  favItem(){
    if(this.iteminfo.favourite!=-1){
      this.service.delFavourite(this.iteminfo.favourite).subscribe((res)=>{
        this.iteminfo.favourite = -1
      })
    }
    else{
      this.service.add2Favourite(this.iteminfo).subscribe((res)=>{
        this.iteminfo.favourite = res.id
      })
    }
  }

}
