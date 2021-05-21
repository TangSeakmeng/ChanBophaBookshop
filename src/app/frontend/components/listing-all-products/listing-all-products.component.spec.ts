import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingAllProductsComponent } from './listing-all-products.component';

describe('ListingAllProductsComponent', () => {
  let component: ListingAllProductsComponent;
  let fixture: ComponentFixture<ListingAllProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListingAllProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingAllProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
