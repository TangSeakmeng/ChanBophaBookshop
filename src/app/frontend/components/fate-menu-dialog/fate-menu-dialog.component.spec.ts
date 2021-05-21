import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FateMenuDialogComponent } from './fate-menu-dialog.component';

describe('FateMenuDialogComponent', () => {
  let component: FateMenuDialogComponent;
  let fixture: ComponentFixture<FateMenuDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FateMenuDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FateMenuDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
