import { Component, Inject, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder } from '@angular/forms';

import { CategoryStore } from '../../../stores/category.store';

import { CategoryMappingService } from 'src/app/services/mapping/category-mapping.service';
import { BrandMappingService } from 'src/app/services/mapping/brand-mapping.service';
import { SubCategoryStore } from 'src/app/stores/subcategory.store';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-add-sub-category',
  templateUrl: './add-sub-category.component.html',
  styleUrls: ['./add-sub-category.component.scss']
})
export class AddSubCategoryComponent implements OnInit {

  addCategoryForm;

  constructor(
    public formBuilder: FormBuilder,
    public storage: AngularFireStorage,

    public categoryMapping: CategoryMappingService,
    public brandMapping: BrandMappingService,

    public categoryStore: CategoryStore,
    public subCategoryStore: SubCategoryStore,

    @Inject(MAT_DIALOG_DATA) public data: Category
  ) {
    this.addCategoryForm = this.formBuilder.group({
      name: '',
    });
  }

  ngOnInit(): void {

  }

  onSubmit(formData) {
    let parentCategory = this.categoryMapping.MapCategoryObj(this.data);

    this.subCategoryStore.addCategory({
      ...formData,
      subcategory: parentCategory,
      subsubcategory: null,
      published: true
    });
    this.addCategoryForm.reset();
  }

}
