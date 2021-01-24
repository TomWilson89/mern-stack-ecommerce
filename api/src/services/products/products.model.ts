import { Schema, model } from "mongoose";
import { IProductDocument } from "./products.interface";

import { reviewSchema } from "./reviews/reviews.model";

const schema = new Schema(
  {
    name: {
      type: String,
      required: [true, "NameIsRequired"],
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "UserIdIsRequired"],
    },
    image: {
      type: String,
      required: [true, "ImageIsRequired"],
    },
    category: {
      type: String,
      required: [true, "CategoryIsRequired"],
    },
    description: {
      type: String,
      required: [true, "DescriptionIsRequired"],
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      required: [true, "RatingIsRequired"],
      default: 0,
    },
    numReviews: {
      type: Number,
      required: [true, "NumReviewsIsRequired"],
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "PriceIsRequired"],
      default: 0,
    },
    countInStock: {
      type: Number,
      required: [true, "CountInStockIsRequired"],
      default: 0,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

schema.virtual("user", {
  ref: "User",
  localField: "userId",
  foreignField: "_id",
  justOne: true,
});

export const Product = model<IProductDocument>("Product", schema);

export default Product;
