import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { ShopComponent } from './user/shop/shop.component';
import { RatingComponent } from './user/rating/rating.component';
import { ProductlistComponent } from './user/productlist/productlist.component';
import { ProductDetailsComponent } from './user/product-details/product-details.component';
import { PagenotfoundComponent } from './user/pagenotfound/pagenotfound.component';
import { OrdersucessComponent } from './user/ordersucess/ordersucess.component';
import { OrderDetailsComponent } from './user/order-details/order-details.component';
import { OrderComponent } from './user/order/order.component';
import { HeaderComponent } from './user/header/header.component';
import { ContactComponent } from './user/contact/contact.component';
import { CheckoutComponent } from './user/checkout/checkout.component';
import { CartComponent } from './user/cart/cart.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InterceptorInterceptor } from './user/services/interceptor/interceptor.interceptor';
import { AdminAddProductsComponent } from './admin/admin-add-products/admin-add-products.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminHeaderComponent } from './admin/admin-header/admin-header.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';


import { NgxPaginationModule } from 'ngx-pagination';
import { ReportsComponent } from './admin/reports/reports.component';
import { CustomerreportsComponent } from './admin/customerreports/customerreports.component';
import { PasswordChangeComponent } from './user/password-change/password-change.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ShopComponent,
    RatingComponent,
    ProductlistComponent,
    ProductDetailsComponent,
    PagenotfoundComponent,
    OrdersucessComponent,
    OrderDetailsComponent,
    OrderComponent,
    HeaderComponent,
    ContactComponent,
    CheckoutComponent,
    CartComponent,
    AdminAddProductsComponent,
    AdminDashboardComponent,
    AdminHeaderComponent,
    AdminLoginComponent,
    ReportsComponent,
    CustomerreportsComponent,
    PasswordChangeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
	ToastrModule.forRoot(),
  NgxPaginationModule,


  ],
  providers: [
    {provide : HTTP_INTERCEPTORS,useClass :  InterceptorInterceptor,multi:true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
