import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import{HttpClient, HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreatestudentComponent } from './createstudent/createstudent.component';
import { DetailstudentComponent } from './detailstudent/detailstudent.component';
import { EditstudentComponent } from './editstudent/editstudent.component';
import { ListstudentComponent } from './liststudent/liststudent.component';

@NgModule({
  declarations: [
    AppComponent,
    CreatestudentComponent,
    DetailstudentComponent,
    EditstudentComponent,
    ListstudentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
