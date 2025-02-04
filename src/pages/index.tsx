// src/pages/index.tsx
import React from 'react';
import Header from '../components/Header/Header';
import HomeBody from '../components/Body/HomeBody';
import Footer from '../components/Footer/Footer';

const HomePage: React.FC = () => {
  return (
    <>
      <Header />
      <HomeBody />
      <Footer />
    </>
  );
};

export default HomePage;
