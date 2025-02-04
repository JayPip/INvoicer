import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/Models/product.model';
import { ProductsService } from 'src/app/Services/products.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  @Input() data: any;

  productDetails: Product= {
    id: 0,
    code: '',
    name: '',
    price: 0,
    taxRate:0,
    taxAmount: 0,
    priceTax:0
  }
  constructor(private route: ActivatedRoute, private productsService: ProductsService,private router: Router,private dialogRef: MatDialogRef<EditProductComponent>){}
  ngOnInit(): void {
      this.route.paramMap.subscribe({
        next: () =>{
          const id = this.data?.productId;
          if (id){
            this.productsService.getProduct(id).subscribe(
              {
                next:(response)=> {
                    this.productDetails = response;
                },
              }
            )
          }
        }
      })
  }
  
  updateProduct(){
    this.productsService.updateProduct(this.productDetails.id, this.productDetails).subscribe(
      {
        next: (response) => {
          this.closeModal();
        }
      }
    );
  }

  closeModal(): void {
    this.dialogRef.close({success: true}); // Closes the modal
  }
}
