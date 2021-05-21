import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder } from '@angular/forms';

import { Category } from 'src/app/models/category.model';
import { CategoryStore } from '../../../stores/category.store';
import { SubCategoryStore } from 'src/app/stores/subcategory.store';
import { SubSubCategoryStore } from 'src/app/stores/subsubcategory.store';

import { CategoryMappingService } from 'src/app/services/mapping/category-mapping.service';
import { BrandMappingService } from 'src/app/services/mapping/brand-mapping.service';
import { IconPackageStore } from 'src/app/stores/iconPackge.store';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
  selectedIconPackage = '';
  selectedImage;

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

    public iconPackagetStore: IconPackageStore,
    public categoryStore: CategoryStore,

    public _snackBar: MatSnackBar,

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
    this.iconPackagetStore.getIconPackages();
    // this.categoryStore.getCategories();
    // this.subCategoryStore.getCategories();
  }

  onSubmit(formData) {
    if(this.selectedImage) {
      this.categoryStore.addCategory({
        ...formData,
        icon: this.selectedImage,
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
    } else {
      this.openSnackBar('Please Select Any Icon First.', 'Close');
      return;
    }
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

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  compareFn(user1:any, user2: any) {
    return user1 && user2 ? user1.key === user2.key : user1 === user2;
  }

  selectIconPackageChanged(event) {
    this.iconPackagetStore.getIconPackageImagesByKey(event.value.key);
  }

  selectImageChanged(item) {
    this.selectedImage = item;
    console.log(item)
  }
}
