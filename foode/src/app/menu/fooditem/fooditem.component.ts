import { Component, Input, OnInit } from '@angular/core';
import { faHeart as borderHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as filledHeart, faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { AppService } from 'src/app/app.service';
import { Favourites } from 'src/app/Models/Favourites';
import { Food } from 'src/app/Models/Food';
import { NavigationComponent } from 'src/app/navigation/navigation.component';

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
  
  constructor(private service: AppService) {}  
  
  ngOnInit(): void {}
  
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

  delFav(id: number){
    
  }

}
