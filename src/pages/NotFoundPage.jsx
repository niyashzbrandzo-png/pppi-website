import React from 'react';

export default function NotFoundPage({ setActivePage }) {
  return (
    <div style={{ paddingTop: '10rem', paddingBottom: '6rem', textAlign: 'center' }}>
      <div className="container" style={{ maxWidth: '600px' }}>
        <div style={{ fontSize: '6rem', fontWeight: '800', color: 'var(--color-royal-blue)', fontFamily: 'var(--font-display)', lineHeight: 1 }}>
          404
        </div>
        <h2 style={{ fontSize: '2rem', margin: '1rem 0', color: 'var(--color-navy)' }}>
          Page Not Found
        </h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
          The page or policy document you are looking for could not be found or has been relocated.
        </p>
        <button
          className="btn btn-primary btn-lg"
          onClick={() => { setActivePage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        >
          <i className="fa-solid fa-house"></i> Return to Home Page
        </button>
      </div>
    </div>
  );
}
