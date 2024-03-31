import { Routes } from '@angular/router';
import { FooddiaryComponent } from './fooddiary/fooddiary.component';
import { ClientsComponent } from './clients/clients.component';


export const routes: Routes = [
    {path:'food-diary', component:FooddiaryComponent},
    {path:'clients', component:ClientsComponent}
];
