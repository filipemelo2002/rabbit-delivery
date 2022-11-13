import mongoose, { Schema } from "mongoose";

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
    enum: ["pending", "accepted", "delivered"],
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

export default mongoose.model("Order", OrderSchema);
