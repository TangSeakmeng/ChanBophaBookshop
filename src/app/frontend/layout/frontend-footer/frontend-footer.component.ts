import { Component, OnInit } from '@angular/core';
import { SubCategoryStore } from 'src/app/stores/subcategory.store';

@Component({
  selector: 'app-frontend-footer',
  templateUrl: './frontend-footer.component.html',
  styleUrls: ['./frontend-footer.component.scss']
})
export class FrontendFooterComponent implements OnInit {

  constructor(
    public subCategoryStore: SubCategoryStore
  ) { }

  ngOnInit(): void {
    this.subCategoryStore.getCategoryUsingGroupBy();
  }
}
