import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/models/customer.model';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit{

  customers: Customer[]=[];
  
  constructor(public customerService: CustomerService){}

  ngOnInit(): void{
    this.getCustomers();
  }

  getCustomers(): void{
    this.customerService.getAllCustomers()
    .subscribe({
      next: (customers) => {
        this.customers = customers;
        console.log(customers);
      },
      error: (response) =>{
        console.log(response)
      }
    })
  }

}
