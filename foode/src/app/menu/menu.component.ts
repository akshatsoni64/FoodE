import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Favourites } from '../Models/Favourites';
import { Food } from '../Models/Food';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private service: AppService) { }

  fooditems!: any[];
  favs!: Favourites[]

  ngOnInit(): void {
    this.service.getFood().subscribe((data)=>{
      this.fooditems=data
      
      this.service.getFavourite().subscribe((favs)=>{
        this.favs = favs
        
        this.fooditems.forEach((item)=>{
          item.favourite = -1
          this.favs.forEach((fav)=>{
            if(fav.food.id == item.id && item.favourite == -1){
              item.favourite = fav.id
            }
          })
        })
    
      })
    });
  }

}
