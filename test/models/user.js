const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);
const { orderSchema } = require("./order");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    name: {
      type: String,
      minlength: 5,
      maxlength: 255,
      required: true,
    },
    order: {
      type: orderSchema,
    },
  })
);

validateUser = (user) => {
  const schema = Joi.object({
    name: Joi.string().min(5).max(255).required(),
    orderId: Joi.objectId().required(),
  });

  return schema.validate(user);
};

exports.validateUser = validateUser;
exports.User = User;
