import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EMPTY } from 'rxjs';
import { AddProductComponent } from './Components/add-product/add-product.component';
import { EditProductComponent } from './Components/edit-product/edit-product.component';
import { LoginCardComponent } from './Components/login-card/login-card.component';
import { ProductsListComponent } from './Components/products-list/products-list.component';
import { RegisterCardComponent } from './Components/register-card/register-card.component';

const routes: Routes = [
  {
    path: '',
    component: LoginCardComponent
  },
  {
    path: 'register',
    component: RegisterCardComponent
  },
  {
    path: 'products',
    component:ProductsListComponent
  },
  {
    path: 'products/add',
    component:AddProductComponent
  }
  ,
  {
    path: 'products/edit/:id',
    component:EditProductComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
