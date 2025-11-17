import { Review } from "../models/reviewModel.js";

// Get all reviews for a movie
export async function getReviewsByMovie(req, res){
  try {
    const { movieId } = req.params;
    const reviews = await Review.find({ movieId }).sort({ createdAt: -1 });
    res.status(200).json(reviews);
  } catch (error) {
    console.error(" Error fetching reviews:", error);
    res.status(500).json({ message: "Failed to load reviews" });
  }
};

//  Add a new review
export async function  addReview(req, res){
  try {
    const { movieId, author, reviewText } = req.body;

    if (!movieId || !reviewText) {
      return res.status(400).json({ message: "Movie ID and review text are required" });
    }

    const newReview = new Review({
      movieId,
      author: author || "Anonymous",
      reviewText,
    });

    const savedReview = await newReview.save();
    res.status(201).json(savedReview);
  } catch (error) {
    console.error(" Error adding review:", error);
    res.status(500).json({ message: "Failed to add review" });
  }
};
