import express from 'express';
import {MovieModel} from '../models/MovieModel.js';
// import { auth } from '../middleware/auth.js';


// GET /api/movies?mood=happy
export async function getMovies(req, res) {
  try {
    const mood = (req.query.mood || '').toLowerCase();
    const query = mood ? { mood } : {};
    const movies = await MovieModel.find(query).sort({ createdAt: -1 }).lean();
    res.json(movies);
  } catch (err) {
    console.error("getMovies error:", err);
    res.status(500).json({ error: 'Server error' });
  }
};

// GET /api/movies/:id
export async function getMoviesById(req, res) {
  try {
    const {id} = req.params
    const movie = await MovieModel.findById(id).lean();
    if (!movie) return res.status(404).json({ error: 'Not found' });
    res.json(movie);
  } catch (err) {
    console.error("getMoviesById error:", err);
    res.status(500).json({ error: 'Server error' });
  }
};

// POST /api/movies  (protected)
export async function createMovies(req, res) {
  try {
    const { title, mood, overview, poster, trailerUrl, genres, releaseDate } = req.body;
    const movie = new MovieModel({ title, mood, overview, poster, trailerUrl, genres, releaseDate });
    await movie.save();
    res.status(201).json(movie);
  } catch (err) {
    console.error("createMovies error:", err);
    res.status(400).json({ error: 'Bad data', details: err.message });
  }
};

// PUT /api/movies/:id  (protected)
export async function updateMoviesById(req, res) {
  try {
    const {id} = req.params
    const updated = await MovieModel.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    console.error("updateMoviesById error:", err);
    res.status(400).json({ error: 'Bad request' });
  }
};

// DELETE /api/movies/:id (protected)
export async function deleteMoviesById(req, res) {
  try {
    const {id} = req.params 
    const deleted = await MovieModel.findByIdAndDelete(id);
    res.json({ success: true });
  } catch (err) {
    console.error("deleteMoviesById error:", err);
    res.status(500).json({ error: 'Server error' });
  }
};

