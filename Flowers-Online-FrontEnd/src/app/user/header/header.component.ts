import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartServiceService } from '../services/cart-service.service';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{


  public totalItem : number = 0;
  loggedIn = false;


  constructor(private router:Router,private http:HttpClient,
    private cartService:CartServiceService,
    private authService: AuthServiceService) {
      
    }

  ngOnInit() {
    this.router.events.subscribe((val:any)=>{
      if( this.authService.getToken()){
        this.cartService.getProductsFromCart().subscribe((res:any) =>{
            this.totalItem = res.length;
        })
        this.loggedIn = true;
      }else{
        this.loggedIn = false;
      }
    })
  }


  

  logOut(){
    this.authService.deleteToken();
    this.router.navigate(['/login']);
  }

}
