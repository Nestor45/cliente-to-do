import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Task } from 'src/app/models/task';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {
  taskForm: FormGroup;
  title = 'Crear Tarea';
  id: string | null;
  constructor(
    private fb:FormBuilder, private router:Router, 
    private toastr: ToastrService, private _taskService: TaskService,
    private aRouter: ActivatedRoute
    ) { 
    this.taskForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      status: ['', Validators.required],

    })
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.esEditarTask();
  }

  agregarTask() {
    console.log(this.taskForm);
    
    const TASK : Task = {
      name: this.taskForm.get('name')?.value,
      description : this.taskForm.get('description')?.value,
      category : this.taskForm.get('category')?.value,
      status : this.taskForm.get('status')?.value,
    }

    if (this.id !== null) {
      //editar tarea
      this._taskService.editarTask(this.id, TASK).subscribe(data => {
        this.toastr.info('Tarea editada con exito!', 'Se ha Editado!');
        this.router.navigate(['/']);
      },error => {
        console.error(error);
        this.toastr.error('Algo salio mal!', 'Verificar de nuevo!');
        this.taskForm.reset();
      })
    } else {
      //agregar tarea
      this._taskService.guardarTask(TASK).subscribe(data => {
        this.toastr.success('Tarea Agregada con exito!', 'Se ha agregado!');
        console.log(TASK);
        this.router.navigate(['/']);
      }, error => {
        console.error(error);
        this.toastr.error('Algo salio mal!', 'Verificar de nuevo!');
        this.taskForm.reset();
      })
    }
  }

  esEditarTask() {
    if (this.id !== null ) {
      this.title = "Editar Tarea"
      this._taskService.obtenerTask(this.id).subscribe(data => {
        this.taskForm.setValue({
          name: data.name,
          description: data.description,
          category: data.category,
          status: data.status, 
        })
      })
    }
  }
}
