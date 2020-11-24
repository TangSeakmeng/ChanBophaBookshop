import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowProductByCategoryComponent } from './show-product-by-category.component';

describe('ShowProductByCategoryComponent', () => {
  let component: ShowProductByCategoryComponent;
  let fixture: ComponentFixture<ShowProductByCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowProductByCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowProductByCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
