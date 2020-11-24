import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontendNavigationComponent } from './frontend-navigation.component';

describe('FrontendNavigationComponent', () => {
  let component: FrontendNavigationComponent;
  let fixture: ComponentFixture<FrontendNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrontendNavigationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontendNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
