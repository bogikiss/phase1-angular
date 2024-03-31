import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
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
import { ClientModel } from '../models/client.model';
import { ClientService } from '../services/client.service';
import { ClientFormDialogComponent } from '../client-form-dialog/client-form-dialog.component';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [NgFor, MatButtonModule, MatTableModule, MatPaginatorModule, MatPaginator, MatIconModule],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css'
})
export class ClientsComponent implements AfterViewInit{
  displayedColumns: string[] = ['clientId', 'fullName', 'age', 'gender', 'height', 'weight', 'actions'];
  dataSource: MatTableDataSource<ClientModel>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private clientService: ClientService, public dialog: MatDialog){
    this.clientService.getAllClients().subscribe(res => {
      this.dataSource = new MatTableDataSource<ClientModel>(res.map((client:any) =>{
        return {
          clientId: client.clientId,
          fullName: client.fullName,
          age: client.age,
          gender: client.gender,
          height: client.height,
          weight: client.weight
        }
      }));
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  openDialog(client?: ClientModel): void{
    const dialogRef = this.dialog.open(ClientFormDialogComponent, {
      width: '500px',
      backdropClass: 'custom-dialog-backdrop-class',
      panelClass: 'custom-dialog-panel-class',
      data: client
    });

    dialogRef.afterClosed().subscribe(res=>{
      console.log(res)
      if(res.event === 'add'){
        this.clientService.addClient(res.data).subscribe();
      } else if (res.event === 'update'){
        if (client){
        this.clientService.updateClient(client.clientId.toString(), res.data).subscribe();
        }
      }
      location.reload();
      
    })
  }

  deleteClient(clientId: string): void{
      this.clientService.deleteClient(clientId).subscribe(res=>{
        console.log(res);
        location.reload();
      });
  }

}
