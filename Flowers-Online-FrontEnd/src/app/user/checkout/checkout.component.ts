
import { Component, OnInit ,ChangeDetectorRef} from '@angular/core';

import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Order } from '../class/order';
import { ProductServiceService } from '../services/product-service.service';
import { CartServiceService } from '../services/cart-service.service';
import { billingAddress } from '../class/billing-address';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit{




  constructor(private http:HttpClient,private cartService: CartServiceService,
    private productService:ProductServiceService,
    private router:Router,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,private cdr: ChangeDetectorRef){}



  public products : any = [];

    productList: any[] = [];
    grandTotal : number=0;  

    addressForm!: FormGroup;

    address!:billingAddress

    order!:Order

    public totalItem : number = 0;
    placingOrder: boolean = false;

    cart:any





    ngOnInit() {
      this.cartService.getProductsFromCart().subscribe((res:any) =>{
          if(res.length==0){
            this.router.navigate(['/shop'])

          }
      })
      

      this.cartService.getProductsFromCart().subscribe((res:any) =>{
        this.cart=res
        res.forEach((product: any) => {
          const productId = product.productId;
          const category = product.category;
          this.productService.getProductsByProductIdAndCatogery(category,productId).subscribe((productDetails: any) => {
            productDetails.quantity = product.quantity;
            this.grandTotal=(productDetails.price*product.quantity)+(this.grandTotal)
            this.productList.push(productDetails);
          });
        });
        
  })

  this.addressForm = this.formBuilder.group({
    "firstName":new FormControl('',[ Validators.required]),
   "lastName":new FormControl('',[ Validators.required]),
   
   "addressLine1":new FormControl('',[ Validators.required]),
   "addressLine2":new FormControl('',[ Validators.required]),
   "mobileNumber":new FormControl('',[ Validators.required]),
   "landmark":new FormControl('',[ Validators.required]),
   "state":new FormControl('',[ Validators.required]),
   "country":new FormControl('',[ Validators.required]),
   "pincode":new FormControl('',[ Validators.required]),
    })

}



    checkOut(){
       this.address = new billingAddress(this.addressForm.get('firstName')!.value,this.addressForm.get('lastName')!.value,
       this.addressForm.get('addressLine1')!.value,
       this.addressForm.get('addressLine2')!.value,
       this.addressForm.get('mobileNumber')!.value,
       this.addressForm.get('landmark')!.value,
       this.addressForm.get('country')!.value,
       this.addressForm.get('state')!.value,
       this.addressForm.get('pincode')!.value)
       
       this.order=new Order(null!,this.grandTotal,this.productList,this.address)
       console.log(this.order)
       

       this.http.post("http://localhost:8084/api/v1/order/placeOrder",this.order).subscribe(res =>{
        this.placingOrder = true;

       setTimeout(() => {
        this.placingOrder = false;
        this.router.navigate(['/shop/ordersucess'])
      }, 4000);
        
        this.http.delete("http://localhost:8083/api/v1/cart/deleteAll").subscribe(res =>{
        },err =>{
          this.toastr.error("Something went wrong")
        })
       },err =>{
        this.toastr.error("Something went wrong")
       })
    }

}
