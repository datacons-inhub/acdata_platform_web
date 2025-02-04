// src/components/SlideShow/SlideShow.tsx
import React, { useState, useEffect } from 'react';
import styles from './SlideShow.module.css';

interface SlideShowProps {
  images: string[];
}

const SlideShow: React.FC<SlideShowProps> = ({ images }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images]);

  return (
    <div className={styles.slideShow}>
      <img src={images[current]} alt="slide" className={styles.image}/>
    </div>
  );
};

export default SlideShow;
