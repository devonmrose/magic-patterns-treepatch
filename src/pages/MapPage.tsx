import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageType, Location, SunExposure } from '../types';
import { LOCATIONS, getSunExposure } from '../data/locations';
import { TreePatchHeader } from '../components/TreePatchHeader';
import { StoryBookMap } from '../components/StoryBookMap';
import { LocationCard } from '../components/LocationCard';
import { WeatherIcon } from '../components/WeatherIcon';
import { FavoritesDrawer } from '../components/FavoritesDrawer';
interface MapPageProps {
  onNavigate: (page: PageType) => void;
  onSelectLocation: (location: Location) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}
type PlayspaceType =
'all' |
'playground' |
'park' |
'splash-pad' |
'court' |
'field' |
'skate';
export function MapPage({
  onNavigate,
  onSelectLocation,
  favorites,
  onToggleFavorite
}: MapPageProps) {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );
  const [activeType, setActiveType] = useState<PlayspaceType>('all');
  const [activeSunExposure, setActiveSunExposure] = useState<
    SunExposure | 'all'>(
    'all');
  const [showFavorites, setShowFavorites] = useState(false);
  const typeFilters: {
    id: PlayspaceType;
    label: string;
    icon: string;
  }[] = [
  {
    id: 'all',
    label: 'All',
    icon: 'sun'
  },
  {
    id: 'playground',
    label: 'Playgrounds',
    icon: 'treehouse'
  },
  {
    id: 'park',
    label: 'Parks',
    icon: 'leaf'
  },
  {
    id: 'splash-pad',
    label: 'Splash Pads',
    icon: 'water-splash'
  },
  {
    id: 'court',
    label: 'Courts',
    icon: 'court'
  },
  {
    id: 'field',
    label: 'Fields',
    icon: 'grassy-hill'
  },
  {
    id: 'skate',
    label: 'Skate',
    icon: 'skateboard'
  }];

  const sunFilters: {
    id: SunExposure | 'all';
    label: string;
    icon: string;
  }[] = [
  {
    id: 'all',
    label: 'Any Sun',
    icon: 'sun'
  },
  {
    id: 'full',
    label: 'Full Sun',
    icon: 'full-sun'
  },
  {
    id: 'partial',
    label: 'Partial',
    icon: 'partial-shade'
  },
  {
    id: 'none',
    label: 'Full Shade',
    icon: 'full-shade'
  }];

  const handleLocationClick = (location: Location) => {
    setSelectedLocation(location);
  };
  const handleViewDetails = () => {
    if (selectedLocation) {
      onSelectLocation(selectedLocation);
      onNavigate('detail');
    }
  };
  const handleFavoriteSelect = (location: Location) => {
    onSelectLocation(location);
    onNavigate('detail');
  };
  const filteredLocations = LOCATIONS.filter((loc) => {
    if (activeType !== 'all' && loc.type !== activeType) return false;
    if (
    activeSunExposure !== 'all' &&
    getSunExposure(loc) !== activeSunExposure)

    return false;
    return true;
  });
  return (
    <div className="h-screen w-full flex flex-col overflow-hidden bg-cloud-white relative">
      <TreePatchHeader currentPage="map" onNavigate={onNavigate} />

      {/* Filter Bar */}
      <div className="bg-white/80 backdrop-blur-md border-b-2 border-earth-brown/10 px-3 py-2.5 z-20 relative shadow-sm">
        {/* Type filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <span className="font-heading text-xs font-bold text-earth-brown/50 uppercase tracking-wider flex-shrink-0 mr-1">
            Type
          </span>
          {typeFilters.map((filter) =>
          <motion.button
            key={filter.id}
            whileHover={{
              scale: 1.05
            }}
            whileTap={{
              scale: 0.95
            }}
            onClick={() => setActiveType(filter.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-heading font-bold text-xs sm:text-sm border-2 transition-colors whitespace-nowrap flex-shrink-0 ${activeType === filter.id ? 'bg-leafy-green/20 border-leafy-green text-earth-brown' : 'bg-cloud-white border-earth-brown/10 text-earth-brown/60 hover:bg-white'}`}>
            
              <WeatherIcon type={filter.icon as any} size="sm" />
              {filter.label}
            </motion.button>
          )}
        </div>

        {/* Sun exposure filters + favorites button */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
          <span className="font-heading text-xs font-bold text-earth-brown/50 uppercase tracking-wider flex-shrink-0 mr-1">
            Sun
          </span>
          {sunFilters.map((filter) =>
          <motion.button
            key={filter.id}
            whileHover={{
              scale: 1.05
            }}
            whileTap={{
              scale: 0.95
            }}
            onClick={() => setActiveSunExposure(filter.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-heading font-bold text-xs sm:text-sm border-2 transition-colors whitespace-nowrap flex-shrink-0 ${activeSunExposure === filter.id ? 'bg-sunshine-yellow/25 border-sunshine-yellow text-earth-brown' : 'bg-cloud-white border-earth-brown/10 text-earth-brown/60 hover:bg-white'}`}>
            
              <WeatherIcon type={filter.icon as any} size="sm" />
              {filter.label}
            </motion.button>
          )}

          {/* Spacer */}
          <div className="flex-1" />

          {/* Favorites button */}
          <motion.button
            whileHover={{
              scale: 1.08
            }}
            whileTap={{
              scale: 0.92
            }}
            onClick={() => setShowFavorites(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full font-heading font-bold text-xs sm:text-sm border-2 border-sunset-orange/30 bg-sunset-orange/10 text-earth-brown hover:bg-sunset-orange/20 transition-colors whitespace-nowrap flex-shrink-0 relative">
            
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="var(--sunset-orange)"
              stroke="var(--sunset-orange)"
              strokeWidth="2">
              
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            Favorites
            {favorites.length > 0 &&
            <motion.span
              key={favorites.length}
              initial={{
                scale: 0
              }}
              animate={{
                scale: 1
              }}
              className="bg-sunset-orange text-white text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center min-w-[18px] min-h-[18px]">
              
                {favorites.length}
              </motion.span>
            }
          </motion.button>
        </div>
      </div>

      {/* Map Area */}
      <div className="flex-1 relative p-4 sm:p-6 overflow-hidden">
        <StoryBookMap
          locations={filteredLocations}
          onSelectLocation={handleLocationClick}
          selectedLocationId={selectedLocation?.id} />
        

        {/* No results message */}
        <AnimatePresence>
          {filteredLocations.length === 0 &&
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9
            }}
            animate={{
              opacity: 1,
              scale: 1
            }}
            exit={{
              opacity: 0,
              scale: 0.9
            }}
            className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
            
              <div className="bg-cloud-white/95 backdrop-blur-sm p-8 rounded-3xl border-2 border-earth-brown/15 shadow-warm-lg text-center max-w-xs">
                <div className="opacity-40 mb-3 flex justify-center">
                  <WeatherIcon type="cloud" size="xl" />
                </div>
                <p className="font-heading text-lg font-bold text-earth-brown/60">
                  No play spaces match these filters
                </p>
                <p className="font-body text-sm font-semibold text-earth-brown/40 mt-1">
                  Try adjusting your filters
                </p>
              </div>
            </motion.div>
          }
        </AnimatePresence>

        {/* Bottom Sheet for Selected Location */}
        <AnimatePresence>
          {selectedLocation &&
          <motion.div
            initial={{
              y: '100%',
              opacity: 0
            }}
            animate={{
              y: 0,
              opacity: 1
            }}
            exit={{
              y: '100%',
              opacity: 0
            }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 25
            }}
            className="absolute bottom-4 sm:bottom-8 left-4 right-4 sm:left-auto sm:right-8 sm:w-96 z-30">
            
              <div className="relative">
                {/* Close button */}
                <button
                onClick={() => setSelectedLocation(null)}
                className="absolute -top-3 -right-3 z-40 bg-white rounded-full p-1 shadow-warm border-2 border-earth-brown/20 hover:bg-cloud-white"
                aria-label="Close details">
                
                  <svg
                  className="w-6 h-6 text-earth-brown"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M6 18L18 6M6 6l12 12" />
                  
                  </svg>
                </button>

                <div
                onClick={handleViewDetails}
                className="cursor-pointer group">
                
                  <LocationCard
                  location={selectedLocation}
                  isCompact={true}
                  isFavorite={favorites.includes(selectedLocation.id)}
                  onToggleFavorite={onToggleFavorite} />
                
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-sunshine-yellow text-earth-brown font-heading font-bold text-sm px-4 py-1 rounded-full shadow-warm border-2 border-earth-brown/20 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:-translate-y-1">
                    View Full Guide
                  </div>
                </div>
              </div>
            </motion.div>
          }
        </AnimatePresence>
      </div>

      {/* Favorites Drawer */}
      <FavoritesDrawer
        isOpen={showFavorites}
        onClose={() => setShowFavorites(false)}
        favorites={favorites}
        locations={LOCATIONS}
        onSelectLocation={handleFavoriteSelect}
        onToggleFavorite={onToggleFavorite} />
      
    </div>);

}