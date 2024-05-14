import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from '../../admin-login/admin-login.component';
import { adminAfterLoginGuard, adminAuthGuardGuard } from '../../guard/admin-auth-guard.guard';
import { AdminDashboardComponent } from '../../admin-dashboard/admin-dashboard.component';
import { AdminAddProductsComponent } from '../../admin-add-products/admin-add-products.component';
import { CustomerreportsComponent } from '../../customerreports/customerreports.component';
import { ReportsComponent } from '../../reports/reports.component';

const routes: Routes = [
  { path: 'login', component: AdminLoginComponent,canActivate:[adminAuthGuardGuard]},
  { path: 'dashboard', component: AdminDashboardComponent,canActivate : [adminAfterLoginGuard]},
  { path: 'dashboard/addProducts', component: AdminAddProductsComponent,canActivate : [adminAfterLoginGuard]},
  { path: 'dashboard/customerReports', component: CustomerreportsComponent,canActivate : [adminAfterLoginGuard]},
  { path: 'dashboard/salesReports', component: ReportsComponent,canActivate : [adminAfterLoginGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
