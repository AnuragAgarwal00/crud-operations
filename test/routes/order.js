const express = require("express");
const router = express();
const { Order, validateOrder } = require("../models/order");

router.get("/:orderId", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!user) res.status(404).send("No order was found");

    res.send(order);
  } catch (error) {
    res.send(error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const { error } = validateOrder(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let order = new Order({
      noOfOrders: req.body.noOfOrders,
      subTotal: req.body.subTotal,
      averagebill: req.body.averagebill,
    });
    order = await order.save();

    res.send(order);
  } catch (ex) {
    res.send(ex.message);
  }
});

router.put("/:id", async (req, res) => {
  const { error } = validateOrder(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const order = await Order.findByIdAndUpdate(
    req.params.id,
    {
      noOfOrders: req.body.noOfOrders,
      subTotal: req.body.subTotal,
      averagebill: req.body.averagebill,
    },
    { new: true }
  );

  if (!order) return res.status(404).send("No order was found till far");

  res.send(order);
});

module.exports = router;
