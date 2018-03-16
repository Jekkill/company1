import { NgModule } from '@angular/core'; 
import { Routes, RouterModule } from '@angular/router'; 
import { TableComponent } from './table/table.component';
import { AddContactComponent } from './add-contact/add-contact.component'; 

const routes: Routes = [
	{
		path: '/', 
		redirectTo: 'table', 
		pathMatch: 'full'
	}, 
	{
		path: '/contacts', 
		component: TableComponent
	}, 
	{
		path: '/new', 
		component: AddContactComponent
	}
]

@NgModule({
	imports: [RouterModule.forRoot(routes)], 
	exports: [RouterModule]
})

export class AppRoutingModule {  }