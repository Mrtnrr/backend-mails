"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var DeliveriesSchema = new mongoose_1.Schema({
    email: { type: String, required: true },
    name: { type: String, required: true },
    orderId: { type: Number, required: true },
    currency: { type: String }
    // status: { type: String, enum: ["en proceso","aceptado", "rechazado"], default: "en proceso" },
}, { timestamps: true });
exports["default"] = mongoose_1.model("delivery", DeliveriesSchema);
