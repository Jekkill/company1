// Импорты различных модулей
import 'hammerjs'; 
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Блок Material 

import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';

// Компоненты и модули, созданные пользователем

import { AppRoutingModule } from './app-routing.module'; 
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { TableComponent } from './table/table.component';
import { ContactComponent } from './contact/contact.component';
import { AddContactComponent } from './add-contact/add-contact.component'; 
import { ApiService } from './shared/api.service'; 

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent, 
    TableComponent,
    ContactComponent,
    AddContactComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule, 
    MatTableModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatRadioModule, 
    MatCardModule,
    MatCheckboxModule,
    MatIconModule, 
    AppRoutingModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
