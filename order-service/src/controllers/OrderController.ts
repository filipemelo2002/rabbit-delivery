import { Request, Response } from "express";
import { ITEM_PRICE } from "../constants";
import OrderModel from "../models/OrderModel";
interface Item {
  name: string;
  quantity: number;
}
class OrderController {
  async placeOrder(request: Request, response: Response): Promise<Response> {
    const orderDetails = request.body;

    orderDetails.total = orderDetails.items.reduce(
      (currentTotal: number, item: Item) =>
        currentTotal + ITEM_PRICE[item.name] * item.quantity,
      0
    );
    const jsonResponseBody = await new OrderModel(orderDetails).save();

    return response.status(201).json(jsonResponseBody);
  }
}

export default new OrderController();
