import { Component, OnInit } from '@angular/core';
import { FooddiaryModel } from '../models/fooddiary.model';
import { FoodDiaryService } from '../services/food-diary.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-fooddiary',
  standalone: true,
  imports: [NgFor],
  templateUrl: './fooddiary.component.html',
  styleUrl: './fooddiary.component.css'
})
export class FooddiaryComponent implements OnInit{
  fooddiary: FooddiaryModel[] = [];

  constructor(private fooddiaryService: FoodDiaryService){}

  ngOnInit(): void {
    this.fooddiaryService.getAllDiaries().subscribe(res => {
      this.fooddiary = res.map((diary:any) =>{
        return {
          id: diary.id,
          food: diary.food,
          client: diary.client,
          quantityInGrams: diary.quantityInGrams
        }
      })
    })
  }

  update():void{
    console.log("UPDATEEEEE")
  }

  delete(): void{
    console.log("DELETEEE");
  }

}
