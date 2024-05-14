import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {

  constructor(private http:HttpClient,
    private router:Router) { }


    

  

    getProductsFromCart(){
       return this.http.get("http://localhost:8083/api/v1/cart/getProducts")
    }


    addToCart(cart:any){
      return this.http.post("http://localhost:8083/api/v1/cart/addToCart",cart)
      
    }
    deleteByProductIdAndEmail(productId:number){
      return this.http.delete("http://localhost:8083/api/v1/cart/delete/"+productId)
    }
}
