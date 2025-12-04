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

  return (
    <section className="faq-section">
      <h2 className="faq-title">Frequently Asked Questions</h2>
      {faqs.map((faq, index) => (
        <div key={index} className="faq-item">
          <h3 className="faq-question" onClick={() => toggleFAQ(index)}>
            {faq.question}
            <span>{activeIndex === index ? "−" : "+"}</span>
          </h3>
          {activeIndex === index && <p className="faq-answer">{faq.answer}</p>}
        </div>
      ))}
    </section>
  );
};

export default FAQ;
