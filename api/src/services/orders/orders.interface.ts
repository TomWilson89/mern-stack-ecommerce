import { Document } from "mongoose";

export interface IOrder {
  userId: string;
  orderItems: {
    name: string;
    qty: number;
    image: string;
    price: number;
    productId: string;
  }[];
  shippingAddress: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: string;
  paymentResult: {
    id: string;
    status: string;
    update_time: string;
    email_address: string;
  };
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  isPaid: boolean;
  paidAt: Date;
  isDelivered: boolean;
  deliveredAt: Date;
}

export interface IOrderDocument extends Document, IOrder {
  createdAt: Date;
  updatedAt: Date;
}
