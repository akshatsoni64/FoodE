import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    private service: AppService
  ) { }

  ngOnInit(): void {
    if(!("user" in sessionStorage)){
      // alert("Unauthenticated")
      this.router.navigate(['login'])
    }
    else{
      if(this.service.getCurrentUser()['type'] == "admin"){
        this.router.navigate(['admin', 'menu'])
      }
    }
  }

}
