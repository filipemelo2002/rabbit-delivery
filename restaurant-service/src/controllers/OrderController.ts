import { ORDER_DELIVERY_DELAY, ORDER_STATUSES } from "../constants";
import OrderModel, { Order } from "../models/OrderModel";

class OrderController {
  async processOrder(order: Order, callback: Function) {
    OrderModel.findOneAndUpdate(order._id, {
      status: ORDER_STATUSES.ACCEPTED,
    });
    setTimeout(() => {
      OrderModel.findOneAndUpdate(order._id, {
        status: ORDER_STATUSES.DELIVERED,
      });
      callback();
    }, ORDER_DELIVERY_DELAY);
  }
}

export default new OrderController();
