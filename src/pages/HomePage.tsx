import { useState, useEffect } from 'react';
import Hero from '../sections/Hero';
import About from '../sections/About';
import Features from '../sections/Features';
import Mascot from '../sections/Mascot';
import Faq from '../sections/Faq';
import Sponsor from '../sections/Sponsor';

import { subscribeToReviews, type Review } from '../api/firebase';

const HomePage = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToReviews((reviewsData) => {
      setReviews(reviewsData);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <Hero reviews={reviews} loading={loading} />
      <About />
      <Features />
      <Mascot />
      <Faq />
      <Sponsor />
    </>
  );
};

export default HomePage;