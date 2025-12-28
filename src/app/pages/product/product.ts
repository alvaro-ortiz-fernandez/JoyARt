import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Breadcrumb } from '../../components/breadcrumb/breadcrumb';
import { Path } from '../../model/path';
import { Product } from '../../model/product';
import { RelatedProduct } from './related-product/related-product';
import { Spinner, SpinnerSize } from '../../components/spinner/spinner';
import { FirebaseService } from '../../services/firebase';
import { finalize, map, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ErrorAlert } from '../../components/error-alert/error-alert';
import { ActivatedRoute } from '@angular/router';
import { ModelViewer } from '../../components/model-viewer/model-viewer';

@Component({
  selector: 'app-product',
  imports: [ Breadcrumb, RelatedProduct, AsyncPipe, ErrorAlert, Spinner, ModelViewer ],
  templateUrl: './product.html',
  styleUrl: './product.scss',
})
export class AppProduct {

  SpinnerSize = SpinnerSize; // Exponer el enum al template

  breadcrumb: Path[] = [
    {
      text: 'Inicio',
      link: '/'
    },
    {
      text: 'Catálogo',
      link: '/catalog'
    },
    {
      text: 'Producto'
    }
  ];

  private cdr = inject(ChangeDetectorRef);
  private firebaseService: FirebaseService = inject(FirebaseService);

  product!: Observable<Product>;
  loadError: any;

  relatedProducts!: Observable<Product[]>;
  loadRelatedProductsError: any;

  constructor(private route: ActivatedRoute) {
    this.route.paramMap.subscribe({
      next: (params) => this.loadProduct(params.get('id')!)
    });
  }

  private loadProduct(productId: string) {
    this.product = this.firebaseService.getProduct(productId);
    this.loadError = null;

    this.product
      .pipe(finalize(() => this.cdr.detectChanges()))
      .subscribe({
        next: (prod) => this.loadRelated(prod),
        error: (err) => this.loadError = err
      });
  }

  private loadRelated(currentProduct: Product) {
    this.relatedProducts = this.firebaseService.getProducts()
      .pipe(
        map(products => products
          .filter(p => p.id !== currentProduct.id && p.category === currentProduct.category)
          .sort((a, b) => b.getCurrentPrice() - a.getCurrentPrice())
          .slice(0, 4)
        )
      );

    this.relatedProducts
      .pipe(finalize(() => this.cdr.detectChanges()))
      .subscribe({ error: (err) => this.loadRelatedProductsError = err });
  }
}