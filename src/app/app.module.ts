import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { reducers } from './ngrx/reducers/index'
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [

  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot(reducers),
    FormsModule,
    CommonModule,
    HttpClientModule,
    AppComponent
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }
