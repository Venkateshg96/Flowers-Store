import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class adminProductService {

  constructor(private http:HttpClient,
    private router:Router) { }


    getProducts(){
        return this.http.get("http://localhost:8088/api/v1/admin/product/getAllProducts/all")
    }

    saveProduct(product:any){
      return this.http.post("http://localhost:8088/api/v1/admin/product/addProduct",product)
    }

    deleteProductById(productId:number){
      return this.http.delete("http://localhost:8088/api/v1/admin/product/delete/"+productId)

    }

    editProduct(editedProduct:any){
      return this.http.put("http://localhost:8088/api/v1/admin/product/update",editedProduct)
    }

}


