import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SlideShowStore } from 'src/app/stores/slideshow.store';
import { AddSlideShowComponent } from '../add-slide-show/add-slide-show.component';

@Component({
  selector: 'app-slide-show',
  templateUrl: './slide-show.component.html',
  styleUrls: ['./slide-show.component.scss']
})
export class SlideShowComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    public slideShowStore: SlideShowStore
  ) { }

  ngOnInit(): void {
    this.slideShowStore.getSlideShowImages();
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddSlideShowComponent, {
      width: '750px',
      height: '96vh',
    });

    dialogRef.updatePosition({ 'top': '2vh', 'right': '2vh' });
  }

  publishedChanged(event, key) {
    let result = event.checked;
    this.slideShowStore.updateSlideShowImage({
      key,
      published: result
    });
  }

  deleteSlideShowImage(item) {
    this.slideShowStore.deleteSlideShowImage(item);
  }
}
