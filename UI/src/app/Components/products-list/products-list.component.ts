import { Component, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import {Product} from 'src/app/Models/product.model'
import { ProductsService } from 'src/app/Services/products.service';
import { AddProductComponent } from '../add-product/add-product.component';
import { ModalComponent } from '../modal/modal.component';
import { MatDialog } from '@angular/material/dialog';

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
  constructor(private productsService: ProductsService,private router: Router, private dialog: MatDialog) {  }
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

  openModal( name: string, productId?: number ): void {
    this.dialog.open(ModalComponent, {
      width:'50%',
      data: {name: name, productId: productId}
    });
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
}
