import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FateMenuDialogComponent } from '../../components/fate-menu-dialog/fate-menu-dialog.component';

@Component({
  selector: 'app-frontend-header',
  templateUrl: './frontend-header.component.html',
  styleUrls: ['./frontend-header.component.scss']
})
export class FrontendHeaderComponent implements OnInit {
  keyword;

  constructor(
    public route: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {

  }

  searchProduct() {
    this.route.navigate(['/searchProduct/' + this.keyword]);
  }

  openDialog() {
    let dialogRef = this.dialog.open(FateMenuDialogComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      data: {keyword: this.keyword}
    });
  }
}
