import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'; 
import { Contact } from '../shared/contact.model';
import { ApiService } from '../shared/api.service'; 

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})

export class AddContactComponent implements OnInit {
    // Задаем переменные 
	  loading: Boolean = false; 
	  newContact: Contact; 
	  jobTitles: Object[]; 
  	departments: Object[];
  	tempPhoto: Object; 

  	constructor(
  		public api: ApiService
  	) { }

    /* Выбрать файл для загрузки на сервер 
  	selectFile(event) {	
  		let reader = new FileReader(); 
  		if (event.target.files && event.target.files.length > 0) {
  			let file = event.target.files[0];
  			reader.readAsDataURL(file); 
  			reader.onload = () => {
  				this.tempPhoto = ({
  					filename: file.name, 
  					filetype: file.type,
  					value: reader.result.split(',')[1]
  				}); 
  			}
  		}
  	};*/ 

    // Получаем необходимые данные по отделам и должностям

  	ngOnInit() {
  		this.api.get('/departments')
      		.subscribe(data =>  this.departments = data ); 
    	this.api.get('/jobTitles')
      		.subscribe(data =>  this.jobTitles = data ); 
  	}

    // Добавить контакт на сервер 
  	addContact(form: NgForm) {
      // получаем данные с форм
  		this.loading = true; 
  		const formValues = Object.assign({}, form.value); 
  		let permissions = []; 
  		if (formValues.permissionOpenDeposit) {
  			permissions.push('Создание депозита');
  		} 
  		if (formValues.permissionCloseDeposit) {
  			permissions.push('Закрытие депозита');
  		} 
  		if (formValues.permissionApproveCredit) {
  			permissions.push('Одобрение кредита');
  		} 
  		if (formValues.permissionApproveAddAccount) {
  			permissions.push('Одобрение открытия счета');
  		}

  		const contact: Contact = {
  			lastname: formValues.lastName, 
  			firstname: formValues.firstName, 
  			patronymic: formValues.patronymic, 
  			gender: formValues.gender, 
  			photo_url: formValues.photoUrl,
  			job_title_name: formValues.jobTitle, 
  			department_name: formValues.department,
  			permissions: permissions
  		}
  		this.api.post('contacts', contact)
  			.subscribe(data => {
  				form.reset();
  				this.loading = false;
  				this.newContact = data; 
  			});
  	}

}
