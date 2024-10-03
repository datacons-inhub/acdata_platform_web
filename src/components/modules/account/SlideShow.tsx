import React, { useState, useEffect } from 'react';

const images = [
  { src: '@assets/images/body/datos_conectados.png', alt: 'Image 1' },
  { src: '@assets/images/body/maximizar_eficiencia.png', alt: 'Image 2' },
  { src: '@assets/images/body/datos_conectados.png', alt: 'Image 3' },
  { src: '@assets/images/body/maximizar_eficiencia.png', alt: 'Image 4' },
];

const ImageSlider = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000); // Cambia cada 3 segundos
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="image-slider">
      <img src={images[currentImage].src} alt={images[currentImage].alt} />
    </div>
  );
}

export default ImageSlider;
