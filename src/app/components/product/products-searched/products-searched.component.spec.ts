import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsSearchedComponent } from './products-searched.component';

describe('ProductsSearchedComponent', () => {
  let component: ProductsSearchedComponent;
  let fixture: ComponentFixture<ProductsSearchedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsSearchedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsSearchedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
