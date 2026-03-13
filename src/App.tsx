import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { PageType, Location } from './types';
import { HomePage } from './pages/HomePage';
import { MapPage } from './pages/MapPage';
import { LocationDetailPage } from './pages/LocationDetailPage';
export function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );
  const [favorites, setFavorites] = useState<string[]>([]);
  const handleNavigate = (page: PageType) => {
    setCurrentPage(page);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  const handleSelectLocation = (location: Location) => {
    setSelectedLocation(location);
  };
  const handleToggleFavorite = (id: string) => {
    setFavorites((prev) =>
    prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };
  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20
    },
    in: {
      opacity: 1,
      y: 0
    },
    out: {
      opacity: 0,
      y: -20
    }
  };
  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.4
  };
  return (
    <div className="w-full min-h-screen bg-cloud-white text-earth-brown font-body overflow-hidden">
      <AnimatePresence mode="wait">
        {currentPage === 'home' &&
        <motion.div
          key="home"
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
          className="w-full h-full">
          
            <HomePage onNavigate={handleNavigate} />
          </motion.div>
        }

        {currentPage === 'map' &&
        <motion.div
          key="map"
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
          className="w-full h-full">
          
            <MapPage
            onNavigate={handleNavigate}
            onSelectLocation={handleSelectLocation}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite} />
          
          </motion.div>
        }

        {currentPage === 'detail' &&
        <motion.div
          key="detail"
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
          className="w-full h-full">
          
            <LocationDetailPage
            location={selectedLocation}
            onNavigate={handleNavigate}
            isFavorite={
            selectedLocation ?
            favorites.includes(selectedLocation.id) :
            false
            }
            onToggleFavorite={handleToggleFavorite} />
          
          </motion.div>
        }
      </AnimatePresence>
    </div>);

}