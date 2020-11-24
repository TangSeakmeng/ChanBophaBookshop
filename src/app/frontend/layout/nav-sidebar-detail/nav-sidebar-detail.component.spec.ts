import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavSidebarDetailComponent } from './nav-sidebar-detail.component';

describe('NavSidebarDetailComponent', () => {
  let component: NavSidebarDetailComponent;
  let fixture: ComponentFixture<NavSidebarDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavSidebarDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavSidebarDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
