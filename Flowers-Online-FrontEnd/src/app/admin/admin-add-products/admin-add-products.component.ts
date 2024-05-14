import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { adminProductService } from '../adminService/adminProduct-service';
import { ToastrService } from 'ngx-toastr';

export class Product{
  constructor(public productName:string,
    public size:string,public category:string,
    public description:string,
    public price:number,
    public imageUrl:string ,
    public quantity:number){}
    

}

@Component({
  selector: 'app-admin-add-products',
  templateUrl: './admin-add-products.component.html',
  styleUrls: ['./admin-add-products.component.css']
})
export class AdminAddProductsComponent implements OnInit{







  constructor(private http: HttpClient, private router: Router,private formBuilder: FormBuilder,
    private adminproductService:adminProductService,
    private toastr: ToastrService,) { }

  productAddingForm!: FormGroup;


  ngOnInit() {
    this.productAddingForm = this.formBuilder.group({
      "productName":new FormControl('',[ Validators.required,Validators.minLength(5)]),
     "size":new FormControl('',[ Validators.required,Validators.minLength(4)] ),
      "category":new FormControl('',[ Validators.required]),
      "description":new FormControl('',[ Validators.required,Validators.minLength(10)]),
      "price":new FormControl('',[ Validators.required,Validators.minLength(1)]),
      "imageUrl":new FormControl('',[ Validators.required,Validators.minLength(10)]),
      "quantity":new FormControl('',[ Validators.required,Validators.minLength(1)]),

    
      })
  }

  product!:Product


  addProduct(){
    this.product=new Product(this.productAddingForm.get('productName')!.value,
    this.productAddingForm.get('size')!.value,
    this.productAddingForm.get('category')!.value,
    this.productAddingForm.get('description')!.value,
    this.productAddingForm.get('price')!.value,
    this.productAddingForm.get('imageUrl')!.value,
    this.productAddingForm.get('quantity')!.value,
    
    )
    console.log(this.product)

    this.adminproductService.saveProduct(this.product).subscribe(res =>{
      this.productAddingForm.reset();
     
      this.toastr.success("Product Added Sucessfully")

    },err =>{
      
      this.toastr.error("Something went wrong")
    })
  }

}
