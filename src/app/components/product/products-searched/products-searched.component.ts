import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DateFormatService } from 'src/app/services/data-manipulation/date-format.service';
import { ProductStore } from 'src/app/stores/product.store';
import { AddProductComponent } from '../add-product/add-product.component';
import { EditProductComponent } from '../edit-product/edit-product.component';

@Component({
  selector: 'app-products-searched',
  templateUrl: './products-searched.component.html',
  styleUrls: ['./products-searched.component.scss']
})
export class ProductsSearchedComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    public productStore: ProductStore,
    public dateFormat: DateFormatService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      const { option, value } = param;

      if(option == 'Name')
        this.productStore.searchProductByName(value);
      else if(option == 'Category')
        this.productStore.searchProductByCategory(value);
    })
  }

  OpenAddProductDialog() {
    this.dialog.open(AddProductComponent);
  }

  editProduct(product) {
    this.dialog.open(EditProductComponent, { width: '1000px', data: product });
  }

  deleteProduct(product) {
    let result = confirm('Are you sure that you want to delete this row?')

    if(result)
      this.productStore.deleteProduct(product);
  }

}
