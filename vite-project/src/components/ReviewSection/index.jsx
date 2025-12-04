import React, { useState } from "react";
import "./index.css";

const ReviewsSection = () => {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      title: "Frankenstein",
      year: 2025,
      user: "Zoë Rose Bryant",
      rating: "4.5",
      likes: "2,837",
      text: "Ever since I read Frankenstein for the first time in high school, it’s been my favorite story. I felt an instant kinship with the creature — tragic yet deeply human.",
      image:
        "https://m.media-amazon.com/images/I/81H1i2B+IPL._AC_UF894,1000_QL80_.jpg",
    },
    {
      id: 2,
      title: "The Perfect Neighbor",
      year: 2025,
      user: "Abigail",
      rating: "5",
      likes: "4,078",
      text: "“Are you hurt?” — “No, but my heart is broken.” A moving story that lingers long after the credits roll.",
      image:
        "https://m.media-amazon.com/images/I/71K3ZtMZtHL._AC_UF894,1000_QL80_.jpg",
    },
    {
    id: 3,
    title: "Black Phone 2",
    year: 2025,
    user: "J",
    rating: "3.5",
    likes: "1,932",
    text: "A haunting sequel that dives deeper into the psychology of fear — thrilling and disturbing at once.",
    image:
      "https://m.media-amazon.com/images/I/91u5qUfxBVL._AC_UF894,1000_QL80_.jpg",
    },
  ]);

  const [newReview, setNewReview] = useState({
    title: "",
    user: "",
    text: "",
    rating: "",
    image: "",
  });

  const handleChange = (e) => {
    setNewReview({ ...newReview, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !newReview.title ||
      !newReview.user ||
      !newReview.text ||
      !newReview.rating ||
      !newReview.image
    ) {
      alert("Please fill all fields before submitting!");
      return;
    }

    const newEntry = {
      ...newReview,
      id: reviews.length + 1,
      year: 2025,
      likes: "0",
    };
    setReviews([newEntry, ...reviews]);
    setNewReview({ title: "", user: "", text: "", rating: "", image: "" });
  };

  return (
    <section className="reviews-section">
      <h2 className="reviews-heading">🌟 Popular Reviews This Week</h2>

      {/* Add Review Form */}
      <div className="add-review">
        <h3>Add Your Review</h3>
        <form className="review-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Movie Title"
            value={newReview.title}
            onChange={handleChange}
          />
          <input
            type="text"
            name="user"
            placeholder="Your Name"
            value={newReview.user}
            onChange={handleChange}
          />
          <input
            type="number"
            step="0.1"
            name="rating"
            placeholder="Rating (out of 5)"
            value={newReview.rating}
            onChange={handleChange}
          />
          <input
            type="text"
            name="image"
            placeholder="Poster Image URL"
            value={newReview.image}
            onChange={handleChange}
          />
          <textarea
            name="text"
            placeholder="Write your review..."
            value={newReview.text}
            onChange={handleChange}
          />
          <button type="submit">Post Review</button>
        </form>
      </div>

      {/* Reviews List */}
      <div className="reviews-container">
        {reviews.map((review) => (
          <div className="review-card" key={review.id}>
            <img
              src={review.image}
              alt={review.title}
              className="review-image"
            />
            <div className="review-content">
              <h3 className="review-title">{review.title}</h3>
              <p className="review-year">{review.year}</p>
              <p className="review-user">
                by <span>{review.user}</span>
              </p>
              <p className="review-text">{review.text}</p>
              <div className="review-footer">
                <span className="rating">⭐ {review.rating}</span>
                <span className="likes">❤️ {review.likes} likes</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ReviewsSection;
