import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { catchError, combineLatest, EMPTY, filter, map, Observable, of, startWith, Subject } from 'rxjs';

// import { Subscription } from 'rxjs';
import { ProductCategory } from '../product-categories/product-category';
import { ProductCategoryService } from '../product-categories/product-category.service';

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
  // selectedCategoryId = 1;

  // products: Product[] = [];
  // sub!: Subscription;

  private categorySelectedSubject = new Subject<number>();
  categorySelectedAction$ = this.categorySelectedSubject.asObservable();

  products$ = combineLatest([
    this.productService.productsWithAdd$,
    this.categorySelectedAction$
    .pipe(
      startWith(0)
    )
  ])
    .pipe(
      map(([products, selectedCategoryId]) => products.filter(
        product => selectedCategoryId ? product.categoryId === selectedCategoryId : true
      )),
      catchError(err => {
        this.errorMessage = err;
        return EMPTY
      })
    );


  // products$: Observable<Product[]> = this.productService.productsWithCategory$
  //   .pipe(
  //     catchError( err => {
  //       this.errorMessage = err;
  //       // return of([]);
  //       // or
  //       return EMPTY;
  //     })
  //   );

  categories$ = this.productCategoryService.productCategories$
    .pipe(
      catchError(err => {
        this.errorMessage = err;
        return EMPTY
      })
    )


  // productsSimpleFilter$ = this.productService.productsWithCategory$
  // .pipe(
  //   map(products =>
  //     products.filter(product =>
  //       this.selectedCategoryId ? product.categoryId === this.selectedCategoryId : true))
  // );

  constructor(
    private productService: ProductService,
    private productCategoryService: ProductCategoryService
  ) { }

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
    this.productService.addProduct();
  }

  onSelected(categoryId: string): void {
    // this.selectedCategoryId = +categoryId;
    this.categorySelectedSubject.next(+categoryId)
  }
}
