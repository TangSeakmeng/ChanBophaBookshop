import { Component, OnInit } from '@angular/core';
import { SlideShowStore } from 'src/app/stores/slideshow.store';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-image-slide-show',
  templateUrl: './image-slide-show.component.html',
  styleUrls: ['./image-slide-show.component.scss']
})
export class ImageSlideShowComponent implements OnInit {
  constructor(
    public slideShowStore: SlideShowStore
  ) { }

  ngOnInit(): void {
    this.slideShowStore.getPublishedSlideShowImages();
  }

  public config: SwiperOptions = {
    a11y: { enabled: true },
    direction: 'horizontal',
    slidesPerView: 1,
    keyboard: false,
    mousewheel: false,
    scrollbar: false,
    navigation: true,
    pagination: true,
    autoplay: true
  };
}
