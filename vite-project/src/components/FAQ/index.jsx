import React, { useState } from 'react';
import './index.css';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const faqs = [
    { question: "How does EmotiFlix detect my mood?", answer: "You can select a mood manually or use our AI chat assistant for recommendations!" },
    { question: "Can I watch full movies here?", answer: "Currently, we provide trailers and info. Soon, full movies will be integrated." },
    { question: "Is EmotiFlix free?", answer: "Yes! It’s free for all movie lovers." },
    { question: "Who recommends these movies?", answer: "Our team curates them using real-time AI sentiment and trending analysis." },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleFAQ(index);
    }
  };

  return (
    <section className="faq-section" id="faq">
      <h2 className="faq-title">Frequently Asked Questions</h2>
      {faqs.map((faq, index) => (
        <div key={index} className="faq-item">
          <button 
            className="faq-question" 
            onClick={() => toggleFAQ(index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            aria-expanded={activeIndex === index}
            aria-controls={`faq-answer-${index}`}
          >
            {faq.question}
            <span className="faq-toggle">{activeIndex === index ? "−" : "+"}</span>
          </button>
          <div 
            id={`faq-answer-${index}`}
            className={`faq-answer ${activeIndex === index ? 'active' : ''}`}
          >
            {faq.answer}
          </div>
        </div>
      ))}
    </section>
  );
};

export default FAQ;
