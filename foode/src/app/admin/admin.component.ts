import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { faEye, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faPenAlt } from '@fortawesome/free-solid-svg-icons';
import { subscribeOn } from 'rxjs';
import { AppService } from '../app.service';
import { Food } from '../Models/Food';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private service: AppService, private route: ActivatedRoute, private router: Router) { }

  food_form: FormGroup = new FormGroup({
    name: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required),
    price: new FormControl(null, Validators.min(1))
  });
  food!: Food[];
  fadel = faTrashAlt;
  faupdt = faPenAlt;
  faview = faEye;
  updateMode = false;
  updateId!: number;

  ngOnInit(): void {
    this.service.getFood().subscribe(data => {
      this.food = data;
      let foodId = null;
      
      this.route.params.subscribe((params: Params)=>{
        foodId = params['id']
        
        if(foodId != undefined){
          this.updateId = foodId
          this.updateMode = true;
          let food_ob = this.food.filter((item) => item.id==<number>this.route.snapshot.params['id'])[0]
          
          this.food_form.setValue({
            name: food_ob.name,
            description: food_ob.description,
            price: food_ob.price
          })
        }
      })
    })
  }

  addFoodItem(){
    if(this.food_form.valid){
      this.service.addFood(this.food_form.value).subscribe(
        (data) => this.food.push(<Food>data)
      )
      this.food_form.reset()
    }
    else{
      alert("Invalid Values")
    }
  }

  delFoodItem(id: number){
    this.service.delFood(id)
    this.food = this.food.filter(data=>data.id!=id)
  }

  updtFoodItem(id:number){
    this.router.navigate(['admin', 'menu', id])
  }

  updateFoodItem(){
    if(this.food_form.valid){
      this.service.updateFood(this.food_form.value, this.updateId).subscribe(data=>{
        this.service.getFood().subscribe((data)=>this.food=data)
        alert("Updated Successfully")
        this.router.navigate(["admin", "menu"])
      })
    }
    else{
      alert("Invalid Values")
    }
  }
}
