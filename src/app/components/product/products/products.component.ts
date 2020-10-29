import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DateFormatService } from 'src/app/services/data-manipulation/date-format.service';
import { ProductStore } from 'src/app/stores/product.store';
import { AddProductComponent } from '../add-product/add-product.component';
import { EditProductComponent } from '../edit-product/edit-product.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    public productStore: ProductStore,
    public dateFormat: DateFormatService
  ) { }

  ngOnInit(): void {
    this.productStore.getProducts();
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
