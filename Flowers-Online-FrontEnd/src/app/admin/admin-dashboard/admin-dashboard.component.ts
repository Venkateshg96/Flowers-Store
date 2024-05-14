import { Component, OnInit } from '@angular/core';
import { adminProductService } from '../adminService/adminProduct-service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit{


  products: any

  allProducts: number = 0;
  pagination: number = 1;


 
  editProductObject={
    id:"",
    quantity:"",
    category:"",
    date:"",
    description:"",
    imageUrl:"",
    price:"",
    productName:"",
    size:""
    
  }





 
  

  constructor(private adminproductService:adminProductService,private toastr: ToastrService,
    private formBuilder: FormBuilder,private http:HttpClient
    ){}

  ngOnInit(){
    this.fetchProducts()
  }


  fetchProducts(){
    this.adminproductService.getProducts().subscribe((res:any) =>{
      console.log(res)
      this.products = res;
      this.allProducts=res.length
    })
  }


  renderPage(event: number) {
    this.pagination = event;
    this.fetchProducts();
  }

  




  deleteById(productId:number){
    const isConfirmed = window.confirm("Are you sure you want to delete?");
    if (isConfirmed) {
    this.adminproductService.deleteProductById(productId).subscribe(res =>{
      this.http.delete("http://localhost:8083/cart/deleteAllByProductId/"+productId)
      this.toastr.success("Product Deleted Sucessfully")
      this.ngOnInit()
    },err =>{
      this.toastr.error("Something went wrong")
    })
    } else {
      console.log("Delete action canceled.");
    }
  }



  addProductToObject(editProdcutFromAdmin:any){
    this.ngOnInit()
    this.editProductObject=editProdcutFromAdmin
  }

  saveEditedProduct(){
    this.adminproductService.editProduct(this.editProductObject).subscribe( res =>{
      this.toastr.success("Product Updated Sucessfully")
      this.ngOnInit()
    },err =>{
      this.toastr.error("Something went wrong")
    })

  }

}
