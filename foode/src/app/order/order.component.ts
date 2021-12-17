import { Component, OnInit } from '@angular/core';
import { faShoppingBasket } from '@fortawesome/free-solid-svg-icons';
import { AppService } from '../app.service';
import { Order } from '../Models/Order';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orders!: Order[];
  orderCount!: number;
  fashop = faShoppingBasket;

  constructor(private service: AppService) { }

  ngOnInit(): void {
    this.service.getOrders().subscribe((data)=>{
      this.orders = data
      this.orderCount = data.length
    })
  }

}
