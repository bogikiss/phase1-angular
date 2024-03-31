import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClientModel } from '../models/client.model';

@Injectable({
    providedIn: 'root'
  })
  export class ClientService {
  
    constructor(private httpClient: HttpClient) { }
  
    getAllClients(): Observable<any> {
        return this.httpClient.get("http://localhost:8080/clients")
      }

    addClient(request: ClientModel): Observable<any> {
        return this.httpClient.post("http://localhost:8080/clients", request)
      }

    deleteClient(clientId: string): Observable<any> {
        return this.httpClient.delete("http://localhost:8080/clients/" + clientId)
      }

      updateClient(clientId: string, request:ClientModel): Observable<any>{
        console.log("http://localhost:8080/clients/" + clientId);
        return this.httpClient.put("http://localhost:8080/clients/" + clientId, request);
      }
    
  }
  