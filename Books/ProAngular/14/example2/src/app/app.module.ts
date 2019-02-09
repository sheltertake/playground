import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ProductComponent } from './component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    ProductComponent
  ],
  imports: [
    BrowserModule, FormsModule, ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [ProductComponent]
})
export class AppModule { }
