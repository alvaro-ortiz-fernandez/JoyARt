import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../../model/product';

@Component({
  selector: 'app-list-product',
  imports: [ RouterLink ],
  templateUrl: './list-product.html',
  styleUrl: './list-product.scss',
})
export class ListProduct {

  @Input() product!: Product;
}