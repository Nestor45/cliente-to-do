import { NgModule } from "@angular/core"; 
import { RouterModule, Routes } from "@angular/router";

//COMPONENTES
import { CreateTaskComponent } from "./components/create-task/create-task.component";
import { ListTaskComponent } from "./components/list-task/list-task.component";

const routes: Routes = [
    { path: '', component: ListTaskComponent },
    { path: 'crear-task', component: CreateTaskComponent },
    { path: 'editar-task/:id', component: CreateTaskComponent },
    { path: '**', redirectTo: '', pathMatch:'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }