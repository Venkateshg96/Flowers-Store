import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CartServiceService } from '../services/cart-service.service';
import { ProductServiceService } from '../services/product-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit{

  constructor(private http:HttpClient){}


    productList: any[] = [];


    

    ngOnInit() {
      this.http.get("http://localhost:8084/api/v1/order/getProducts").subscribe((res:any) =>{
        this.productList.push(res.sort((a: { orderDate: string; }, b: { orderDate: any; }) => {
          return  b.orderDate.localeCompare(a.orderDate);
        }))

  

     
        console.log(this.productList)
      
      })
    }



  

}
