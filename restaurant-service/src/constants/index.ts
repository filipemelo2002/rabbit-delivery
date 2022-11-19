export const ORDER_STATUSES = {
  PENDING: "pending",
  ACCEPTED: "accepted",
  DELIVERED: "delivered",
};

export const ORDER_DELIVERY_DELAY =
  parseInt(process.env.ORDER_DELIVERY_TIME || "0") || 10000;

export const EXCHANGE = "orders";

export const QUEUE = "orders.process";

export const MQ_HOST = process.env.MQ_HOST || "localhost";

export const MQ_URL = `amqp://${MQ_HOST}:5672`;

export const PREFETCH_COUNT = parseInt(process.env.PREFETCH_COUNT || "0") || 2;

export const MONGO_CONTAINER_NAME = process.env.MONGO_HOST || "localhost";
export const MONGO_URI = `mongodb://${MONGO_CONTAINER_NAME}:27017/rabbitDelivery`;
