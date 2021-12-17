import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login_form = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required)
  })

  constructor(
    private service: AppService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if("user" in sessionStorage){
      this.router.navigate([''])
    }
  }

  login(){
    if(!this.login_form.valid){
      alert("All fields are required!")
    }
    let cred = this.login_form.value
    this.service.getUser(cred['username']).subscribe((data)=>{
      if(data.length > 0 && data[0]['password'] === cred['password']){
        let u = {
          id: data[0].id,
          username: data[0].username,
          type: data[0].type
        }
        sessionStorage.setItem('user', JSON.stringify(u))
        this.service.emitAuthMode(true)
        if(u.type=="admin"){
          this.router.navigate(['admin', 'menu'])
        }
        else{
          this.router.navigate([''])
        }
      }
      else{
        alert("Invalid Credentials")
        this.service.emitAuthMode(false)
      }
    })
  }

}
