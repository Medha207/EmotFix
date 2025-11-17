import mongoose from 'mongoose';

const MovieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  mood: { type: String, required: true }, // e.g. 'happy', 'sad'
  overview: { type: String },
  poster: { type: String },      // poster image URL
  trailerUrl: { type: String },  // full YouTube URL or id
  genres: [{ type: String }],
  releaseDate: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export const MovieModel =  mongoose.model('Movie', MovieSchema);
export default MovieModel;