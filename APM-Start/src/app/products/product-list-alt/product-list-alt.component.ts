import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';

import { catchError, EMPTY, Observable, Subject, Subscription } from 'rxjs';

import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list-alt.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListAltComponent /* implements OnInit, OnDestroy */ {
  pageTitle = 'Products';
  private errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();

  products$: Observable<Product[]> = this.productService.productsWithCategory$
    .pipe(
      catchError( err => {
        this.errorMessageSubject.next(err);
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

  selectedProduct$ =this.productService.selectedProduct$;

  onSelected(productId: number): void {
    this.productService.selectedProductChanged(productId);
  }
}
