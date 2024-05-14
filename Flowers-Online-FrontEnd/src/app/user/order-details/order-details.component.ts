import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent {

  constructor(private http:HttpClient,private route: ActivatedRoute){}
  productList: any[] = [];

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      const orderId = params.get('orderId')||''
      console.log(orderId)
      this.http.get("http://localhost:8084/api/v1/order/getProduct/"+orderId).subscribe((res:any) =>{
      this.productList.push( res)
    console.log(this.productList)
    })
      
    });

    
  }

}
