import { Component, OnInit } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';  
import 'rxjs/add/operator/map'; 
import { NgForm } from '@angular/forms'; 
import { Contact } from '../shared/contact.model';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {

	loading: Boolean = false; 
	newContact: Contact; 
	jobTitles: Object[]; 
  	departments: Object[];
  	tempPhoto: Object; 

  	constructor(
  		public http: Http
  	) { }

  	showInfo(e: any) {
  		console.log(e);
  	};

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
  		
  	};

  	ngOnInit() {
  		this.http.get('/api/departments')
      		.map((res: Response) => res.json())
      		.subscribe(data =>  this.departments = data ); 
    	this.http.get('/api/jobTitles')
      		.map((res: Response) => res.json())
      		.subscribe(data =>  this.jobTitles = data ); 
  	}

  	onSubmit(form: NgForm) {
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
  			photo_url: formValues.photo,
  			job_title_name: formValues.jobTitle, 
  			department_name: formValues.department,
  			permissions: permissions
  		}
  		console.log(contact);
  	 	const headers = new Headers(); 
  		headers.append('Content-Type', 'application/json');
  		const requestOptions = new RequestOptions({ headers: headers }); 
  		this.http.post('/api/contacts', contact, requestOptions)
  			.map((res: Response ) => res.json())
  			.subscribe(data => {
  				form.reset();
  				this.loading = false;
  				this.newContact = data; 
  			});
  	}

}
