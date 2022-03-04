import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { catchError, EMPTY, filter, map, Observable, of } from 'rxjs';

// import { Subscription } from 'rxjs';
import { ProductCategory } from '../product-categories/product-category';

import { Product } from './product';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent /* implements OnInit,  OnDestroy */ {
  pageTitle = 'Product List';
  errorMessage = '';
  categories: ProductCategory[] = [];
  selectedCategoryId = 1;

  // products: Product[] = [];
  // sub!: Subscription;

  products$: Observable<Product[]> = this.productService.productsWithCategory$
    .pipe(
      catchError( err => {
        this.errorMessage = err;
        // return of([]);
        // or
        return EMPTY;
      })
    );

  productsSimpleFilter$ = this.productService.productsWithCategory$
  .pipe(
    map(products => products.filter(item => item.categoryId === this.selectedCategoryId))
  );

  constructor(private productService: ProductService) { }

  // ngOnInit(): void {
  //   // this.sub = this.productService.getProducts()
  //   //   .subscribe({
  //     //     next: products => this.products = products,
  //     //     error: err => this.errorMessage = err
  //     //   });
  //     this.products$ = this.productService.getProducts()

  // }

  // ngOnDestroy(): void {
  //   this.sub.unsubscribe();
  // }

  onAdd(): void {
    console.log('Not yet implemented');
  }

  onSelected(categoryId: string): void {
    console.log('Not yet implemented');
  }
}
