import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FirebaseService } from '../../services/firebase';
import { finalize, Observable } from 'rxjs';
import { Spinner, SpinnerSize } from '../../components/spinner/spinner';
import { ErrorAlert } from '../../components/error-alert/error-alert';
import { Product } from '../../model/product';

@Component({
  selector: 'app-catalog',
  imports: [AsyncPipe, ErrorAlert, Spinner],
  templateUrl: './catalog.html',
  styleUrl: './catalog.scss',
})
export class Catalog {

  SpinnerSize = SpinnerSize; // Exponer el enum al template

  private cdr = inject(ChangeDetectorRef);
  private firebaseService: FirebaseService = inject(FirebaseService);
  products!: Observable<Product[]>;
  loadError: any;

  constructor() {
    this.products = this.firebaseService.getProducts();
    this.products
      .pipe(finalize(() => this.cdr.detectChanges() ))
      .subscribe({ error: (err) => this.loadError = err });
  }
}
