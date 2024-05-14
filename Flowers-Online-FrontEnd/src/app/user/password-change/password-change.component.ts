import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { flush } from '@angular/core/testing';
@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.css']
})
export class PasswordChangeComponent implements OnInit{
  constructor(private http:HttpClient,private formBuilder: FormBuilder){}

  changePasswordForm!: FormGroup;
  showCurrentPassword: boolean = false; // For toggling current password visibility
  showNewPassword: boolean = false;     // For toggling new password visibility

  User={
    email:'',
    password:''
  }

  newPassword:string=''

  msg:any

  success : boolean=false
  failed:boolean=false



  ngOnInit() {
    this.changePasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,Validators.minLength(5)]],
      newPassword: ['', [Validators.required,Validators.minLength(5)]]
    });
  }

  updatePassword(){
    this.User.email=this.changePasswordForm.get('email')!.value;
    this.User.password=this.changePasswordForm.get('password')!.value;
    this.http.post("http://localhost:8081/api/v1/userservice/loginForUpdate",this.User).subscribe(res =>{
      this.User.password=this.changePasswordForm.get('newPassword')!.value;
      this.http.put("http://localhost:8081/api/v1/userservice/updatePassword",this.User).subscribe(r =>{
        console.log(r)
        this.msg="Password Updated Sucessfully"

        this.success=true
        this.failed=false
        this.changePasswordForm.reset();
      },err =>{
        this.success=false
        this.failed=true
        this.msg="Something Went Wrong"
      })
    },err =>{
      this.success=false
        this.failed=true
        this.msg="Please enter valid email or password"


        setTimeout(() => {
          this.success = false;
          this.failed = false;
        }, 3000);
    })


  }


  

}
