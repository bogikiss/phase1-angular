import { Component, Inject, OnInit } from '@angular/core';
import { FormControl,FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import { ClientFormDialogComponent } from '../client-form-dialog/client-form-dialog.component';
import { FoodDiaryService } from '../services/food-diary.service';
import {MatTableModule, MatTableDataSource} from '@angular/material/table';
import { ClientModel } from '../models/client.model';
import {MatIconModule} from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FooddiaryModel } from '../models/fooddiary.model';


@Component({
  selector: 'app-food-diary-form-dialog',
  standalone: true,
  imports: [MatButtonModule, MatInputModule, ReactiveFormsModule, MatDividerModule, MatIconModule, FormsModule, MatFormFieldModule, MatSelectModule],
  templateUrl: './food-diary-form-dialog.component.html',
  styleUrl: './food-diary-form-dialog.component.css'
})

export class FoodDiaryFormDialogComponent implements OnInit{
  foodDiaryForm = new FormGroup({
    food: new FormControl(''),
    client: new FormControl(''),
    dayOfConsumption: new FormControl(''),
    meal: new FormControl(''),
    quantityInGrams: new FormControl(''),
    observations: new FormControl('')
  });
  //dataSource: MatTableDataSource<ClientModel>; //?????
  currentFoodDiary: FooddiaryModel;
  
  constructor(
    public dialogRef: MatDialogRef<FoodDiaryFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private fooddiaryService: FoodDiaryService
    ){
      console.log(data);
      this.currentFoodDiary = data;
      }

      ngOnInit(): void{
        if(this.currentFoodDiary){
          this.foodDiaryForm.controls.food.setValue(this.currentFoodDiary.food);
          this.foodDiaryForm.controls.client.setValue(this.currentFoodDiary.client.clientId.toString());
          this.foodDiaryForm.controls.dayOfConsumption.setValue(this.currentFoodDiary.dayOfConsumption);
          this.foodDiaryForm.controls.meal.setValue(this.currentFoodDiary.meal);
          this.foodDiaryForm.controls.quantityInGrams.setValue(this.currentFoodDiary.quantityInGrams.toString());
          this.foodDiaryForm.controls.observations.setValue(this.currentFoodDiary.observations);
        }
      }

    onSubmit(): void{
      const newFoodDiary = {
          food: this.foodDiaryForm.controls.food.getRawValue(),
          client: { "clientId":  this.foodDiaryForm.controls.client.getRawValue() },
          dayOfConsumption: this.foodDiaryForm.controls.dayOfConsumption.getRawValue(),
          meal: this.foodDiaryForm.controls.meal.getRawValue(),
          quantityInGrams: this.foodDiaryForm.controls.quantityInGrams.getRawValue(),
          observations: this.foodDiaryForm.controls.observations.getRawValue()
      }

      console.log(newFoodDiary);
      /*this.dialogRef.close({data:newFoodDiary})
      location.reload();*/
      if(this.currentFoodDiary){
        this.dialogRef.close({
          event: "update",
          data: newFoodDiary
        })
      } else {
        this.dialogRef.close({
          event: "add",
          data: newFoodDiary
        })
      }
      location.reload();
      
    }

    close(): void{
        this.dialogRef.close(
          {event:"cancel"}
        );
    }

    /*close(): void{
      this.dialogRef.close();
  }*/

}
