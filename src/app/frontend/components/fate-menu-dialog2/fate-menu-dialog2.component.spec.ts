import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FateMenuDialog2Component } from './fate-menu-dialog2.component';

describe('FateMenuDialog2Component', () => {
  let component: FateMenuDialog2Component;
  let fixture: ComponentFixture<FateMenuDialog2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FateMenuDialog2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FateMenuDialog2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
