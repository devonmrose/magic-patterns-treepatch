import React, { Children } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Location } from '../types';
import { WeatherIcon } from './WeatherIcon';
interface FavoritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: string[];
  locations: Location[];
  onSelectLocation: (location: Location) => void;
  onToggleFavorite: (id: string) => void;
}
export function FavoritesDrawer({
  isOpen,
  onClose,
  favorites,
  locations,
  onSelectLocation,
  onToggleFavorite
}: FavoritesDrawerProps) {
  const favoriteLocations = locations.filter((loc) =>
  favorites.includes(loc.id)
  );
  const getIconForType = (type: string) => {
    switch (type) {
      case 'playground':
        return 'treehouse';
      case 'park':
        return 'leaf';
      case 'splash-pad':
        return 'water-splash';
      case 'court':
        return 'court';
      case 'field':
        return 'grassy-hill';
      case 'skate':
        return 'skateboard';
      default:
        return 'sun';
    }
  };
  return (
    <AnimatePresence>
      {isOpen &&
      <>
          {/* Backdrop */}
          <motion.div
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          exit={{
            opacity: 0
          }}
          transition={{
            duration: 0.2
          }}
          className="fixed inset-0 bg-earth-brown/30 backdrop-blur-sm z-40"
          onClick={onClose} />
        

          {/* Drawer */}
          <motion.div
          initial={{
            x: '100%'
          }}
          animate={{
            x: 0
          }}
          exit={{
            x: '100%'
          }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 30
          }}
          className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-cloud-white z-50 shadow-warm-lg flex flex-col border-l-2 border-earth-brown/15">
          
            {/* Header */}
            <div className="p-5 border-b-2 border-earth-brown/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <motion.div
                animate={{
                  scale: [1, 1.15, 1]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity
                }}>
                
                  <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="var(--sunset-orange)"
                  stroke="var(--sunset-orange)"
                  strokeWidth="2">
                  
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </motion.div>
                <h2 className="font-heading text-2xl font-bold text-earth-brown">
                  My Favorites
                </h2>
              </div>
              <motion.button
              whileHover={{
                scale: 1.1,
                rotate: 90
              }}
              whileTap={{
                scale: 0.9
              }}
              onClick={onClose}
              className="p-2 rounded-full hover:bg-earth-brown/5 transition-colors"
              aria-label="Close favorites">
              
                <svg
                className="w-6 h-6 text-earth-brown"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}>
                
                  <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12" />
                
                </svg>
              </motion.button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4">
              {favoriteLocations.length === 0 ?
            <motion.div
              initial={{
                opacity: 0,
                y: 20
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              className="flex flex-col items-center justify-center h-full text-center px-6 py-12">
              
                  <div className="opacity-30 mb-4">
                    <WeatherIcon type="leaf" size="xl" />
                  </div>
                  <p className="font-heading text-xl font-bold text-earth-brown/50 mb-2">
                    No favorites yet
                  </p>
                  <p className="font-body text-sm font-semibold text-earth-brown/40">
                    Tap the heart on any play space to save it here!
                  </p>
                </motion.div> :

            <motion.div
              className="space-y-3"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {
                  opacity: 0
                },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.08
                  }
                }
              }}>
              
                  {favoriteLocations.map((loc) =>
              <motion.div
                key={loc.id}
                variants={{
                  hidden: {
                    opacity: 0,
                    x: 30
                  },
                  visible: {
                    opacity: 1,
                    x: 0,
                    transition: {
                      type: 'spring',
                      stiffness: 300,
                      damping: 20
                    }
                  }
                }}
                className="flex items-center gap-3 bg-white/80 p-3 rounded-2xl border-2 border-earth-brown/10 shadow-warm cursor-pointer group"
                onClick={() => {
                  onSelectLocation(loc);
                  onClose();
                }}>
                
                      <div className="bg-leafy-green/15 p-2 rounded-blob-1 flex-shrink-0">
                        <WeatherIcon
                    type={getIconForType(loc.type) as any}
                    size="sm" />
                  
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-heading font-bold text-earth-brown text-base leading-tight truncate">
                          {loc.name}
                        </h4>
                        <p className="font-body text-xs font-semibold text-earth-brown/60 capitalize">
                          {loc.type.replace('-', ' ')} · {loc.temperature}°F
                        </p>
                      </div>
                      <motion.button
                  whileHover={{
                    scale: 1.2
                  }}
                  whileTap={{
                    scale: 0.8
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(loc.id);
                  }}
                  className="flex-shrink-0 p-1.5 rounded-full hover:bg-sunset-orange/10 transition-colors"
                  aria-label={`Remove ${loc.name} from favorites`}>
                  
                        <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="var(--sunset-orange)"
                    stroke="var(--sunset-orange)"
                    strokeWidth="2">
                    
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                      </motion.button>
                    </motion.div>
              )}
                </motion.div>
            }
            </div>

            {/* Footer */}
            {favoriteLocations.length > 0 &&
          <div className="p-4 border-t-2 border-earth-brown/10">
                <p className="font-body text-xs font-semibold text-earth-brown/40 text-center">
                  {favoriteLocations.length} favorite
                  {favoriteLocations.length !== 1 ? 's' : ''} saved
                </p>
              </div>
          }
          </motion.div>
        </>
      }
    </AnimatePresence>);

}