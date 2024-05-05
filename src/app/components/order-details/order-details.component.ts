import { Component, Input, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import {Order} from 'src/app/models/Order';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  currentOrder: Order = {
    id: 20,
    title: '',
    quantity: 0,
    price: 0
  };

  message = '';

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
      this.message = '';
      this.getOrder(this.route.snapshot.params["id"]);
  }

  getOrder(id: number): void {
    this.currentOrder = this.orderService.get(id);

  }

  updateOrder(): void {
    this.message = '';

    this.orderService.update(this.currentOrder);
    this.router.navigateByUrl('orders');
  }

  deleteOrder(): void {
    this.orderService.delete(this.currentOrder?.id);
    this.router.navigateByUrl('orders');
  }

}
