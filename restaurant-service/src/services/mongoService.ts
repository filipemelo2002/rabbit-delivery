import mongoose from "mongoose";
import { MONGO_URI } from "../constants";
import { logger } from "../utils";

const mongoConnect = () => {
  mongoose.connect(MONGO_URI, (error) => {
    if (!error) return;
    logger.error("Fatal error ", error);
    logger.error(error?.stack);
  });
  mongoose.connection.on("connected", () => logger.info("Connected to Mongo"));
  mongoose.connection.on("error", () =>
    logger.error("Error connecting to Mongo")
  );
  mongoose.connection.on("disconnected", () =>
    logger.info("Disconected from Mongo")
  );
};

export default mongoConnect;
