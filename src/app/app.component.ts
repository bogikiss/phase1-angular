import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooddiaryComponent } from './fooddiary/fooddiary.component';
import { HttpClientModule } from '@angular/common/http';
import { ClientsComponent } from './clients/clients.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooddiaryComponent, HttpClientModule, ClientsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'fooddiary2-app';
}
