import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Task } from 'src/app/models/task';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.css']
})


export class ListTaskComponent implements OnInit {
  listTasks: Task[] = [];

  constructor(private _taskService: TaskService, private toast:ToastrService ) { }

  ngOnInit(): void { //CICLO DE VIDA
    this.obtenerTasks();
  }

  obtenerTasks() {
    this._taskService.getTaks().subscribe(data => {
    console.log(data)
    this.listTasks = data
    }, error => {
      console.error(error);
      
    })
  }

  eliminarTask(id: any) {
    this._taskService.eliminarTask(id).subscribe(data => {
      this.toast.error("La tarea fue Eliminada con exito","Tarea Eliminada");
      this.obtenerTasks();
    }, error => {
      console.error(error)
    })
  }

}
