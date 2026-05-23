import { useState, useEffect } from 'react';
import { collection, getDocs, query, limit } from 'firebase/firestore';
import { db } from '../services/firebase';

// Import newly refactored modular components
import { HeroSlider } from '../components/home/HeroSlider';
import { QuietLuxury } from '../components/home/QuietLuxury';
import { FeaturedSection } from '../components/home/FeaturedSection';
import { Newsletter } from '../components/home/Newsletter';

const Home = () => {
          const [featuredProducts, setFeaturedProducts] = useState([]);
          const [heroSlides, setHeroSlides] = useState([]);
          const [loading, setLoading] = useState(true);

          useEffect(() => {
                    const fetchHero = async () => {
                              const snap = await getDocs(collection(db, "hero"));
                              setHeroSlides(snap.docs.map(d => d.data()));
                    };
                    fetchHero();
          }, []);

          useEffect(() => {
                    const fetchFeatured = async () => {
                              try {
                                        const q = query(collection(db, "products"), limit(8));
                                        const querySnapshot = await getDocs(q);
                                        const products = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                                        setFeaturedProducts(products);
                              } catch (error) {
                                        console.error("Error fetching featured products:", error);
                              } finally {
                                        setLoading(false);
                              }
                    };
                    fetchFeatured();
          }, []);

          return (
                    <main className="overflow-x-hidden">
                              <HeroSlider slides={heroSlides} />
                              <QuietLuxury />
                              <FeaturedSection products={featuredProducts} loading={loading} />
                              <Newsletter />
                    </main>
          );
};

export default Home;