import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    movieId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
      required: true,
    },
    author: {
      type: String,
      default: "Anonymous",
    },
    reviewText: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

export const Review = mongoose.model("Review", reviewSchema);
