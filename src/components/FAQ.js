import React, { useState } from 'react';
import './FAQ.scss';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What full stack development services do you offer?",
      answer: "I offer comprehensive full stack development services including React frontend development, Node.js backend development, database design with PostgreSQL/MongoDB, REST API development, AWS cloud deployment, and complete web application development from concept to production."
    },
    {
      question: "How much experience do you have with React and Node.js?",
      answer: "I have over 5 years of professional experience with React development and Node.js backend development. I'm Meta Frontend Developer certified and have built 20+ full stack applications using these technologies, including e-commerce platforms, task management systems, and business applications."
    },
    {
      question: "What is your typical web development project timeline?",
      answer: "Project timelines vary based on complexity. A simple React frontend typically takes 2-4 weeks, while a complete full stack web application with backend API and database can take 6-12 weeks. I provide detailed project estimates after understanding your specific requirements."
    },
    {
      question: "Do you work with startups and small businesses?",
      answer: "Yes! I work with startups, small businesses, and enterprises. I understand the unique needs of growing businesses and can scale solutions accordingly. Whether you need an MVP, a complete web platform, or ongoing development support, I can help."
    },
    {
      question: "What technologies do you specialize in for full stack development?",
      answer: "My core tech stack includes React, TypeScript, Node.js, Express.js, PostgreSQL, MongoDB, AWS, Docker, and modern development tools. I also work with Vue.js, Tailwind CSS, Supabase, and various other technologies based on project requirements."
    },
    {
      question: "How do you ensure web application security and performance?",
      answer: "I implement industry best practices including JWT authentication, input validation, SQL injection prevention, HTTPS encryption, performance optimization, code splitting, lazy loading, and comprehensive testing. All applications are built with security and scalability in mind."
    },
    {
      question: "Do you provide ongoing maintenance and support?",
      answer: "Yes, I offer ongoing maintenance, updates, bug fixes, and feature enhancements for web applications I develop. I also provide technical consulting and can help optimize existing applications for better performance and user experience."
    },
    {
      question: "Can you help migrate existing applications to modern technologies?",
      answer: "Absolutely! I can help migrate legacy applications to modern tech stacks like React, Node.js, and cloud platforms. This includes database migration, API modernization, frontend rebuilds, and ensuring minimal downtime during the transition."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-section">
      <div className="container">
        <h2 className="faq-title">Frequently Asked Questions</h2>
        <p className="faq-subtitle">
          Common questions about <strong>full stack development services</strong> and <strong>web development projects</strong>
        </p>
        
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div key={index} className={`faq-item ${openIndex === index ? 'active' : ''}`}>
              <button 
                className="faq-question"
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <h3>{faq.question}</h3>
                <span className="faq-icon">{openIndex === index ? '−' : '+'}</span>
              </button>
              <div 
                id={`faq-answer-${index}`}
                className="faq-answer"
                style={{ display: openIndex === index ? 'block' : 'none' }}
              >
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;