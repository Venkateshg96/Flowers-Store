import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductServiceService } from '../services/product-service.service';
import { CartServiceService } from '../services/cart-service.service';
import { ToastrService } from 'ngx-toastr';

class Cart {
  constructor(public productId: number, public category: string) {}
}



@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit{


  constructor(private route: ActivatedRoute,private http:HttpClient,
    private productService:ProductServiceService,
    private cartService: CartServiceService,
    private toastr: ToastrService){}



    product: any // Replace with your product object structure

  cart!:Cart

  
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const categoryId = params.get('categoryId')||''
      const productId = params.get('productId')||''
      console.log(productId)
      console.log(categoryId)
      this.productService.getProductsByProductIdAndCatogery(categoryId,productId).subscribe((data:any) =>{
        this.product=data
      })
      
    });
  }


  addToCart(productId:number,pdouctCatogory:string){
    this.cart= new Cart(productId,pdouctCatogory);
    this.cartService.addToCart(this.cart).subscribe(data=>{
      console.log(data)
      this.toastr.success("Product Added to Cart")
      window.location.reload()
    },err =>{
    this.toastr.error("Product Already Exits in the Cart")
    
    })

  }

}
