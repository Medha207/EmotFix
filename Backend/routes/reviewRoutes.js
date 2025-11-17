import express from "express";
import { getReviewsByMovie, addReview } from "../controller/reviewController.js";

const reviewrouter = express.Router();

// GET all reviews for a movie
reviewrouter.get("/:movieId", getReviewsByMovie);

// POST a new review
reviewrouter.post("/", addReview);

export default reviewrouter;
