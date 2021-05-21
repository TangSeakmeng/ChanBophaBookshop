import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ConfirmDialogModel_Class } from 'src/app/models/confirmDialogModel.model';
import { DateFormatService } from 'src/app/services/data-manipulation/date-format.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { ProductStore } from 'src/app/stores/product.store';
import { SubCategoryStore } from 'src/app/stores/subcategory.store';
import { AddProductComponent } from '../add-product/add-product.component';
import { EditProductComponent } from '../edit-product/edit-product.component';
import _ from 'lodash';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  result: string = '';

  constructor(
    private dialog: MatDialog,
    public productStore: ProductStore,
    public subCategoryStore: SubCategoryStore,
    public dateFormat: DateFormatService,
    public router: Router,
    private _snackBar: MatSnackBar
  ) { }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  ngOnInit(): void {
    this.productStore.fetchData(null, null);
    this.subCategoryStore.getCategories();
  }

  OpenAddProductDialog() {
    const dialogRef = this.dialog.open(AddProductComponent, {
      width: '750px',
      height: '96vh',
    });

    dialogRef.updatePosition({ 'top': '2vh', 'right': '2vh' });
  }

  editProduct(product) {
    const dialogRef = this.dialog.open(EditProductComponent, {
      width: '750px',
      height: '96vh',
      data: product
    });

    dialogRef.updatePosition({ 'top': '2vh', 'right': '2vh' });
  }

  deleteProduct(product) {
    this.confirmDialog(product);
  }

  confirmDialog(value): void {
    const message = `Are you sure that you want to delete this row?`;
    const dialogData = new ConfirmDialogModel_Class("Delete Product", message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;

      if(this.result) {
        this.productStore.deleteProduct(value);
        this.openSnackBar('Delete Successfully.', 'Close');
      }

      this.openSnackBar('Delete Denied.', 'Close');
    });
  }

  AddProductByCategory() {
    this.router.navigateByUrl('/admin/product-management/products-by-category/' + this.subCategoryStore.subCategories[0].key);
  }

  productTableScrolled() {

  }

  scrollHandler(e) {
    if (e === 'bottom') {
      this.productStore.fetchDataMore()
    }
  }

  publishedChanged(result, item) {
    this.productStore.updateProductPublished(item, result);
  }
}
