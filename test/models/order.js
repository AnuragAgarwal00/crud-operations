const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const orderSchema = new mongoose.Schema({
  noOfOrders: {
    type: Number,
    min: 0,
    max: 20,
  },
  subTotal: {
    type: Number,
  },
  averagebill: {
    type: Number,
    min: 0,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const Order = mongoose.model("Orders", orderSchema);

validateOrder = (order) => {
  const schema = Joi.object({
    noOfOrders: Joi.number().required().min(0).max(20),
    subTotal: Joi.number().min(0),
    averagebill: Joi.number().min(0),
  });

  return schema.validate(order);
};

exports.orderSchema = orderSchema;
exports.Order = Order;
exports.validateOrder = validateOrder;
