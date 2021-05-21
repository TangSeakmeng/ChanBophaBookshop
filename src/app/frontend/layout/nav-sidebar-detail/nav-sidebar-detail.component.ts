import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BrandStore } from 'src/app/stores/brand.store';
import { CategoryStore } from 'src/app/stores/category.store';
import { ProductStore } from 'src/app/stores/product.store';
import { SubCategoryStore } from 'src/app/stores/subcategory.store';

@Component({
  selector: 'app-nav-sidebar-detail',
  templateUrl: './nav-sidebar-detail.component.html',
  styleUrls: ['./nav-sidebar-detail.component.scss']
})
export class NavSidebarDetailComponent implements OnInit {
  checkboxColor = "primary";
  searchKeyword;
  subCategoryId;

  constructor(
    public categoryStore : CategoryStore,
    public subCategoryStore: SubCategoryStore,
    public brandStore: BrandStore,
    private route: ActivatedRoute,
    private productStore: ProductStore,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      this.subCategoryStore.getAllRelatedSubCategory(param.id);
      this.subCategoryId = param.id;

      if(param.keyword != undefined)
        this.searchKeyword = param.keyword;
    });
    this.brandStore.getBrands();
  }

  selectedFilteredBrands = [];

  checkboxBrandChanged(event: any, brand) {
    if(event.checked) {
      this.selectedFilteredBrands.push(brand)
    }
    else {
      let index = this.selectedFilteredBrands.findIndex((selectedBrand) => {
          return selectedBrand.key == brand.key
      })

      this.selectedFilteredBrands.splice(index, 1);
    }

    if(this.subCategoryId != undefined) {
      this.productStore.getProductByCategoryKeyAndFilterByBrand(this.subCategoryId, this.selectedFilteredBrands)
    }
    else {
      this.productStore.getProductBySearchKeywordAndFilterByBrand(this.searchKeyword, this.selectedFilteredBrands)
    }
  }

  clearFilterBrand() {
    this.selectedFilteredBrands = [];
    if(this.subCategoryId != undefined)
      this.productStore.getProductByCategoryKeyAndFilterByBrand(this.subCategoryId, this.selectedFilteredBrands)
    else
      this.productStore.getProductBySearchKeywordAndFilterByBrand(this.searchKeyword, this.selectedFilteredBrands)
  }

  checkIfBrandSelected(selectedBrand) : boolean {
    return this.selectedFilteredBrands.some((brand) => selectedBrand == brand.name);
  }
}


