"use strict";
exports.__esModule = true;
var express_1 = require("express");
var controllers_1 = require("../controllers");
var router = express_1.Router();
/**
 * @swagger
 * tags:
 *  name: Deliveries
 *  description: deliveries endpoints
 */
//develibery routes 
router.use('/delivery', controllers_1.deliveryCrtl.router());
exports["default"] = router;
