import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DateFormatService } from 'src/app/services/data-manipulation/date-format.service';
import { CategoryMappingService } from 'src/app/services/mapping/category-mapping.service';
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
  ) { }

  ngOnInit(): void {
    this.categoryStore.getCategories();
    this.subCategoryStore.getCategories();
    this.subSubCategoryStore.getCategories();
  }

  openAddProductByCategoryDialog() {
    if(this.selectedCategory) {
      this.dialog.open(AddProductByCategoryComponent,
        {
          data: this.selectedCategory,
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

  deleteProduct(data) {
    let result = confirm('Are you sure that you want to delete this row?')

    if(result)
      this.productStore.deleteProduct(data);
  }
}
