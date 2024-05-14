import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';

import { PagenotfoundComponent } from './user/pagenotfound/pagenotfound.component';
import { PasswordChangeComponent } from './user/password-change/password-change.component';
import { LoginGuard } from './user/authGuard/services/auth.guard';


const routes: Routes = [
  {path:'', redirectTo:'/login',pathMatch:'full'},
  {path:'passwordChange', component:PasswordChangeComponent},
  {path:'register', component:RegisterComponent,canActivate : [LoginGuard]},
  {path:'login', component:LoginComponent,canActivate : [LoginGuard]},
  {path:'shop',loadChildren: () => import('./user/modules/shop/shop-routing.module').then(m => m.ShopRoutingModule)},
  { path: 'admin',loadChildren: () => import('./admin/module/admin/admin.module').then(m => m.AdminModule)},
  { path: '**', pathMatch: 'full', component: PagenotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
