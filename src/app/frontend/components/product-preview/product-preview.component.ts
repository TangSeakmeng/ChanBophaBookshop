import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivationEnd } from '@angular/router';
import { ProductStore } from 'src/app/stores/product.store';
import { ProductColorStore } from 'src/app/stores/productColor.store';

@Component({
  selector: 'app-product-preview',
  templateUrl: './product-preview.component.html',
  styleUrls: ['./product-preview.component.scss']
})
export class ProductPreviewComponent implements OnInit {
  public link = null;
  public selectedColor = null;

  constructor(
    private route : ActivatedRoute,
    public productStore: ProductStore,
    public productColorStore: ProductColorStore
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      this.productStore.getProductById(param.id);
      this.productStore.getColorCollection(param.id);
    });
  }

  getDefaultColorImages(productKey) {
    this.productStore.getProductById(productKey);
    this.link = null;
    this.selectedColor = null;
  }

  getSelectedColorImages(productKey, colorKey) {

    this.productStore.getSelectedColorImages(productKey, colorKey);
    this.link = null;
    this.selectedColor = colorKey;
  }

  changeMainImage(imagePath) {
    this.link = imagePath;
  }
}
