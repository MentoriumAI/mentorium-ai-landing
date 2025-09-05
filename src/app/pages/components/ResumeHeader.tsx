import React from 'react';
import FounderImage from './FounderImage';

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
    <section className="hero colorful-header">
      <div className="colorful-accent" aria-hidden="true"></div>
      
      {/* Two column layout */}
      <div className="header-columns">
        {/* Left column - Content */}
        <div className="header-content">
          <img 
            src="/logo.svg?v=3" 
            alt="Mentorium AI" 
            className="hero-logo"
          />
          
          <div className="kicker">Currículum</div>
          <div className="title">
            <h1>{name}</h1>
          </div>
          <p className="byline">{title}</p>
          {subtitle && (
            <p className="highlight subtitle-highlight">
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
        </div>
        
        {/* Right column - Photo */}
        <div className="header-photo-section">
          <div className="founder-photo-large">
            <FounderImage photoName={photoName} name={name} />
          </div>
        </div>
      </div>
    </section>
  );
}