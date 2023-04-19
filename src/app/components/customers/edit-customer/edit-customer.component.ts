import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/models/customer.model';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent {

  customerDetails: Customer = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  };
  
  constructor(
    private route: ActivatedRoute, 
    private customerService: CustomerService, 
    private router: Router){

  }

  ngOnInit(): void{
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');
        if(id){
          this.customerService.getCustomer(id)
          .subscribe({
            next: (response) => {
              this.customerDetails = response;
            }
          })
        }
      }

    })
  }

  updateCustomer(){
    this.customerService.updateCustomer(
      this.customerDetails.id, this.customerDetails).subscribe({
      next: (response) => {
        this.router.navigate(['customers']);
      }
    });
  }

  deleteCustomer(id: string){
    this.customerService.deleteCustomer(id).subscribe({
      next: (response) => {
        this.router.navigate(['customers']);
      }
    });
  }
}
