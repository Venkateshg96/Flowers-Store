import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class adminCustomerService{

    constructor(private http:HttpClient,
        private router:Router) { }

    getAllCustomers(){
        return this.http.get("http://localhost:8088/api/v1/admin/userservice/getAllUsers")
    }


    getAllOrders(){
        return this.http.get("http://localhost:8088/api/v1/admin/order/getAllUsersOrders")
    }
}