import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { AddBrandComponent } from '../../../components/brand/add-brand/add-brand.component';
import { EditBrandComponent } from '../edit-brand/edit-brand.component';

import { BrandStore } from '../../../stores/brand.store';
import { Brand } from 'src/app/models/brand.model';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    public brandStore: BrandStore
  ) { }

  ngOnInit(): void {
    this.brandStore.getBrands();
  }

  OpenAddBrandDialog() {
    const dialogRef = this.dialog.open(AddBrandComponent, {
      width: '750px',
      height: '96vh',
    });

    dialogRef.updatePosition({ 'top': '2vh', 'right': '2vh' });
  }

  editBrand(brand: Brand) {
    const dialogRef = this.dialog.open(EditBrandComponent, {
      width: '750px',
      height: '96vh',
      data: brand
    });

    dialogRef.updatePosition({ 'top': '2vh', 'right': '2vh' });
  }

  deleteBrand(brand) {
    var result = confirm('Are you sure to delete this record?');
    if(result) {
      this.brandStore.deleteBrand(brand)
    }
  }

  formatDate(datetime) {
    var dt = new Date(datetime);
    if(dt.getHours() > 12)
      return `${dt.getMonth() + 1}/${dt.getDate()}/${dt.getFullYear()} ${dt.getHours() - 12}:${dt.getMinutes()}:${dt.getSeconds()} PM`;
    else
      return `${dt.getMonth() + 1}/${dt.getDate()}/${dt.getFullYear()} ${dt.getHours()}:${dt.getMinutes()}:${dt.getSeconds()} AM`;
  }
}
