import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.scss']
})
export class ManageOrdersComponent {
  manageOrderForm: FormGroup; // Define FormGroup for form control bindings
  totalAmount: number = 1000; // Static total amount
  dataSource: any[] = [ // Static data for the table
    { name: 'Product 1', price: 100, quantity: 2, total: 200 },
    { name: 'Product 2', price: 150, quantity: 1, total: 150 },
    { name: 'Product 3', price: 75, quantity: 3, total: 225 }
  ];

  constructor(private fb: FormBuilder) {
    // Initialize the form group and its controls
    this.manageOrderForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contactNumber: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      paymentMethod: ['', Validators.required],
      category: ['', Validators.required],
      product: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['', Validators.required],
      total: ['', Validators.required]
    });
  }

  submitAction() {
    // Functionality for submitting action
    console.log('Submit action triggered');
  }

  add() {
    // Functionality for adding action
    console.log('Add action triggered');
  }

  handleDeleteAction() {
    // Functionality for handling delete action
    console.log('Delete action triggered for index:');
  }

  validateProductAdd(): boolean {
    // Functionality for validating product add
    return false; // For demonstration, always return false
  }

  setQuantity(event: any) {
    // Functionality for setting quantity
    console.log('Quantity set:', event.target.value);
  }
}
