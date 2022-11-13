import { Request, Response } from "express";
import { ITEM_PRICE } from "../constants";

class MenuController {
  getMenu(request: Request, response: Response) {
    const items = Object.keys(ITEM_PRICE).map((key) => ({
      name: key,
      price: ITEM_PRICE[key],
    }));
    return response.json({
      items,
    });
  }
}

export default new MenuController();
