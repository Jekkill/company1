import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router'; 
import { NgForm } from '@angular/forms'; 
import { Contact } from '../shared/contact.model';
import { ApiService } from '../shared/api.service'; 

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  oldContact: Contact;
  contact: Contact; 
  id: number; 
  updatedContact: Contact; 
  departments: string[]; 
  jobTitles: string[];
  loading = false;


  constructor(
  	public api: ApiService,
    private route: ActivatedRoute, 
    private router: Router
  	) { }


  updateContact(form: NgForm) {
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

    // формируем обновленную информацию
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
    // изменяем значение в базе данных
      this.api.put(`contacts/edit/${this.id}`, contact)
        .subscribe(data => {
          form.reset();
          this.loading = false;
          this.updatedContact = data; 
          this.router.navigate(['/contacts']);
        });
    }

  ngOnInit() {
    // При загрузке страницы получаем id пользователя + всю информацию  
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    }); 
    this.api.get('/departments')
        .subscribe(data =>  this.departments = data ); 
    this.api.get('/jobTitles')
        .subscribe(data =>  this.jobTitles = data ); 
  	this.api.get(`contacts/${this.id}`)
        .subscribe(data =>  this.oldContact = data );
  }
  // Проверить, были ли checkbox уже выбран
  permInArray(permission: string, permissionsList: string) {
    let arr = permissionsList.split(','); 
    if (arr.indexOf(permission) !== -1) {
      return true; 
    } else {
      return false; 
    }
  }


}
