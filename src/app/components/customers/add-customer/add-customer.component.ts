import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/models/customer.model';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit{

  currentDate = Date.now();

  addCustomerRequest: Customer = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    createdDate: this.currentDate.toString(),
    lastUpdated: this.currentDate.toString()
  }

  constructor(private customerService: CustomerService, private router: Router){

  }

  ngOnInit(): void{

  }

  addCustomer(){
    this.customerService.addCustomer(this.addCustomerRequest).subscribe({
      next: (customer) => {
        this.router.navigate(['/customers']);
        console.log(customer);
      }
    });
    console.log(this.addCustomerRequest)
  }
}
