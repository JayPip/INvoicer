import { Component, Input, OnInit } from '@angular/core';
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
    price: 0
  }
  constructor(private route: ActivatedRoute, private productsService: ProductsService,private router: Router){

  }
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
          //return to products list after adding
          this.router.navigate(['products']);
        }
      }
    );
  }
}
