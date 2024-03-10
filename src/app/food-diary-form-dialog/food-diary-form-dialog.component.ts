import { Component, Inject } from '@angular/core';
import { FormControl,FormGroup, ReactiveFormsModule } from '@angular/forms';
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

@Component({
  selector: 'app-food-diary-form-dialog',
  standalone: true,
  imports: [MatButtonModule, MatInputModule, ReactiveFormsModule, MatDividerModule, MatIconModule],
  templateUrl: './food-diary-form-dialog.component.html',
  styleUrl: './food-diary-form-dialog.component.css'
})
export class FoodDiaryFormDialogComponent {
  foodDiaryForm = new FormGroup({
    food: new FormControl(''),
    client: new FormControl(''),
    dayOfConsumption: new FormControl(''),
    meal: new FormControl(''),
    quantityInGrams: new FormControl(''),
    observations: new FormControl('')
  });
  dataSource: MatTableDataSource<ClientModel>;


  constructor(
    public dialogRef: MatDialogRef<FoodDiaryFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private fooddiaryService: FoodDiaryService
    ){
      console.log(data);

      this.fooddiaryService.getAllClients().subscribe(res => {
        this.dataSource = new MatTableDataSource<ClientModel>(res.map((diary:any) =>{
          return {
            clientId: diary.clientId,
            fullName: diary.fullName
          }
        }));
      })
    }

    onSubmit(): void{
      const newFoodDiary = {
          food: this.foodDiaryForm.controls.food.getRawValue(),
          client: this.foodDiaryForm.controls.client.getRawValue(),
          dayOfConsumption: this.foodDiaryForm.controls.dayOfConsumption.getRawValue(),
          meal: this.foodDiaryForm.controls.meal.getRawValue(),
          quantityInGrams: this.foodDiaryForm.controls.quantityInGrams.getRawValue(),
          observations: this.foodDiaryForm.controls.observations.getRawValue()
      }

      console.log(newFoodDiary);
      this.dialogRef.close({data:newFoodDiary})
    }

    close(): void{
        this.dialogRef.close();
    }

    //x
    openDialog(): void{
      const dialogRef = this.dialog.open(ClientFormDialogComponent, {
        width: '500px',
        backdropClass: 'custom-dialog-backdrop-class',
        panelClass: 'custom-dialog-panel-class',
        data: 'Some data'
      });
  
      dialogRef.afterClosed().subscribe(res=>{
        console.log(res)
        this.fooddiaryService.addClient(res.data).subscribe();
        location.reload();
      })
    }

    //x

}
