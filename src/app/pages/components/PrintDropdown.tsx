'use client';

import React, { useState, useRef, useEffect } from 'react';
import { printSinglePage, printMultiplePages } from './printUtils';

export default function PrintDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSinglePage = () => {
    setIsOpen(false);
    printSinglePage();
  };

  const handleMultiplePages = () => {
    setIsOpen(false);
    printMultiplePages();
  };

  return (
    <div className="print-dropdown" ref={dropdownRef}>
      <button 
        className="print-dropdown-trigger"
        onClick={handleToggle}
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        Exportar a PDF
        <span className={`dropdown-arrow ${isOpen ? 'open' : ''}`}>▼</span>
      </button>
      
      {isOpen && (
        <div className="print-dropdown-menu">
          <button 
            className="print-dropdown-item"
            onClick={handleSinglePage}
            type="button"
          >
            Una sola página
          </button>
          <button 
            className="print-dropdown-item"
            onClick={handleMultiplePages}
            type="button"
          >
            Múltiples páginas
          </button>
        </div>
      )}
    </div>
  );
}