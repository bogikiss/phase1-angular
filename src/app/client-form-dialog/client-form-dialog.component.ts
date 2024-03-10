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
import { FoodDiaryService } from '../services/food-diary.service';
import {MatTableModule, MatTableDataSource} from '@angular/material/table';
import { ClientModel } from '../models/client.model';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-client-form-dialog',
  standalone: true,
  imports: [MatButtonModule, MatInputModule, ReactiveFormsModule, MatDividerModule, MatIconModule],
  templateUrl: './client-form-dialog.component.html',
  styleUrl: './client-form-dialog.component.css'
})
export class ClientFormDialogComponent {
  clientForm = new FormGroup({
    clientId: new FormControl(''),
    fullName: new FormControl('')
  });

  constructor(
    public dialogRef: MatDialogRef<ClientFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    
    ){
      console.log(data);
    }

    onSubmit(): void{
      const newClient = {
          clientId: this.clientForm.controls.clientId.getRawValue(),
          fullName: this.clientForm.controls.fullName.getRawValue()
      }

      console.log(newClient);
      this.dialogRef.close({data:newClient})
    }

    close(): void{
        this.dialogRef.close();
    }
}
