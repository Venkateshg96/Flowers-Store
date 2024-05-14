import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductlistComponent } from '../../productlist/productlist.component';
import { ProductDetailsComponent } from '../../product-details/product-details.component';
import { AuthGuard } from '../../authGuard/services/auth.guard';
import { OrdersucessComponent } from '../../ordersucess/ordersucess.component';
import { ShopComponent } from '../../shop/shop.component';
import { CartComponent } from '../../cart/cart.component';
import { CheckoutComponent } from '../../checkout/checkout.component';
import { OrderDetailsComponent } from '../../order-details/order-details.component';
import { OrderComponent } from '../../order/order.component';
import { ContactComponent } from '../../contact/contact.component';
import { PagenotfoundComponent } from '../../pagenotfound/pagenotfound.component';
import { RatingComponent } from '../../rating/rating.component';

const routes: Routes = [

  {path:'dashboard', component:ShopComponent,canActivate : [AuthGuard]},
  {path:'products/:categoryId', component:ProductlistComponent,canActivate : [AuthGuard]},
  {path:'all/:categoryId', component:ProductlistComponent,canActivate : [AuthGuard]},
  { path: 'product/:categoryId/:productId', component: ProductDetailsComponent,canActivate : [AuthGuard] },
  { path: 'cart', component: CartComponent ,canActivate : [AuthGuard]},
  { path: 'contact', component: ContactComponent,canActivate : [AuthGuard]},
  { path: 'checkOut', component: CheckoutComponent,canActivate : [AuthGuard]},
  { path: 'ordersucess', component: OrdersucessComponent,canActivate : [AuthGuard]},
  { path: 'order', component: OrderComponent,canActivate : [AuthGuard]},
  { path: 'orderDetails/:orderId', component: OrderDetailsComponent,canActivate : [AuthGuard]},
  { path: 'pageNotFound', component: PagenotfoundComponent},
  { path: 'rating', component: RatingComponent,canActivate : [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
