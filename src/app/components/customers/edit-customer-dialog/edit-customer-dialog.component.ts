import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/models/customer.model';
import { CustomerService } from 'src/app/services/customer.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StringLiteral } from 'typescript';

export interface EditCustomerDialogData{
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  createdDate: string;
  lastUpdated: string;
}

@Component({
  selector: 'app-edit-customer-dialog',
  templateUrl: './edit-customer-dialog.component.html',
  styleUrls: ['./edit-customer-dialog.component.css']
})
export class EditCustomerDialogComponent {

  editCustomerFormGroup!: FormGroup;
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: EditCustomerDialogData, 
    public dialogRef: MatDialogRef<EditCustomerDialogData>,
    private route: ActivatedRoute, 
    private customerService: CustomerService, 
    private router: Router,
    private fb: FormBuilder){

  }

  ngOnInit(): void{
    this.editCustomerFormGroup = this.fb.group({
      id: [this.data.id],
      firstName: [this.data?.firstName, Validators.required],
      lastName: [this.data?.lastName, Validators.required],
      email: [this.data?.email],
      phone: [this.data?.phone],
      createdDate: [this.data?.createdDate],
      lastUpdated:[this.data?.lastUpdated]
    });
  }

  getId(): string{
    return this.editCustomerFormGroup?.get('id')?.value;
  }

  getFirstName(): string{
    return this.editCustomerFormGroup?.get('firstName')?.value;
  }

  getLastName(): string{
    return this.editCustomerFormGroup?.get('lastName')?.value;
  }

  getEmail(): string{
    return this.editCustomerFormGroup?.get('email')?.value;
  }
  getPhone(): string{
    return this.editCustomerFormGroup?.get('phone')?.value;
  }

  updateCustomer(){
    const customerDetails = new Customer();
    customerDetails.id = this.getId();
    customerDetails.firstName = this.getFirstName();
    customerDetails.lastName = this.getLastName();
    customerDetails.email = this.getEmail();
    customerDetails.phone = this.getPhone();
    customerDetails.createdDate = this.data.createdDate;

    sessionStorage.clear();  
    sessionStorage.setItem('customerId', this.getId()); 
    sessionStorage.setItem('customerDetails', JSON.stringify(customerDetails)); 

    this.customerService.updateCustomer(this.getId(), customerDetails).subscribe({
      next: (customer) => {
        this.dialogRef.close();
      }
    });

   
  }
}
