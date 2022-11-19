import { Channel, connect } from "amqplib";
import { EXCHANGE, QUEUE, MQ_URL, PREFETCH_COUNT } from "../constants";
import { Order } from "../models/OrderModel";
import OrderController from "../controllers/OrderController";
import { logger } from "../utils";
export const amqpConnect = async () => {
  try {
    const mqConnection = await connect(MQ_URL);
    const amqpConnection = await mqConnection.createChannel();
    amqpConnection.assertExchange(EXCHANGE, "fanout", {
      durable: false,
    });

    await amqpConnection.assertQueue(QUEUE);
    await amqpConnection.bindQueue(QUEUE, EXCHANGE, "");
    logger.info(`AMQP - connection established at ${MQ_URL}`);
    amqpConnection.prefetch(PREFETCH_COUNT);

    return amqpConnection;
  } catch (exception) {
    logger.error("AMQP - error connecting to RabbitMQ");
    logger.error(exception);
  }
};

export const subscribe = (connection: Channel | undefined) => {
  if (!connection) {
    logger.error("AMQP - Cannot stablish subscription");
    return;
  }

  connection.consume(QUEUE, (order) => {
    if (!order) {
      logger.error("AMQP - Cannot process order");
      return;
    }
    const orderObject = JSON.parse(order?.content.toString() || "") as Order;
    logger.info(`AMQP - Order ${orderObject._id} has been processed`);
    OrderController.processOrder(orderObject, () => {
      connection.ack(order);
    });
  });
};
