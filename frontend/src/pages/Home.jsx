import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home-page">
      {/* Hero Header Section */}
      <section className="hero-section">
        <h1 className="hero-title">BorrowBox</h1>
        <p className="hero-subtitle">"Borrow what you need. Share what you have."</p>
        
        <p className="hero-description">
          BorrowBox is an academic item-sharing platform designed for college campus students. 
          Save money and reduce waste by sharing calculators, lab equipment, books, chargers, and project tools with fellow classmates.
        </p>

        <div className="hero-buttons">
          <Link to="/items" className="btn btn-primary">
            🔍 Browse Items
          </Link>
          <Link to="/add-item" className="btn btn-secondary">
            ➕ List an Item
          </Link>
        </div>
      </section>

      {/* Feature Cards Grid */}
      <section className="feature-grid">
        <div className="card feature-card">
          <div className="feature-icon">🤝</div>
          <h3>Share</h3>
          <p>List useful academic and daily items you are willing to lend to other students safely.</p>
        </div>

        <div className="card feature-card">
          <div className="feature-icon">📚</div>
          <h3>Borrow</h3>
          <p>Find books, lab coats, draughting tools, and electronics you need temporarily for class.</p>
        </div>

        <div className="card feature-card">
          <div className="feature-icon">💡</div>
          <h3>Save</h3>
          <p>Avoid unnecessary single-use purchases by sharing campus resources efficiently.</p>
        </div>
      </section>
    </div>
  );
}

export default Home;
