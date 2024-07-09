import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NotifyService } from '../services/notify.service';
import { Customer } from '../models/customer.model';
import { AuthService } from '../../services/auth.service';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-customers-management',
  templateUrl: './customers-management.component.html',
  styleUrls: ['./customers-management.component.scss']
})
export class CustomersManagementComponent implements OnInit {
  customers: Customer[] = [];
  selectedCustomer: Customer | null = null;

  constructor(
    private authService: AuthService,
    private customerService: CustomerService,
    private notify: NotifyService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  async loadCustomers(): Promise<void> {
    try {
      this.customers = await this.customerService.getAllCustomers();
    } catch (error) {
      this.notify.error('Failed to load customers!');
    }
  }

  selectCustomer(customer: Customer): void {
    this.selectedCustomer = customer;
  }

  openAddCustomerModal(): void {
    // Implement modal functionality to add a new customer
    // Example using MatDialog: this.dialog.open(AddCustomerModalComponent);
  }

  logout(): void {
    this.authService.logout();
  }
}
