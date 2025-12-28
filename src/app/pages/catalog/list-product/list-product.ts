import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../../model/product';
import { ModelViewer } from '../../../components/model-viewer/model-viewer';

@Component({
  selector: 'app-list-product',
  imports: [ RouterLink, ModelViewer ],
  templateUrl: './list-product.html',
  styleUrl: './list-product.scss',
})
export class ListProduct {

  @Input() product!: Product;
}