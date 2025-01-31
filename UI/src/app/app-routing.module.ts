import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EMPTY } from 'rxjs';
import { AddProductComponent } from './Components/add-product/add-product.component';
import { EditProductComponent } from './Components/edit-product/edit-product.component';
import { LoginCardComponent } from './Components/login-card/login-card.component';
import { ProductsListComponent } from './Components/products-list/products-list.component';
import { RegisterCardComponent } from './Components/register-card/register-card.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { UploadInvoiceComponent } from './Components/upload-invoice/upload-invoice.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'products',
    component:ProductsListComponent
  },
  {
    path: 'dashboard',
    component:DashboardComponent
  },
  {
    path: 'upload',
    component:UploadInvoiceComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
