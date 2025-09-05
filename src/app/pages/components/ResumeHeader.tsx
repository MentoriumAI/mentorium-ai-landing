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
    <section className="resume-hero">
      <div className="colorful-accent" aria-hidden="true"></div>
      
      {/* Two column layout */}
      <div className="resume-hero-columns">
        {/* Left column - Content */}
        <div className="resume-hero-content">
          {/* Logo */}
          <img 
            src="/logo-no-bg.svg?v=3" 
            alt="Mentorium AI" 
            className="resume-hero-logo"
          />
          
          {/* Kicker */}
          <div className="resume-hero-kicker">Resume</div>
          
          {/* Name */}
          <div className="resume-hero-name">
            <h1>{name}</h1>
          </div>
          
          {/* Title */}
          <p className="resume-hero-title">{title}</p>
          
          {/* Tags */}
          {subtitle && (
            <div className="resume-hero-tags">
              {subtitle.split(' ⋅ ').map((tag, index) => (
                <span key={index} className="tag-chip">
                  {tag.trim()}
                </span>
              ))}
            </div>
          )}
          
          {/* Info Card */}
          <div className="resume-hero-info-card">
            <div className="info-card-row">
              <p><strong>Email:</strong> {email}</p>
              {phone && <p><strong>Teléfono:</strong> {phone}</p>}
            </div>
            <div className="info-card-row">
              <p><strong>LinkedIn:</strong> {linkedin}</p>
              {github && <p><strong>GitHub:</strong> {github}</p>}
            </div>
            <div className="info-card-row">
              <p><strong>Ubicación:</strong> {location}</p>
            </div>
          </div>
        </div>
        
        {/* Right column - Photo */}
        <div className="resume-hero-photo-section">
          <div className="resume-hero-photo">
            <FounderImage photoName={photoName} name={name} />
          </div>
        </div>
      </div>
    </section>
  );
}