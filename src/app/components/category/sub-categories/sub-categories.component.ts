import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { AddCategoryComponent } from '../../../components/category/add-category/add-category.component';
import { EditCategoryComponent } from '../edit-category/edit-category.component';

import { Category } from 'src/app/models/category.model';
import { CategoryStore } from '../../../stores/category.store';
import { SubCategoryStore } from 'src/app/stores/subcategory.store';
import { SubSubCategoryStore } from 'src/app/stores/subsubcategory.store';
import { ActivatedRoute, Router } from '@angular/router';
import { AddSubCategoryComponent } from '../add-sub-category/add-sub-category.component';
import { DateFormatService } from '../../../services/data-manipulation/date-format.service';
import { EditSubCategoryComponent } from '../edit-sub-category/edit-sub-category.component';

@Component({
  selector: 'app-sub-categories',
  templateUrl: './sub-categories.component.html',
  styleUrls: ['./sub-categories.component.scss']
})
export class SubCategoriesComponent implements OnInit {

  selectedCategory;

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    public subCategoryStore: SubCategoryStore,
    public categoryStore: CategoryStore,
    public dateFormatService: DateFormatService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      const { key } = param;

      this.categoryStore.getCategoryByKey(key);
      this.categoryStore.getCategories();

      this.subCategoryStore.getCategoryThroughParent(key);
    })
  }

  compareFn(object_1:any, object_2: any) {
    return object_1 && object_2 ? object_1.key === object_2.key : object_1 === object_2;
  }

  OpenAddCategoryDialog() {
    this.dialog.open(AddSubCategoryComponent, { data: { ...this.categoryStore.category } });
  }

  editCategory(category: Category) {
    this.dialog.open(EditSubCategoryComponent, { data: { ...category } });
  }

  deleteCategory(category) {
    var result = confirm('Are you sure to delete this record?');
  }

  selectCategoryChanged(event: any) {
    this.selectedCategory = event.value;
  }

  publishedChanged(result, item) {
    this.subCategoryStore.updateCategoryPublished(item, result);
  }
}
