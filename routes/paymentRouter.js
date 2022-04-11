const express = require("express");
const router = express.Router();
const paymentCtrl = require('../controllers/paymentCtrl')

router.get("/createorder", paymentCtrl.createOrder);
router.post("/payment/callback", paymentCtrl.paymentCallback)
router.get("/payments/:paymentId", paymentCtrl.getPayment);


module.exports = router;