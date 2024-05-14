import { Component, OnInit } from '@angular/core';
import { User } from '../class/user';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthServiceService } from '../services/auth-service.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{


  loginForm!: FormGroup;
  user!: User;
  msg="";

  showMessage: boolean = true;
  constructor(private router: Router,private formBuilder: FormBuilder,private http:HttpClient,
    private authService: AuthServiceService,
    private toastr: ToastrService) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      "email":new FormControl('',[ Validators.required,Validators.email]),
      "password":new FormControl('',[ Validators.required,Validators.minLength(5)]),
      })
  }

  login(){
    this.user = new User(null!, null!,null!,this.loginForm.get('email')!.value,this.loginForm.get('password')!.value
    ,null!,null!,null!,);
    this.authService.loginUser(this.user).subscribe((data:any)=>{
     
      console.log(data);
      if(data['token']) {
        this.authService.setToken(data['token']);
        this.toastr.success("Logged In sucessfully",'', {
          timeOut: 2000, // Hide after 4 seconds (4000 milliseconds)
          positionClass: 'toast-top-center', // Customize the position
          progressBar: true, // Show a progress bar
          closeButton: true // Show a close button
        });
 
        setTimeout(() => {
          this.router.navigate(['/shop/dashboard']);
        }, 2000);
 
        
      }
    },error =>{
      console.log(error.error)
      this.msg=error.error
    });
  }
}
