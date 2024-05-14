import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../class/user';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from '../services/auth-service.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {


  registerForm!: FormGroup;
  u!:User
  message=""



  constructor(private http: HttpClient, private router: Router,private formBuilder: FormBuilder,
    private toastr: ToastrService,private authService: AuthServiceService) { }



  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      "firstname":new FormControl('',[ Validators.required]),
     "lastname":new FormControl('',[ Validators.required]),
      "email":new FormControl('',[ Validators.required,Validators.email]),
      "password":new FormControl('',[ Validators.required]),
      "title":new FormControl('',[ Validators.required]),
      "city":new FormControl('',[ Validators.required]),
      "country":new FormControl('',[ Validators.required]),
      "mobilenumber":new FormControl('',[ Validators.required]),
    
      })
  }

  registerUser(){
    if (this.registerForm.invalid) {
      return;
    };
    this.u = new User(this.registerForm.get('title')!.value,this.registerForm.get('lastname')!.value,
    this.registerForm.get('firstname')!.value,
    this.registerForm.get('email')!.value,
    this.registerForm.get('password')!.value
    ,this.registerForm.get('mobilenumber')!.value,
    this.registerForm.get('country')!.value,
    this.registerForm.get('city')!.value)

    this.authService.registerUser(this.u).subscribe((data:any) =>{
      console.log(data)
      this.toastr.success("Registration Sucessfull")
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2000);
      

    },err =>{
      console.log(err['error']['message'])
      this.message=err['error']['message']
    })
  
    
  }





}
