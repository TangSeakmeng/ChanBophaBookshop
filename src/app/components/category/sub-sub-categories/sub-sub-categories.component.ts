import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { AddCategoryComponent } from '../../../components/category/add-category/add-category.component';
import { EditCategoryComponent } from '../edit-category/edit-category.component';

import { Category } from 'src/app/models/category.model';
import { CategoryStore } from '../../../stores/category.store';
import { SubCategoryStore } from 'src/app/stores/subcategory.store';
import { SubSubCategoryStore } from 'src/app/stores/subsubcategory.store';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sub-sub-categories',
  templateUrl: './sub-sub-categories.component.html',
  styleUrls: ['./sub-sub-categories.component.scss']
})
export class SubSubCategoriesComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    public subSubCategoryStore: SubSubCategoryStore,
    public subCategoryStore: SubCategoryStore
  ) { }

  ngOnInit(): void {
    let key = this.route.snapshot.params.key;
    this.subSubCategoryStore.getCategoryThroughParent(key);
    this.subCategoryStore.getCategoryByKey(key);
  }

  OpenAddCategoryDialog() {
    this.dialog.open(AddCategoryComponent);
  }

  editCategory(category: Category) {
    this.dialog.open(EditCategoryComponent, { data: { ...category } });
  }

  deleteCategory(category) {
    var result = confirm('Are you sure to delete this record?');

    // if(result)
      // this.categoryStore.deleteCategory(category);
  }

  formatDate(datetime) {
    var dt = new Date(datetime);
    if(dt.getHours() > 12)
      return `${dt.getMonth() + 1}/${dt.getDate()}/${dt.getFullYear()} ${dt.getHours() - 12}:${dt.getMinutes()}:${dt.getSeconds()} PM`;
    else
      return `${dt.getMonth() + 1}/${dt.getDate()}/${dt.getFullYear()} ${dt.getHours()}:${dt.getMinutes()}:${dt.getSeconds()} AM`;
  }
}
