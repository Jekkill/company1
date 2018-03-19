import { Component, OnInit } from '@angular/core';
import { Contact } from '../shared/contact.model'; 
import { MatTableDataSource } from '@angular/material';
import { ApiService } from '../shared/api.service'; 

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit {
	displayedColumns = ['lastname', 'firstname', 'patronymic', 'job_title', 'department', 'photo', 'edit'];
	contacts: Contact[]; 
	dataSource = new MatTableDataSource();
  jobTitles: Object[]; 
  departments: Object[];
  // задаем переменную для удаления
  id: number; 
	// Фильтр по фамилии
	applyLastNameFilter(lastname: string) {
	    lastname = lastname.trim(); // Удаляем лишние пробелы 
	    lastname = lastname.toLowerCase(); // И переводим в нижний регистр
	    this.dataSource.filter = lastname;
  	}; 
  	// Фильтр по должности 
  	togglePosition(position: number) {
  		this.dataSource.filterPredicate =
      		(data: Contact, filter: string) => data.job_title_name == filter || filter === 'all';
  		let filterPositionValue; 
  		switch (position) {
  			case 1:  filterPositionValue = 'Секретарь'; break;  
  			case 2: filterPositionValue = 'Начальник'; break; 
  			case 3: filterPositionValue = 'Директор'; break; 
  			default: filterPositionValue = 'all'; 
  		}
  		this.dataSource.filter = filterPositionValue; 
  	}
  	// Фильтр по отделу
  	toggleDepartment(department: number) {
  		this.dataSource.filterPredicate =
      		(data: Contact, filter: string) => data.department_name == filter || filter === 'all';
  		let filterDepartmentValue; 
  		if (department == 1) {
  			filterDepartmentValue = 'Департамент управления персоналом';
  			console.log(filterDepartmentValue);
  		} else if (department == 2) {
  			filterDepartmentValue = 'Департамент управления рисками'; 
  		} else {
  			filterDepartmentValue = 'all'; 
  		}
  		this.dataSource.filter = filterDepartmentValue;
  	}

    // Удаляем пользователя 
    deleteContact(id: number) {
      if (confirm("Вы уверены, что хотите удалить этого пользователя?")) {
         this.api.delete(`/contacts/delete/${id}`)
           .subscribe(() => {
             this.fetchData();
           });
      }
    }

    fetchData() {
      this.api.get('/contacts')
        .subscribe(data => this.dataSource.data = data);
    }

    constructor( public api: ApiService ) { } 

    ngOnInit() {
      // Перед загрузкой страницы получаем необходимые данные для таблицы
    	this.api.get('/contacts')
    		.subscribe(data => this.dataSource.data = data);
      this.api.get('/departments')
        .subscribe(data =>  this.departments = data ); 
      this.api.get('/jobTitles')
        .subscribe(data =>  this.jobTitles = data ); 
    } 

}
