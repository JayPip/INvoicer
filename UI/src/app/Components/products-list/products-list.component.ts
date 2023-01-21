import { Component, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import {Product} from 'src/app/Models/product.model'
import { ProductsService } from 'src/app/Services/products.service';
import {  MatDialog } from '@angular/material/dialog';
import { AddProductComponent } from '../add-product/add-product.component';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit 
{
  products: Product[] = [];
  filteredProducts: Product[] = [];
  /**
   *
   */
  constructor(private productsService: ProductsService, private matDialog: MatDialog,private router: Router) {  }
  ngOnInit(): void {
    this.productsService.getAllProducts().subscribe(
      {
        next: (products)=>{
          this.products = products;
          this.filteredProducts = products;
        },
        //error handling
        error: (response) => {console.log(response)}
      }
    )
  }
  deleteProduct(id: number){
    this.productsService.deleteProduct(id).subscribe({
      next: (product)=>{
        //component refresh
        this.router.navigateByUrl('', { skipLocationChange: true }).then(() => {
          this.router.navigate(['products']);
      }); 
      }
    })
  }
  
  applyFilter(event: any){
    const inputValue = event.target.value;
    var newArray = this.products.filter(function (el)
    {
      return el.price.toString().includes(inputValue)  ||
            el.name.includes(inputValue) ||
            el.code.includes(inputValue) ;
    }
    );
    console.log(newArray);
    this.filteredProducts = newArray;
  }
  openAddProductModal(){
    this.matDialog.open(AddProductComponent)
  }
}
