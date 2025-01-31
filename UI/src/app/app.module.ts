import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsListComponent } from './Components/products-list/products-list.component';
import { AddProductComponent } from './Components/add-product/add-product.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EditProductComponent } from './Components/edit-product/edit-product.component';
import { RegisterCardComponent } from './Components/register-card/register-card.component';
import { LoginCardComponent } from './Components/login-card/login-card.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidenavComponent } from './Components/sidenav/sidenav.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MainComponent } from './Components/main/main.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import {MatListModule} from '@angular/material/list';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { UploadInvoiceComponent } from './Components/upload-invoice/upload-invoice.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalComponent } from './Components/modal/modal.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductsListComponent,
    AddProductComponent,
    EditProductComponent,
    RegisterCardComponent,
    LoginCardComponent,
    SidenavComponent,
    MainComponent,
    NavbarComponent,
    DashboardComponent,
    UploadInvoiceComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatListModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
