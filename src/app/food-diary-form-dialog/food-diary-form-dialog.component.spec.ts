import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodDiaryFormDialogComponent } from './food-diary-form-dialog.component';

describe('FoodDiaryFormDialogComponent', () => {
  let component: FoodDiaryFormDialogComponent;
  let fixture: ComponentFixture<FoodDiaryFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoodDiaryFormDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FoodDiaryFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
