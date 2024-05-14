import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit{

  ngOnInit()  {
   
  }


  getByType(type:string){
    console.log(type)
  
   }

}
