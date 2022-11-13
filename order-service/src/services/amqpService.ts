import { connect, Channel } from "amqplib";
import { Order } from "../models/OrderModel";
import { logger } from "../utils";

const MQ_HOST = process.env.MQ_HOST || "localhost";
const MQ_URL = `amqp://${MQ_HOST}:5672`;

const EXCHANGE = "orders";
let orderChannel: Channel | undefined;

export const ampConnection = async () => {
  try {
    const mqConnection = await connect(MQ_URL);
    orderChannel = await mqConnection.createChannel();

    await orderChannel.assertExchange(EXCHANGE, "fanout", { durable: false });

    logger.info(`AMQP - connection established at ${MQ_URL}`);
  } catch (exception) {
    logger.error("AMQP - error connecting to RabbitMQ");
    logger.error(exception);
  }
};

export const publishOrderToExchange = (order: Order) => {
  orderChannel?.publish(EXCHANGE, "", Buffer.from(JSON.stringify(order)));
  logger.info(`AMQP - order ${order._id} placed`);
};
