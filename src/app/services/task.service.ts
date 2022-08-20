import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  url = 'http://localhost:4000/api/task/';

  constructor(private  http: HttpClient) { }

  getTaks(): Observable<any> {
    return this.http.get(this.url);
  }

  eliminarTask(id: string): Observable<any> {
    return this.http.delete(this.url + id);
  }

  guardarTask(task: Task): Observable<any> {
    return this.http.post(this.url, task);
  }

  obtenerTask(id:string): Observable<any> {
    return this.http.get(this.url + id);
  }

  editarTask(id: string, task: Task): Observable<any> {
    return this.http.put(this.url + id, task);
  }
}
