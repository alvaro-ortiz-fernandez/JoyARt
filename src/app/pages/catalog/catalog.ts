import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Spinner, SpinnerSize } from '../../components/spinner/spinner';
import { Product } from '../../model/product';
import { Path } from '../../model/path';
import { Breadcrumb } from '../../components/breadcrumb/breadcrumb';
import { ListProduct } from './list-product/list-product';
import { FirebaseService } from '../../services/firebase';
import { BehaviorSubject, combineLatest, finalize, map, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ErrorAlert } from '../../components/error-alert/error-alert';
import { ProductOption } from '../../model/product-option';

@Component({
  selector: 'app-catalog',
  imports: [ Breadcrumb, ListProduct, AsyncPipe, ErrorAlert, Spinner ],
  templateUrl: './catalog.html',
  styleUrl: './catalog.scss',
})
export class Catalog {

  SpinnerSize = SpinnerSize; // Exponer el enum al template

  breadcrumb: Path[] = [
    {
      text: 'Inicio',
      link: '/'
    },
    {
      text: 'Catálogo'
    }
  ];

  private cdr = inject(ChangeDetectorRef);
  private firebaseService: FirebaseService = inject(FirebaseService);
  products!: Observable<Product[]>;
  pagedProducts!: Observable<Product[]>;
  loadError: any;

  pageSize = 4;
  currentPage$ = new BehaviorSubject<number>(1);
  totalPages = 1;

  totalProducts: number = 0;
  numProducts: number = 0;
  numProductsByPrice: Record<string, number> = {};
  numProductsByRating: Record<number, number> = {};
  categories: ProductOption[] = [];
  colors: ProductOption[] = [];

  selectedOrder: 'rating' | 'min-price' | 'max-price' = 'rating';
  selectedPrices = new Set<string>();
  selectedCategories = new Set<string>();
  selectedColors = new Set<string>();
  selectedRating?: string;

  constructor() {
    this.products = this.firebaseService.getProducts();

    this.products
      .pipe(finalize(() => this.cdr.detectChanges() ))
      .subscribe({
        next: (products) => {
          this.totalProducts = products.length;
          this.numProductsByPrice = this.getNumProductsByPrice(products);
          this.numProductsByRating = this.getNumProductsByRating(products);
          this.categories = this.getCategories(products);
          this.colors = this.getColors(products);
        },
        error: (err) => this.loadError = err
      });

    this.pagedProducts = combineLatest([this.products, this.currentPage$])
      .pipe(
        map(([products, page]) => {
          let filtered = products;

          if (this.selectedCategories.size > 0)
            filtered = filtered.filter(p => this.selectedCategories.has(p.category || ''));

          if (this.selectedColors.size > 0)
            filtered = filtered.filter(p => this.selectedColors.has(p.color || ''));

          if (this.selectedPrices.size > 0)
            filtered = filtered.filter(p => {
              const price = p.getCurrentPrice();
                for (let range of this.selectedPrices) {
                  const [minStr, maxStr] = range.split('-');
                  const min = parseFloat(minStr);
                  const max = parseFloat(maxStr);
                  if (price >= min && price <= max) return true;
                }
                return false;
            });

          if (this.selectedRating)
            filtered = filtered.filter(p => this.selectedRating == p.rating.toString());

          switch(this.selectedOrder) {
            case 'rating':
              filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
              break;
            case 'min-price':
              filtered.sort((a, b) => (a.getCurrentPrice() || 0) - (b.getCurrentPrice() || 0));
              break;
            case 'max-price':
              filtered.sort((a, b) => (b.getCurrentPrice() || 0) - (a.getCurrentPrice() || 0));
              break;
          }

          this.numProducts = filtered.length;

          this.totalPages = Math.ceil(filtered.length / this.pageSize);
          const start = (page - 1) * this.pageSize;
          const end = start + this.pageSize;
          return filtered.slice(start, end);
        })
      );
  }

  getPages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages)
      return;

    this.currentPage$.next(page);
  }

  nextPage() {
    this.currentPage$.next(Math.min(this.currentPage$.value + 1, this.totalPages));
  }

  prevPage() {
    this.currentPage$.next(Math.max(this.currentPage$.value - 1, 1));
  }

  get startIndex(): number {
    return this.numProducts === 0 ? 0 : (this.currentPage$.value - 1) * this.pageSize + 1;
  }

  get endIndex(): number {
    return Math.min(this.currentPage$.value * this.pageSize, this.numProducts);
  }

  changeOrder(order: 'rating' | 'min-price' | 'max-price') {
    this.selectedOrder = order;
    this.currentPage$.next(1);
  }

  togglePrice(price: string) {
    if (this.selectedPrices.has(price))
      this.selectedPrices.delete(price);
    else
      this.selectedPrices.add(price);

    this.currentPage$.next(1);
    this.cdr.detectChanges();
  }

  toggleCategory(category: string) {
    if (this.selectedCategories.has(category))
      this.selectedCategories.delete(category);
    else
      this.selectedCategories.add(category);

    this.currentPage$.next(1);
    this.cdr.detectChanges();
  }

  toggleColor(color: string) {
    if (this.selectedColors.has(color))
      this.selectedColors.delete(color);
    else
      this.selectedColors.add(color);

    this.currentPage$.next(1);
    this.cdr.detectChanges();
  }

  selectRating(ranking: string) {
    this.selectedRating = ranking;

    this.currentPage$.next(1);
    this.cdr.detectChanges();
  }

  getNumProductsByPrice(products: Product[]): Record<string, number> {
    return {
      '0-9':   products.filter(p => p.getCurrentPrice() < 10).length,
      '10-19': products.filter(p => p.getCurrentPrice() >= 10 && p.getCurrentPrice() < 20).length,
      '20-49': products.filter(p => p.getCurrentPrice() >= 20 && p.getCurrentPrice() < 50).length,
      '50-99': products.filter(p => p.getCurrentPrice() >= 50 && p.getCurrentPrice() < 100).length,
      '100+':  products.filter(p => p.getCurrentPrice() >= 100).length
    };
  }

  getNumProductsByRating(products: Product[]): Record<number, number> {
    return {
      1: products.filter(p => p.rating === 1).length,
      2: products.filter(p => p.rating === 2).length,
      3: products.filter(p => p.rating === 3).length,
      4: products.filter(p => p.rating === 4).length,
      5: products.filter(p => p.rating === 5).length
    };
  }

  private getCategories(products: Product[]): ProductOption[] {
    const counts: Record<string, number> = {};
    products
      .filter(product => !!(product.category))
      .forEach(product => counts[product.category] = (counts[product.category] || 0) + 1);

    return Object.entries(counts)
      .map(([value, count]) => new ProductOption(value, count));
  }

  private getColors(products: Product[]): ProductOption[] {
    const counts: Record<string, number> = {};
    products
      .filter(product => !!(product.color))
      .forEach(product => counts[product.color] = (counts[product.color] || 0) + 1);

    return Object.entries(counts)
      .map(([value, count]) => new ProductOption(value, count));
  }
}