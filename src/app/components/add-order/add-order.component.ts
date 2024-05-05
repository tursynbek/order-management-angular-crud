import { Component } from '@angular/core';
import {Order} from 'src/app/models/Order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent {

  order: Order = {
    id: this.getIdOfNewOrder(),
    title: '',
    quantity: 0,
    price: 0
  };

  submitted = false;

  constructor(private orderService: OrderService) { }

  saveOrder(): void {
    const data = {
      id: this.getIdOfNewOrder(),
      title: this.order.title,
      quantity: this.order.quantity,
      price: this.order.price,
    };

    this.orderService.create(data);
    this.submitted = true;
  }

  newOrder(): void {
    this.submitted = false;
    this.order = {
      id: this.getIdOfNewOrder(),
      title: '',
      quantity: 0,
      price: 0
    };
  }


  private getIdOfNewOrder() {
    return this.orderService.getLastId() + 1;
  }

}
