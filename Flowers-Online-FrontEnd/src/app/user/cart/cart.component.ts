
import { HttpClient } from '@angular/common/http';
import { Component, OnInit ,ChangeDetectorRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router, Routes } from '@angular/router';
import { CartServiceService } from '../services/cart-service.service';
import { ProductServiceService } from '../services/product-service.service';
import { Resolve } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{

  constructor(private http:HttpClient,private cartService: CartServiceService,
    private productService:ProductServiceService,
    private router:Router,
    private toastr: ToastrService,private cdr: ChangeDetectorRef){}

    public products : any = [];

    productList: any[] = [];
    grandTotal : number=0;  
    cart:any







  ngOnInit(): void {
    this.fetchCartItems();
   
  }



  fetchCartItems() {
    this.cartService.getProductsFromCart().subscribe((res: any) => {
      this.cart = res;
      this.populateProductList();
    });
  }


  populateProductList() {
    this.productList = [];
    this.cart.forEach((cartItem: any) => {
      const productId = cartItem.productId;
      const category = cartItem.category;
      this.productService.getProductsByProductIdAndCatogery(category, productId).subscribe((productDetails: any) => {
        productDetails.cartId = cartItem.cartId; // Add cartId to the product details
        productDetails.quantity = cartItem.quantity; // Add quantity to the product details
        this.productList.push(productDetails);
        this.grandTotal=this.grandTotal+(cartItem.quantity*productDetails.price)
      });
    });
  }
  



  delete(productId:number){
    const email: string = localStorage.getItem('email') || '';
    this.cartService.deleteByProductIdAndEmail(productId).subscribe(res =>{
      this.toastr.success("Product removed Sucessfully")
      setTimeout(() => {

        window.location.reload();
      }, 100);
   
    },err =>{
      this.toastr.error("Something went wrong")
      
      
    })
  }



  decreaseQuantity(cartItem: any,price:number) {
    if (cartItem.quantity > 1) {
      cartItem.quantity--;
      this.updateCartProductQuantity(cartItem)
      this.grandTotal -= price;
      this.cdr.detectChanges();
    }
  }

  increaseQuantity(cartItem: any,price:number) {
    cartItem.quantity++;
    this.updateCartProductQuantity(cartItem)
    this.grandTotal += price;
    this.cdr.detectChanges();
  }


 
  

  updateCartProductQuantity(cartItem:any){
    this.http.put("http://localhost:8083/api/v1/cart/updateCart",cartItem).subscribe(res =>{
      console.log(res)
    })
  }

}
