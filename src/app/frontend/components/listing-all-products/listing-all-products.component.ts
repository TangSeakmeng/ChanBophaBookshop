import { Component, OnInit } from '@angular/core';
import { ProductStore } from 'src/app/stores/product.store';

@Component({
  selector: 'app-listing-all-products',
  templateUrl: './listing-all-products.component.html',
  styleUrls: ['./listing-all-products.component.scss']
})
export class ListingAllProductsComponent implements OnInit {

  constructor(
    public productStore: ProductStore
  ) { }

  ngOnInit(): void {
    this.productStore.fetchData(null, null);
  }

  btnViewMore() {
    this.productStore.fetchDataMore();
  }

}
