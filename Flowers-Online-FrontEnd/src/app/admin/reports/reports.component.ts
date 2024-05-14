import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart, registerables } from 'chart.js';
import { adminProductService } from '../adminService/adminProduct-service';
Chart.register(...registerables);



@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})


export class ReportsComponent  implements OnInit{

  @ViewChild('myChart') myChart!: ElementRef;

  constructor(private adminproductService:adminProductService,private http:HttpClient){}


  orderData :any

  inventory:boolean=false
  salesGraph:boolean=false

  ngOnInit() {
    
  }


  products:any

  inventoryDeatils(){
    this.inventory=true
    this.salesGraph=false
    this.adminproductService.getProducts().subscribe((res:any) =>{
      console.log(res)
      this.products = res;
    })

  }




  graphForSales(){
    this.inventory=false
    this.salesGraph=true
    this.http.get("http://localhost:8088/api/v1/admin/order/getAllUsersOrders").subscribe(res =>{
      this.orderData=res
      const orderDates = this.orderData.map((order:any) => new Date(order.orderDate));


      const dates = Array.from(new Set(orderDates.map((date:any) => date.toDateString())));


      const data = dates.map(date => {
        const ordersOnDate = orderDates.filter((d:any) => d.toDateString() === date);
        return ordersOnDate.length;
      });
      
  
      const sumOfOrders = data.reduce((total, count) => total + count, 0);



      var myChart = new Chart("myChart", {
        type: 'bar',
        data: {
          labels: dates,
          datasets: [{
            label: sumOfOrders+' of Orders',
            data: data,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
      
    })

  }






  
}
