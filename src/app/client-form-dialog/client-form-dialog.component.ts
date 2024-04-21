import { Component, Inject, OnInit } from '@angular/core';
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
} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import { FoodDiaryService } from '../services/food-diary.service';
import {MatTableModule, MatTableDataSource} from '@angular/material/table';
import { ClientModel } from '../models/client.model';
import {MatIconModule} from '@angular/material/icon';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-client-form-dialog',
  standalone: true,
  imports: [MatButtonModule, MatInputModule, ReactiveFormsModule, MatDividerModule, MatIconModule],
  templateUrl: './client-form-dialog.component.html',
  styleUrl: './client-form-dialog.component.css'
})
export class ClientFormDialogComponent implements OnInit{
  clientForm = new FormGroup({
    fullName: new FormControl(''),
    age: new FormControl(''),
    gender: new FormControl(''),
    height: new FormControl(''),
    weight: new FormControl('')
  });


  currentClient: ClientModel;
  constructor(
    public dialogRef: MatDialogRef<ClientFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private clientService: ClientService
    ){
      console.log(data);
      this.currentClient = data;
    }

    ngOnInit(): void {
      if (this.currentClient){
        this.clientForm.controls.fullName.setValue(this.currentClient.fullName);
        this.clientForm.controls.age.setValue(this.currentClient.age.toString());
        this.clientForm.controls.gender.setValue(this.currentClient.gender);
        this.clientForm.controls.height.setValue(this.currentClient.height.toString());
        this.clientForm.controls.weight.setValue(this.currentClient.weight.toString());
      }
    }

    onSubmit(): void{
      const newClient = {
          fullName: this.clientForm.controls.fullName.getRawValue(),
          age: this.clientForm.controls.age.getRawValue(),
          gender: this.clientForm.controls.gender.getRawValue(),
          height: this.clientForm.controls.height.getRawValue(),
          weight: this.clientForm.controls.weight.getRawValue()
      }

      console.log(newClient);
      if (this.currentClient){
        this.dialogRef.close({
          event:"update",
          data:newClient})
          location.reload();
      } else {
        this.dialogRef.close({
        event:"add",
        data:newClient})
      }
      
      location.reload();
    }

    close(): void{
        this.dialogRef.close({
          event: "cancel"
    });
    }
}
