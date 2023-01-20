import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../Models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<Product[]>{
    return this.http.get<Product[]>("https://localhost:7118/" + "api/Products")
  }
  addProduct(addProductRequest: Product): Observable<Product>{
    addProductRequest.id = 0;
    return this.http.post<Product>("https://localhost:7118/" + "api/Products", addProductRequest)
  }
  getProduct(id: string): Observable<Product>{
    return this.http.get<Product>("https://localhost:7118/" + "api/Products/" + id)
  }
  updateProduct(id: number, updatedProduct: Product): Observable<Product>{
    return this.http.put<Product>("https://localhost:7118/" + "api/Products/" + id, updatedProduct);
  }
  deleteProduct(id: number): Observable<Product>{
    return this.http.delete<Product>("https://localhost:7118/" + "api/Products/" + id);
  }
}
