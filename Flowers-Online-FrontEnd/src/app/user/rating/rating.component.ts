import { Component } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms'; // Import FormsModule
import { HttpClient } from '@angular/common/http';





export class EmailDetails {
  constructor(public msgBody: string,public recipient:string) {}
}

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent {


  constructor(private http:HttpClient,private fb: FormBuilder){}


  ratingOptions = ['Very good', 'Good', 'Average', 'Bad', 'Very bad'];


  feedbackForm!: FormGroup;
  decodedToken:any

  userEmail=''
  email!: EmailDetails;
  submited: boolean = false;


  showModal = false;

  ngOnInit(){
    const jwtToken = localStorage.getItem("jwt_token")||''
    this.decodedToken = jwtDecode(jwtToken);
    this.userEmail = this.decodedToken.sub;
  


    this.feedbackForm = this.fb.group({
     
      message: ['', Validators.required],
      rating: ['', Validators.required],

    });
  }



  submit(){
    const mesagebody=`
    Hi Admin,

    Email: ${this.userEmail}
    Rating: ${this.feedbackForm.get('rating')!.value}
    Response: ${this.feedbackForm.get('message')!.value}

    Thanks Regards,
    Team
  `;
  
  this.submited = true;
  this.email = new EmailDetails(mesagebody,this.userEmail);

  console.log()

  
  this.http.post("http://localhost:8086/api/v1/rating/sendMail",this.email).subscribe(res =>{
      console.log(res)
    })
  }
  


    close(){
    window.location.reload();
  }
  
}
