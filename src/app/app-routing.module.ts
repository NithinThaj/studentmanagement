import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListstudentComponent } from './liststudent/liststudent.component';
import { CreatestudentComponent } from './createstudent/createstudent.component';
import { DetailstudentComponent } from './detailstudent/detailstudent.component';
import { EditstudentComponent } from './editstudent/editstudent.component';

const routes: Routes = [
  {path:'',component:ListstudentComponent},
  {path:'create',component:CreatestudentComponent},
  {path:'detail/:id',component:DetailstudentComponent},
  {path:'change/:id',component:EditstudentComponent},
  { path: 'edit-student/:id', component: EditstudentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
