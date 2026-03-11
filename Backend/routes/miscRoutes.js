import express from 'express';
import Contact from '../models/ContactModel.js';
import Newsletter from '../models/NewsletterModel.js';

const router = express.Router();

// POST /api/misc/contact
router.post('/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const newContact = new Contact({ name, email, message });
    await newContact.save();
    res.status(201).json({ message: 'Contact message received successfully' });
  } catch (error) {
    console.error('Contact error:', error);
    res.status(500).json({ error: 'Server error saving contact message' });
  }
});

// POST /api/misc/subscribe
router.post('/subscribe', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }
    // Check if already subscribed
    const existing = await Newsletter.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: 'Email is already subscribed' });
    }
    const newSubscriber = new Newsletter({ email });
    await newSubscriber.save();
    res.status(201).json({ message: 'Successfully subscribed' });
  } catch (error) {
    console.error('Subscribe error:', error);
    res.status(500).json({ error: 'Server error creating subscription' });
  }
});

export default router;
