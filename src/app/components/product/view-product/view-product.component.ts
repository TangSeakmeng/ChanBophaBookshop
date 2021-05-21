import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductStore } from 'src/app/stores/product.store';
import { EditProductComponent } from '../edit-product/edit-product.component';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.scss']
})
export class ViewProductComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    public productStore: ProductStore
  ) { }

  ngOnInit() {
    let id = this.route.snapshot.params.id;
    this.productStore.getProductById(id);
  }

  openEditProductDialog() {
    const dialogRef = this.dialog.open(EditProductComponent, {
      width: '750px',
      height: '96vh',
      data: this.productStore.product
    });

    dialogRef.updatePosition({ 'top': '2vh', 'right': '2vh' });
  }

  deleteProduct() {
    let result = confirm('Are you sure that you want to delete this record?')

    if(result) {
      this.productStore.deleteProduct(this.productStore.product)
      this.router.navigate(['/admin/product-management']);
    }
  }
}
