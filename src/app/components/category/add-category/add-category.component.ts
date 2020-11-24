import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder } from '@angular/forms';

import { Category } from 'src/app/models/category.model';
import { CategoryStore } from '../../../stores/category.store';
import { SubCategoryStore } from 'src/app/stores/subcategory.store';
import { SubSubCategoryStore } from 'src/app/stores/subsubcategory.store';

import { CategoryMappingService } from 'src/app/services/mapping/category-mapping.service';
import { BrandMappingService } from 'src/app/services/mapping/brand-mapping.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  // tempSubCategories: Category[];

  // disabledSubCategory = true;
  // disabledSubSubCategory = true;

  // selectedSubCategory: Category;
  // selectedSubSubCategory: Category;

  addCategoryForm;

  constructor(
    public formBuilder: FormBuilder,
    public storage: AngularFireStorage,

    public categoryMapping: CategoryMappingService,
    public brandMapping: BrandMappingService,

    public categoryStore: CategoryStore,
    // public subCategoryStore: SubCategoryStore,
    // public subSubCategoryStore: SubSubCategoryStore,
  ) {
    this.addCategoryForm = this.formBuilder.group({
      name: '',
      // subcategory: ({ disable: true }),
      // subsubcategory: ({ disable: true }),
    });
  }

  ngOnInit(): void {
    // this.categoryStore.getCategories();
    // this.subCategoryStore.getCategories();
  }

  onSubmit(formData) {
    this.categoryStore.addCategory({
      ...formData,
      subcategory: null,
      subsubcategory: null,
      published: true,
      publishedOnHomepage: true
    });

    // if(this.disabledSubCategory && this.disabledSubSubCategory)
    //   this.categoryStore.addCategory({ ...formData, subcategory: null, subsubcategory: null });
    // else if (!this.disabledSubCategory && this.disabledSubSubCategory)
    //   this.subCategoryStore.addCategory({ ...formData, subsubcategory: null });
    // else if (!this.disabledSubCategory && !this.disabledSubSubCategory)
    //   this.subSubCategoryStore.addCategory({ ...formData })

    this.addCategoryForm.reset();
  }

  // checkedSubCategoryChanged(event: any) {
  //   this.disabledSubCategory = !event;
  // }

  // checkedSubSubCategoryChanged(event: any) {
  //   this.disabledSubSubCategory = !event;
  // }

  // onSubCategoryChanged(event: any) {
  //   this.selectedSubCategory = event.value;
  //   this.tempSubCategories = this.subCategoryStore.getFilteredSubcategories(this.selectedSubCategory?.name);
  // }
}
