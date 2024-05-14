import { Component, ElementRef, ViewChild } from '@angular/core';
import { adminCustomerService } from '../adminService/adminCustomerService';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
@Component({
  selector: 'app-customerreports',
  templateUrl: './customerreports.component.html',
  styleUrls: ['./customerreports.component.css']
})
export class CustomerreportsComponent {

  constructor(private customerService:adminCustomerService){}


  customers:any
  allOrders:any

  customer:boolean=false
  order:boolean=false
  getAllCustomers(){
    this.customerService.getAllCustomers().subscribe(res =>{
      this.customers=res
      this.customer=true
      this.order=false
      console.log(res)
    })
  }
    
  

  exportTable() {
    const doc = new jsPDF();

    if (this.customers) {
      const tableData = [];

      for (const customer of this.customers) {
        tableData.push([
          `${customer.lastName} ${customer.firstName}`,
          customer.email,
          customer.city,
          customer.country,
          customer.mobileNumber
          
        ]);
      }

      // Attach the autoTable method to the jsPDF instance
      (<any>doc).autoTable({
        head: [['Name', 'Email', 'City', 'Country','Mobile']],
        body: tableData,
        startY: 10, // Adjust the starting Y position
        margin: { top: 10 } // Add some margin to the top
      });

      doc.save('customer_data.pdf');
}


  }


  getAllOrdeders(){
    this.customerService.getAllOrders().subscribe(res =>{
      this.customer=false
      this.order=true
      this.allOrders=res
      console.log(res)
    })
  }



  

}
