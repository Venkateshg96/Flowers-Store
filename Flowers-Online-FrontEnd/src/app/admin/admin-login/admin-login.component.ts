import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  constructor(private router:Router,private toastr: ToastrService){}

  credentials = {
    username: '',
    password: ''
  };

  adminLogin(loginForm: any) {
    if(this.credentials.username=="admin" && this.credentials.password=="admin"){
      console.log('Logged in with:', this.credentials);
      localStorage.setItem("userName",this.credentials.username)
      this.router.navigate(['/admin/dashboard'])
    }else{
      this.toastr.error("please enter valid credentials")
    }
  }

}
