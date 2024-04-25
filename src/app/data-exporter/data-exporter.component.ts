import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { log } from 'console';

@Component({
  selector: 'app-data-exporter',
  templateUrl: './data-exporter.component.html',
  styleUrls: ['./data-exporter.component.css']

})
export class DataExporterComponent implements OnInit {
  users: any[][] = [];
  constructor(private http: HttpClient) { }
  
  ngOnInit() {
  this.fetchUsers();
}

fetchUsers() {
  this.http.get<any>('https://dummyjson.com/users')
    .pipe(
      catchError(error => {
        console.error('fail', error);
        return throwError('erreur');
      })
    )
    .subscribe(response => {
      if (Array.isArray(response)) {
        this.users = response.map(user => [user.name, user.lastname]);
      } else if (typeof response === 'object') {
        this.users = Object.values(response).map((user: any) => [user.name, user.lastname]);
      } else {
        console.error('Response from API is not convertible to an array:', response);
      }
    });
}




  


  downloadJson() {
    const fileName = "data.json";
    const json = JSON.stringify(this.users);
    const blob = new Blob([json], { type: 'application/json' });
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  }
}
