import { Request, Response } from 'express'

class OrderController {
  async placeOrder (request:Request, response: Response): Promise<Response> {
    return response.json({
      message: 'sucesso!'
    })
  }
}

export default new OrderController()
