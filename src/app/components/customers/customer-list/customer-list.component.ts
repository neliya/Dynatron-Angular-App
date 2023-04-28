import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, finalize } from 'rxjs';
import { Customer } from 'src/app/models/customer.model';
import { CustomerService } from 'src/app/services/customer.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as _ from 'lodash';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { EditCustomerDialogComponent, EditCustomerDialogData } from '../edit-customer-dialog/edit-customer-dialog.component';
import { Router } from '@angular/router';
import { ConfirmDialogOptions, ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';


const MIN_CHAR_REQUIRED_FOR_SEARCH = 2;

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit{

  customers: Customer[]=[];
  isLoading = true;
  searchedText = '';
  isCustomerSelected = false;

  constructor(public customerService: CustomerService, public dialog: MatDialog, private router: Router){}

  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true })sort: MatSort = new MatSort;

  dataColumns = ['id','firstName', 'lastName','email','phone'];
  dataSource = new MatTableDataSource<Customer>();
  ngOnInit(): void{
    this.getCustomers();
  }

  getCustomers(): void{
    this.customerService.getAllCustomers()
    .pipe(
      finalize(() => {
        this.isLoading = false;
      })
    )
    .subscribe({
      next: (customers) => {
        this.setupTable();
        this.dataSource.data = _.sortBy(customers, (user: Customer) => user.lastName);
        this.customers = customers;
      },
      error: (response) =>{
        console.log(response)
      }
    })
  }

  isSelected(data: any): boolean{
    const selectedCustomer = sessionStorage.getItem('customerId');
    return selectedCustomer === data.id;
  }

  setupTable(): void{
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyfilter(filterValue: any): void{
    const searchVal = filterValue.currentTarget.value;
    this.searchedText = searchVal;
    if(searchVal?.length >= MIN_CHAR_REQUIRED_FOR_SEARCH){
      this.dataSource.filter = searchVal;
    }else{
      this.dataSource.filter = '';
    }
  }

  shouldShowChar(): boolean{
    if(this.searchedText === null || this.searchedText === undefined || this.searchedText?.length < MIN_CHAR_REQUIRED_FOR_SEARCH){
      return true;
    }
    return false;
  }

  shouldShowText(): string{
    if (this.searchedText === null || this.searchedText === undefined || this.searchedText?.length === 0){
      return `${MIN_CHAR_REQUIRED_FOR_SEARCH} characters required for search`;
    } else if (this.searchedText?.length > 0 && this.searchedText?.length < MIN_CHAR_REQUIRED_FOR_SEARCH){
      return `${MIN_CHAR_REQUIRED_FOR_SEARCH - this.searchedText?.length} more characters required for search`;
    }
    return '';
  }

  openEditCustomerDialog(editedCustomer: Customer): void{
    const customerData: EditCustomerDialogData = {
      id: editedCustomer.id,
      firstName: editedCustomer.firstName,
      lastName: editedCustomer.lastName,
      phone: editedCustomer.phone,
      email: editedCustomer.email,
      createdDate: editedCustomer.createdDate,
      lastUpdated: editedCustomer.lastUpdated,
    }
    this.dialog.open(EditCustomerDialogComponent,{
      data: customerData,
      width: '400px',
      height: 'auto',
      maxWidth: '100%',
      backdropClass: 'backdropBackground' // This is the "wanted" line
    })
  }

  deleteCustomer(data: Customer){
    const options: ConfirmDialogOptions = {
      title: `Delete ${data.firstName + ' ' + data.lastName}?`,
      subTitle: 'Do you want to delete the selected customer?',
      buttons:[
        {
          title: 'Yes',
          value: 'true',
          type: 'destructive',
        }
      ],
      showCancelButton: true,
      cancelButtonTitle: 'Cancel',
    };

    this.dialog.open(
      ConfirmationDialogComponent, 
      {data: options})
    .afterClosed()
    .subscribe((response: Customer) => {
      this.customerService.deleteCustomer(data.id).subscribe({
        next: (response) => {
          this.getCustomers();
          this.router.navigate(['/customers']);
        }
      });
  })
  }
}
