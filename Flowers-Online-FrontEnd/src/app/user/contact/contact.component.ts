import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';




export class Contact{
  constructor(public name:string,public email:string,public message:string ){}
}


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {


  myForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,private http:HttpClient,private toastr: ToastrService){
    this.myForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });
  }
  

  contact!:Contact


  submited:boolean=false

  ContactFormsubmit(){
    this.contact=new Contact(this.myForm.get('name')?.value,this.myForm.get('email')?.value,this.myForm.get('message')?.value)
    this.http.post("http://localhost:8087/api/v1/contact/saveContact",this.contact).subscribe(res =>{
      this.submited=true

      setTimeout(() => {
        this.submited=false
        this.toastr.success("Message sent Sucessfully")
        this.myForm.reset();
      }, 3000);
    })
    
    
  }

}
