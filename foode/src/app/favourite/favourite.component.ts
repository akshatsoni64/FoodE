import { Component, OnInit } from '@angular/core';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { AppService } from '../app.service';
import { Favourites } from '../Models/Favourites';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.css']
})
export class FavouriteComponent implements OnInit {
  favs!: Favourites[];
  favCount!: number;
  faheart = faHeart;

  constructor(private service: AppService) { }

  ngOnInit(): void {
    this.service.getFavourite().subscribe((data)=>{
      this.favs = data
      this.favCount = data.length
    })
  }

  delFav(id: number){
    this.service.delFavourite(id).subscribe((data)=>{
      this.favs = this.favs.filter((item)=>item.id!=id)
    })
  }

}
