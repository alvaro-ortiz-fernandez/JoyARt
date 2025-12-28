import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../../model/product';
import { ModelViewer } from '../../../components/model-viewer/model-viewer';

@Component({
  selector: 'app-related-product',
  imports: [ RouterLink, ModelViewer ],
  templateUrl: './related-product.html',
  styleUrl: './related-product.scss',
})
export class RelatedProduct {

  @Input() product!: Product;
  @Input() class!: string;
}
