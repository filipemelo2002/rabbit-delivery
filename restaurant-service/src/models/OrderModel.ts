import mongoose, { Schema } from "mongoose";
import { ORDER_STATUSES } from "../constants";

export interface Item {
  name: string;
  quantity: number;
}

export interface Order {
  items: Item[];
  total: Number;
  _id?: Number;
}

const ItemSchema = new Schema({
  name: {
    type: String,
    default: "",
    required: true,
  },
  quantity: {
    type: Number,
    default: 0,
    required: true,
  },
});

const OrderSchema = new Schema({
  items: {
    type: [ItemSchema],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  total: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: [
      ORDER_STATUSES.PENDING,
      ORDER_STATUSES.ACCEPTED,
      ORDER_STATUSES.DELIVERED,
    ],
    default: "pending",
  },
  email: {
    type: String,
    required: true,
  },
});

OrderSchema.path("email").validate((email) => {
  const regex = /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  return regex.test(email);
}, "Invalid e-mail");

export default mongoose.model<Order>("Order", OrderSchema);
