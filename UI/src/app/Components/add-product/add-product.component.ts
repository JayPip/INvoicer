import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Product } from 'src/app/Models/product.model';
import { ProductsService } from 'src/app/Services/products.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  newProduct: Product = {
    id: 0,
    code: '',
    name: '',
    price: 0,
    taxRate: 0,
    taxAmount: 0,
    priceTax: 0
  }
  /**
   *
   */
  constructor(private productsService: ProductsService, private router: Router,private dialogRef: MatDialogRef<AddProductComponent>){}

  ngOnInit(): void {
      
  }
  
  addProduct(){
    this.productsService.addProduct(this.newProduct).subscribe
    ({
      next: (product) => {
        this.closeModal();
      }
    });
  }

  closeModal(): void {
    this.dialogRef.close({success: true}); // Closes the modal
  }
}
