import { Request, Response } from "express";
import { ITEM_PRICE } from "../constants";
import OrderModel, { Item, Order } from "../models/OrderModel";
import { publishOrderToExchange } from "../services/amqpService";

class OrderController {
  async placeOrder(request: Request, response: Response): Promise<Response> {
    const orderDetails = request.body as Order;

    orderDetails.total = orderDetails.items.reduce(
      (currentTotal: number, item: Item) =>
        currentTotal + ITEM_PRICE[item.name] * item.quantity,
      0
    );

    const jsonResponseBody = await new OrderModel(orderDetails).save();
    publishOrderToExchange(jsonResponseBody);

    return response.status(201).json(jsonResponseBody);
  }
}

export default new OrderController();
