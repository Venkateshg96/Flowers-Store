import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductServiceService } from '../services/product-service.service';
import { CartServiceService } from '../services/cart-service.service';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from '../services/auth-service.service';



class Cart {
  constructor(public productId: number, public category: string,
    ) {}
}



@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductlistComponent implements OnInit{


  constructor(private route: ActivatedRoute,private http:HttpClient,
    private router:Router,
    private productService:ProductServiceService,private cartService:CartServiceService,
    private authService: AuthServiceService,
    private toastr: ToastrService){}


  
  categoryName!:string
  cart!:Cart

  productList: any[] = [];
  allProductList: number = 0;
  pagination: number = 1;


  ngOnInit(){
    this.route.paramMap.subscribe(params => {
      this.categoryName=params.get('categoryId')||''
      const categoryId = params.get('categoryId')||''
      console.log(categoryId)
      this.http.get("http://localhost:8080/api/v1/product/getProducts/"+categoryId).subscribe((data:any) =>{
      this.productList=data
      this.allProductList=data.length
      })
    });
    
  }




  addToCart(productId:number,pdouctCatogory:string){
    this.cart= new Cart(productId,pdouctCatogory);
    this.http.post("http://localhost:8083/api/v1/cart/addToCart",this.cart).subscribe(res =>{
      this.toastr.success("Product Added to Cart")
      setTimeout(() => {
        window.location.reload();
      }, 100);
      
    },err=>{
      this.toastr.error("Product Already Exits in the Cart")

    })
    
  }


  sort(event:any){
    console.log(event.target.value)
    switch (event.target.value){
      case "Low":
        {
          this.productList = this.productList.sort((low, high) => low.price - high.price);
          break;
        }
        case "High":
        {
          this.productList = this.productList.sort((low, high) => high.price - low.price);
          
          break;
        }
        case "Name":
        {
          this.productList = this.productList.sort(function (low, high) {
            if (low.productName < high.productName) {
              return -1;
            }
            else if (low.productName > high.productName) {
              return 1;
            }
            else {
              return 0;
            }
          })
          break;
        }


        

        case "New":
        {
          this.productList = this.productList.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          console.log(this.productList)
          break;
        }

        case "Old":
        {
          this.productList = this.productList.sort((a, b) => new Date(a.date).getTime() -new Date(b.date).getTime())
          console.log(this.productList)
          break;
        }
        
    }
    return this.productList;
  }


  renderPage(event: number) {
    this.pagination = event;
    this.ngOnInit()
  }

}
