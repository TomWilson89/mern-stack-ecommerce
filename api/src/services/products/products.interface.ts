import { Document } from "mongoose";
import { IReviews } from "./reviews/reviews.interface";

export interface IProduct {
  name: string;
  userId: string;
  image: string;
  category: string;
  description: string;
  reviews: IReviews[];
  rating: number;
  numReviews: number;
  price: number;
  countInStock: number;
}

export interface IProductDocument extends Document, IProduct {
  createdAt: Date;
  updatedAt: Date;
}
