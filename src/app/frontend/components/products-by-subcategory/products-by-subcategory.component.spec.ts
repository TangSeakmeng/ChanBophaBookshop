import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsBySubcategoryComponent } from './products-by-subcategory.component';

describe('ProductsBySubcategoryComponent', () => {
  let component: ProductsBySubcategoryComponent;
  let fixture: ComponentFixture<ProductsBySubcategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsBySubcategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsBySubcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
