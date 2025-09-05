import React from 'react';

export type ResumeHeaderProps = {
  name: string;
  title: string;
  subtitle?: string;
  email: string;
  phone?: string;
  linkedin: string;
  github?: string;
  location: string;
  photoName: string; // e.g., "moshe.jpg", "silvia.jpg", etc.
};

export default function ResumeHeader({
  name,
  title,
  subtitle,
  email,
  phone,
  linkedin,
  github,
  location,
  photoName
}: ResumeHeaderProps) {
  return (
    <section className="hero">
      <div className="accent" aria-hidden="true"></div>
      
      {/* Header with logo and photo */}
      <div className="resume-header-top">
        <img 
          src="/logo.svg?v=3" 
          alt="Mentorium AI" 
          className="hero-logo"
        />
        <div className="founder-photo">
          <img 
            src={`/people/${photoName}`}
            alt={name}
            className="founder-image"
            onError={(e) => {
              // Hide image if not found
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>
      </div>
      
      <div className="kicker">Currículum</div>
      <div className="title">
        <h1>{name}</h1>
      </div>
      <p className="byline">{title}</p>
      {subtitle && (
        <p className="highlight" style={{ textAlign: 'center', margin: '1rem 0', fontStyle: 'italic' }}>
          {subtitle}
        </p>
      )}
      
      <div className="contact-info">
        <div className="contact-row">
          <p><strong>Email:</strong> {email}</p>
          {phone && <p><strong>Teléfono:</strong> {phone}</p>}
        </div>
        <div className="contact-row">
          <p><strong>LinkedIn:</strong> {linkedin}</p>
          {github && <p><strong>GitHub:</strong> {github}</p>}
        </div>
        <div className="contact-row">
          <p><strong>Ubicación:</strong> {location}</p>
        </div>
      </div>
    </section>
  );
}