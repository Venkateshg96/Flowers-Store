import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {
  constructor(private router:Router){}

  loggedIn = false;

  ngOnInit(){
    this.router.events.subscribe((val:any)=>{
      if(localStorage.getItem("userName")=="admin"){
        this.loggedIn = true;
      }else{
        this.loggedIn = false;
      }
    })


    
    
  }

  logOut(){
    localStorage.clear()
    this.router.navigate(['/admin/login'])
  }
}
