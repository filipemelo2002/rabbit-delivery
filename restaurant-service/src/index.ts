import { amqpConnect, subscribe } from "./services/amqpService";
import mongoConnect from "./services/mongoService";

(async () => {
  mongoConnect();
  const connection = await amqpConnect();
  subscribe(connection);
})();
