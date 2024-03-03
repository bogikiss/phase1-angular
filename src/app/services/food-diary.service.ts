import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FoodDiaryService {

  constructor(private httpClient: HttpClient) { }

  getAllDiaries(): Observable<any> {
    return this.httpClient.get("http://localhost:8080/fooddiaries")
  }
}
