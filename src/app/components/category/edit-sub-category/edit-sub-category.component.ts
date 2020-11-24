import { Component, Inject, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder } from '@angular/forms';

import { CategoryStore } from '../../../stores/category.store';

import { CategoryMappingService } from 'src/app/services/mapping/category-mapping.service';
import { BrandMappingService } from 'src/app/services/mapping/brand-mapping.service';
import { SubCategoryStore } from 'src/app/stores/subcategory.store';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from 'src/app/models/category.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-sub-category',
  templateUrl: './edit-sub-category.component.html',
  styleUrls: ['./edit-sub-category.component.scss']
})
export class EditSubCategoryComponent implements OnInit {

  editCategoryForm;

  constructor(
    public formBuilder: FormBuilder,
    public storage: AngularFireStorage,
    public route: Router,

    public categoryMapping: CategoryMappingService,
    public brandMapping: BrandMappingService,

    public categoryStore: CategoryStore,
    public subCategoryStore: SubCategoryStore,

    @Inject(MAT_DIALOG_DATA) public data: Category
  ) {
    this.editCategoryForm = this.formBuilder.group({
      name: data.name,
      subcategory: data.subcategory
    });
  }

  ngOnInit(): void {

  }

  compareFn(user1:any, user2: any) {
    return user1 && user2 ? user1.key === user2.key : user1 === user2;
  }

  onSubmit(formData) {
    this.subCategoryStore.updateCategory({
      ...formData,
      key: this.data.key,
      updatedAt: Date.now()
    });

    this.route.navigateByUrl(`/admin/category-management/subCategories/${formData.subcategory.key}`);
  }
}
