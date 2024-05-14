import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  constructor(private http:HttpClient,
    private router:Router) { }


  getProducts(category:string){
    return this.http.get("http://localhost:8080/api/v1/product/getProducts/"+category)
  }


  getProductsByProductIdAndCatogery(category:string,productId:string){
    return this.http.get("http://localhost:8080/api/v1/product/getProduct/" + category+"/"+productId)
  }
}
