import React from 'react';

export function TrailieLogo({ className = '', ...props }: React.ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <img
      src="/trailie-logo.png"
      alt="Trailie Logo"
      className={`object-contain rounded-lg ${className}`}
      {...props}
    />
  );
} 