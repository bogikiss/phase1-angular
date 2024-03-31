import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FooddiaryModel } from '../models/fooddiary.model';
import { ClientModel } from '../models/client.model';

@Injectable({
  providedIn: 'root'
})
export class FoodDiaryService {

  constructor(private httpClient: HttpClient) { }

  getAllDiaries(): Observable<any> {
    return this.httpClient.get("http://localhost:8080/food-diaries")
  }

  addFoodDiary(request: FooddiaryModel): Observable<any> {
    return this.httpClient.post("http://localhost:8080/food-diaries", request)
  }

  deleteFoodDiary(id: string): Observable<any> {
    return this.httpClient.delete("http://localhost:8080/food-diaries/" + id)
  }

  addClient(request: ClientModel): Observable<any> {
    return this.httpClient.post("http://localhost:8080/clients", request)
  }

  getAllClients(): Observable<any> {
    return this.httpClient.get("http://localhost:8080/clients")
  }

  updateFoodDiary(id: string, request:FooddiaryModel): Observable<any>{
    console.log("http://localhost:8080/food-diaries/" + id);
    return this.httpClient.put("http://localhost:8080/food-diaries/" + id, request);
  }
}
