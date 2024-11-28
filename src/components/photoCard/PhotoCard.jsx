import React, { forwardRef } from 'react';
import './photoCard.css';

const PhotoCard = forwardRef(({ photo }, ref) => {
  return (
    <div className="photo-card" aria-labelledby={`photo-${photo.id}`} ref={ref}>
      <div className="image-container">
        <img
          src={photo.urls.small}
          alt={photo.alt_description || 'A photo from Unsplash'}
          className="photo-image"
          loading="lazy"  
          aria-hidden="true" 
        />
        <div className="image-overlay">
          <p>{photo.alt_description || 'Photo from Unsplash'}</p>
        </div>
      </div>
      <div className="photo-details">
        <p id={`photo-${photo.id}`} className="photographer-name">
          By: {photo.user.name || 'Unknown'}
        </p>
      </div>
    </div>
  );
});

export default PhotoCard;
