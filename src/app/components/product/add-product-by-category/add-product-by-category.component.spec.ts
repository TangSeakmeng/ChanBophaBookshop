import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductByCategoryComponent } from './add-product-by-category.component';

describe('AddProductByCategoryComponent', () => {
  let component: AddProductByCategoryComponent;
  let fixture: ComponentFixture<AddProductByCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProductByCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProductByCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
