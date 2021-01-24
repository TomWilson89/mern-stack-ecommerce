import { Schema, model } from "mongoose";
import { IOrderDocument } from "./orders.interface";

const schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "UserIdIsRequired"],
    },
    orderItems: [
      {
        name: { type: String, required: [true, "NameIsRequired"] },
        qty: { type: Number, required: [true, "QuantityIsRequired"] },
        image: { type: String, required: [true, "ImageIsRequired"] },
        price: { type: Number, required: [true, "PriceIsRequired"] },
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: [true, "ProductIdIsRequired"],
        },
      },
    ],
    shippingAddress: {
      address: { type: String, required: [true, "AddressIsRequired"] },
      city: { type: String, required: [true, "CityIsRequired"] },
      postalCode: { type: String, required: [true, "PostalCodeIsRequired"] },
      country: { type: String, required: [true, "CountryIsRequired"] },
    },
    paymentMethod: {
      type: String,
      required: [true, "PaymentMethodIsRequired"],
    },
    //store information that comes from paypal
    paymentResult: {
      id: String,
      status: String,
      update_time: String,
      email_address: String,
    },
    taxPrice: {
      type: Number,
      required: [true, "TaxPriceIsRequired"],
      default: 0.0,
    },
    shippingPrice: {
      type: Number,
      required: [true, "ShippingPriceIsRequired"],
      default: 0,
    },
    totalPrice: {
      type: Number,
      required: [true, "TotalPriceIsRequired"],
      default: 0,
    },
    isPaid: {
      type: Boolean,
      required: [true, "IsPaidIsRequired"],
      default: false,
    },
    paidAt: Date,
    isDelivered: {
      type: Boolean,
      required: [true, "IsDeliveredIsRequired"],
      default: false,
    },
    deliveredAt: Date,
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

schema.virtual("user", {
  ref: "User",
  localField: "userId",
  foreignField: "_id",
  justOne: true,
});

schema.virtual("product", {
  ref: "Product",
  localField: "orderItems.productId",
  foreignField: "_id",
  justOne: true,
});

export const Oder = model<IOrderDocument>("Oder", schema);

export default Oder;
