import { Component, OnInit } from '@angular/core';
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
    price: 0
  }
  /**
   *
   */
  constructor(private productsService: ProductsService, private router: Router){}

  ngOnInit(): void {
      
  }
  
  addProduct(){
    this.productsService.addProduct(this.newProduct).subscribe
    ({
      next: (product) => {
        //return to products list after adding
      }
    });
  }
}
