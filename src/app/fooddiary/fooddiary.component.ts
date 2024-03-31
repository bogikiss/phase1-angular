import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FooddiaryModel } from '../models/fooddiary.model';
import { FoodDiaryService } from '../services/food-diary.service';
import { NgFor } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule, MatTableDataSource} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { FoodDiaryFormDialogComponent } from '../food-diary-form-dialog/food-diary-form-dialog.component';

@Component({
  selector: 'app-fooddiary',
  standalone: true,
  imports: [NgFor, MatButtonModule, MatTableModule, MatPaginatorModule, MatPaginator, MatIconModule],
  templateUrl: './fooddiary.component.html',
  styleUrl: './fooddiary.component.css'
})
export class FooddiaryComponent implements AfterViewInit{
  displayedColumns: string[] = ['id', 'food', 'client', 'dayOfConsumption', 'meal', 'quantityInGrams', 'observations', 'actions'];
  dataSource: MatTableDataSource<FooddiaryModel>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private fooddiaryService: FoodDiaryService, public dialog: MatDialog){
    this.fooddiaryService.getAllDiaries().subscribe(res => {
      this.dataSource = new MatTableDataSource<FooddiaryModel>(res.map((diary:any) =>{
        return {
          id: diary.id,
          food: diary.food,
          client: diary.client,
          dayOfConsumption: diary.dayOfConsumption,
          meal: diary.meal,
          quantityInGrams: diary.quantityInGrams,
          observations: diary.observations
        }
      }));
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  openDialog(diary?: FooddiaryModel): void{
    const dialogRef = this.dialog.open(FoodDiaryFormDialogComponent, {
      width: '500px',
      backdropClass: 'custom-dialog-backdrop-class',
      panelClass: 'custom-dialog-panel-class',
      data: diary
    });

    dialogRef.afterClosed().subscribe(res=>{
      console.log(res)
      if(res.event === 'add'){
        this.fooddiaryService.addFoodDiary(res.data).subscribe();
      } else if(res.event === 'update'){
        if(diary){
          this.fooddiaryService.updateFoodDiary(diary.id.toString(), res.data).subscribe();
        }}

       // this.fooddiaryService.addFoodDiary(res.data).subscribe();
      location.reload();
    })
  }

  deleteFoodDiary(id: string): void{
      this.fooddiaryService.deleteFoodDiary(id).subscribe(res=>{
        console.log(res);
        location.reload();
      });
  }

}
