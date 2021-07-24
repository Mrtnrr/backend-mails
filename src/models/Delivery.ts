import { Schema, model, Document } from "mongoose";

const DeliveriesSchema = new Schema(
  {
    email: { type: String, required: true },
    name: { type: String, required: true },
    orderId: { type: Number, required: true },
    currency: { type: String}
    // status: { type: String, enum: ["en proceso","aceptado", "rechazado"], default: "en proceso" },
  },
  { timestamps: true }
);

export interface Idelivery extends Document {
  email: string;
  name: string;
  orderId: number;
  currency: string;
}

export default model<Idelivery>("delivery", DeliveriesSchema);
