import { Component, OnInit, OnDestroy } from '@angular/core';

import { catchError, EMPTY, Observable, Subscription } from 'rxjs';

import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list-alt.component.html'
})
export class ProductListAltComponent /* implements OnInit, OnDestroy */ {
  pageTitle = 'Products';
  errorMessage = '';
  selectedProductId = 0;

  products$: Observable<Product[]> = this.productService.products$
    .pipe(
      catchError( err => {
        this.errorMessage = err;
        // return of([]);
        // or
        return EMPTY;
      })
    );

  products: Product[] = [];
  sub!: Subscription;

  constructor(private productService: ProductService) { }

  /* ngOnInit(): void {
    this.sub = this.productService.getProducts().subscribe({
      next: products => this.products = products,
      error: err => this.errorMessage = err
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  } */

  onSelected(productId: number): void {
    console.log('Not yet implemented');
  }
}
