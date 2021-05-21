import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ConfirmDialogModel_Class } from 'src/app/models/confirmDialogModel.model';
import { DateFormatService } from 'src/app/services/data-manipulation/date-format.service';
import { CategoryMappingService } from 'src/app/services/mapping/category-mapping.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { CategoryStore } from 'src/app/stores/category.store';
import { ProductStore } from 'src/app/stores/product.store';
import { SubCategoryStore } from 'src/app/stores/subcategory.store';
import { SubSubCategoryStore } from 'src/app/stores/subsubcategory.store';
import { AddProductByCategoryComponent } from '../add-product-by-category/add-product-by-category.component';
import { EditProductComponent } from '../edit-product/edit-product.component';

@Component({
  selector: 'app-products-by-category',
  templateUrl: './products-by-category.component.html',
  styleUrls: ['./products-by-category.component.scss']
})
export class ProductsByCategoryComponent implements OnInit {
  result;
  selectedCategory;
  buttonText = 'Product';

  constructor(
    public productStore: ProductStore,
    public categoryStore: CategoryStore,
    public subCategoryStore: SubCategoryStore,
    public subSubCategoryStore: SubSubCategoryStore,

    public categoryMapping: CategoryMappingService,
    public dateFormat: DateFormatService,

    private dialog: MatDialog,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      if(param.id) {
        const { id } = param;

        this.subCategoryStore.getCategoryByKey(id);
        this.selectedCategory = this.subCategoryStore.subCategory;
        this.subCategoryStore.getCategories();
        this.productStore.getProductByCategoryKey(id);
      } else {
        this.subCategoryStore.getCategories();
        this.productStore.getProductByCategoryKey(this.subCategoryStore.subCategories[0].key)
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  openAddProductByCategoryDialog() {
    if(this.selectedCategory || this.subCategoryStore.subCategory) {
      this.dialog.open(AddProductByCategoryComponent,
        {
          data: this.selectedCategory ? this.selectedCategory : this.subCategoryStore.subCategory
          // data:{ item: this.selectedCategory, },
        });
    }
    else
      alert('Please select any category for adding!')
  }

  compareFn(user1:any, user2: any) {
    return user1 && user2 ? user1.key === user2.key : user1 === user2;
  }

  onSelectCategoryChanged(event: any) {
    this.selectedCategory = event.value;
    this.productStore.getProductByCategory(this.selectedCategory.name)
    this.buttonText = this.selectedCategory.name
  }

  editProduct(data) {
    this.dialog.open(EditProductComponent, { width: '1000px', data });
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

  publishedChanged(result, item) {
    this.productStore.updateProductPublished(item, result);
  }
}
