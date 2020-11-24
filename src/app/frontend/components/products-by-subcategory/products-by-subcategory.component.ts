import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductStore } from 'src/app/stores/product.store';

@Component({
  selector: 'app-products-by-subcategory',
  templateUrl: './products-by-subcategory.component.html',
  styleUrls: ['./products-by-subcategory.component.scss']
})
export class ProductsBySubcategoryComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    public productStore: ProductStore
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      if(param.id != undefined) {
        this.productStore.getProductByCategoryKey(param.id);
      }
      else {
        this.productStore.searchProductByName(param.keyword);
      }
    });
  }

}
