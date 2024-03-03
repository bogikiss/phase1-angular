import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooddiaryComponent } from './fooddiary.component';
import { NgForOf } from '@angular/common';

describe('FooddiaryComponent', () => {
  let component: FooddiaryComponent;
  let fixture: ComponentFixture<FooddiaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooddiaryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FooddiaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
