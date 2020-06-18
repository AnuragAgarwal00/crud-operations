const express = require("express");
const router = express();
const _ = require("lodash");
const { User, validateUser } = require("../models/user");
const { Order } = require("../models/order");

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.send(_.pick(users, ["name", "noOfOrders"]));
  } catch (error) {
    res.send(error.message);
  }
});

router.put("/:userId", async (req, res) => {
  try {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const order = Order.findById(req.body.orderId);
    if (!order) return res.status(404).send("Invalid Order Id");

    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        order: {
          _id: order._id,
          noOfOrders: order.noOfOrders,
          subTotal: order.subTotal,
          averagebill: order.averagebill,
        },
      },
      { new: true }
    );

    if (!user) return res.status(404).send("No user was found in database..!");

    res.send({ success: true, message: "Successfully updated" });
  } catch (error) {
    res.send(error.message);
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-__v");

    if (!user) return res.status(404).send("No User was found in Db");

    res.send(_.pick(user, [noOfOrders, averageBil]));
  } catch (ex) {
    res.send(ex.message);
  }
});

module.exports = router;
