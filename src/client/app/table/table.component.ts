import { Component, OnInit } from '@angular/core';
import { Http, Response  } from '@angular/http'; 
import 'rxjs/add/operator/map';
import { Contact } from '../shared/contact.model'; 
import { MatTableDataSource } from '@angular/material';

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
	// Фильтр по фамилии - не работает, надо разобраться почему
	applyLastNameFilter(lastname: string) {
	    lastname = lastname.trim(); // Удаляем лишние пробелы 
	    lastname = lastname.toLowerCase(); // И переводим в нижний регистр
	    this.dataSource.filter = lastname;
  	}; 
  	// Фильтр по должности 
  	togglePosition(position: number) {
  		this.dataSource.filterPredicate =
      		(data: Contact, filter: string) => data.job_title_name == filter || filter === 'все';
  		let filterPositionValue; 
  		switch (position) {
  			case 1:  filterPositionValue = 'Секретарь'; break;  
  			case 2: filterPositionValue = 'Начальник'; break; 
  			case 3: filterPositionValue = 'Директор'; break; 
  			default: filterPositionValue = 'все'; 
  		}
  		this.dataSource.filter = filterPositionValue; 
  	}
  	// Фильтр по отделу
  	toggleDepartment(department: number) {
  		this.dataSource.filterPredicate =
      		(data: Contact, filter: string) => data.department_name == filter || filter === 'все';
  		let filterDepartmentValue; 
  		if (department == 1) {
  			filterDepartmentValue = 'Департамент управления персоналом';
  			console.log(filterDepartmentValue);
  		} else if (department == 2) {
  			filterDepartmentValue = 'Департамент управления рисками'; 
  		} else {
  			filterDepartmentValue = 'все'; 
  		}
  		this.dataSource.filter = filterDepartmentValue;
  	}
  constructor( public http: Http ) { } 

  ngOnInit() {
  	this.http.get('/api/contacts')
  		.map((res: Response) => res.json())
  		.subscribe(data => this.dataSource.data = data);
    this.http.get('/api/departments')
      .map((res: Response) => res.json())
      .subscribe(data =>  this.departments = data ); 
    this.http.get('/api/jobTitles')
      .map((res: Response) => res.json())
      .subscribe(data =>  this.jobTitles = data ); 
  } 

}
