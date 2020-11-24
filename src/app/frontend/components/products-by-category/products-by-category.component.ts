import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductStore } from 'src/app/stores/product.store';

@Component({
  selector: 'app-products-by-category',
  templateUrl: './products-by-category.component.html',
  styleUrls: ['./products-by-category.component.scss']
})
export class ProductsByCategoryComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    public productStore: ProductStore
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      this.productStore.getProductBySubCategoryKey(param.id);
    });
  }
}
