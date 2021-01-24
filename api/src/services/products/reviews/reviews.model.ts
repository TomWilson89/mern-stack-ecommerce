import { Schema } from "mongoose";

export const reviewSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "NameIsRequired"],
    },
    rating: {
      type: Number,
      required: [true, "RatingIsRequired"],
    },
    comment: {
      type: String,
      required: [true, "CommentIsRequired"],
    },
  },
  { timestamps: true }
);
