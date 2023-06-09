import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerListComponent } from './components/customers/customer-list/customer-list.component';
import { AddCustomerComponent } from './components/customers/add-customer/add-customer.component';
import { EditCustomerDialogComponent } from './components/customers/edit-customer-dialog/edit-customer-dialog.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerListComponent
  },
  {
    path: 'customers',
    component: CustomerListComponent
  },
  {
    path: 'customers/add',
    component: AddCustomerComponent
  },
{
  path: 'customers/edit/:id',
  component: EditCustomerDialogComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
