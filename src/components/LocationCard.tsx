import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Location } from '../types';
import { WeatherIcon } from './WeatherIcon';
import { ShadeDayTimeline } from './ShadeDayTimeline';
interface LocationCardProps {
  location: Location;
  isCompact?: boolean;
  onClick?: () => void;
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
  showShareButton?: boolean;
}
export function LocationCard({
  location,
  isCompact = false,
  onClick,
  isFavorite = false,
  onToggleFavorite,
  showShareButton = false
}: LocationCardProps) {
  const [showShareToast, setShowShareToast] = useState(false);
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
  const handleShare = async () => {
    const shareData = {
      title: `${location.name} — TreePatch`,
      text: `Check out ${location.name} on TreePatch! ${location.description}`,
      url: window.location.href
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(
          `${shareData.text}\n${shareData.url}`
        );
        setShowShareToast(true);
        setTimeout(() => setShowShareToast(false), 2500);
      }
    } catch {

      // User cancelled share
    }};
  const CardWrapper = motion.div;
  if (isCompact) {
    return (
      <CardWrapper
        whileHover={{
          scale: 1.02,
          y: -2
        }}
        whileTap={{
          scale: 0.98
        }}
        onClick={onClick}
        className="bg-cloud-white p-4 rounded-blob-2 border-2 border-earth-brown/15 shadow-warm cursor-pointer flex items-center gap-4">
        
        <div className="bg-leafy-green/20 p-2 rounded-full">
          <WeatherIcon type={getIconForType(location.type) as any} size="sm" />
        </div>
        <div className="flex-1">
          <h4 className="font-heading font-bold text-earth-brown text-lg leading-tight">
            {location.name}
          </h4>
          <p className="font-body text-sm font-semibold text-earth-brown/70 capitalize">
            {location.type.replace('-', ' ')} · {location.temperature}°F
          </p>
        </div>
        {onToggleFavorite &&
        <motion.button
          whileHover={{
            scale: 1.2
          }}
          whileTap={{
            scale: 0.8
          }}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(location.id);
          }}
          className="flex-shrink-0 p-1"
          aria-label={
          isFavorite ?
          `Remove ${location.name} from favorites` :
          `Add ${location.name} to favorites`
          }>
          
            <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill={isFavorite ? 'var(--sunset-orange)' : 'none'}
            stroke="var(--sunset-orange)"
            strokeWidth="2">
            
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </motion.button>
        }
      </CardWrapper>);

  }
  return (
    <CardWrapper
      initial={{
        opacity: 0,
        y: 50,
        rotate: -1
      }}
      animate={{
        opacity: 1,
        y: 0,
        rotate: 1
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 25
      }}
      className="bg-[#FAF7F2] p-6 sm:p-8 rounded-3xl border-2 border-earth-brown/20 shadow-warm-lg max-w-2xl w-full mx-auto relative overflow-hidden"
      style={{
        backgroundImage: `radial-gradient(rgba(141, 110, 99, 0.04) 1px, transparent 1px)`,
        backgroundSize: '10px 10px'
      }}>
      
      {/* Decorative corner tape */}
      <div className="absolute -top-4 -right-4 w-16 h-8 bg-sunshine-yellow/40 rotate-45 border border-earth-brown/10" />

      {/* Top row: badges + actions */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="bg-sky-blue/20 text-sky-blue px-3 py-1 rounded-full font-body text-xs font-bold uppercase tracking-wider border border-sky-blue/30">
              {location.type.replace('-', ' ')}
            </span>
            <span className="bg-sunshine-yellow/20 text-earth-brown px-3 py-1 rounded-full font-body text-xs font-bold flex items-center gap-1 border border-sunshine-yellow/30">
              <WeatherIcon type="sun" size="sm" className="w-3 h-3" />
              Best: {location.bestTime}
            </span>
            <span className="bg-sunset-orange/15 text-earth-brown px-3 py-1 rounded-full font-body text-xs font-bold flex items-center gap-1 border border-sunset-orange/30">
              🌡 {location.temperature}°F
            </span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-earth-brown leading-tight">
            {location.name}
          </h2>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0 ml-3">
          {/* Favorite button */}
          {onToggleFavorite &&
          <motion.button
            whileHover={{
              scale: 1.15
            }}
            whileTap={{
              scale: 0.85
            }}
            onClick={() => onToggleFavorite(location.id)}
            className="p-2.5 rounded-full bg-white/80 border border-earth-brown/10 shadow-warm hover:shadow-warm-lg transition-shadow"
            aria-label={
            isFavorite ?
            `Remove ${location.name} from favorites` :
            `Add ${location.name} to favorites`
            }>
            
              <motion.svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill={isFavorite ? 'var(--sunset-orange)' : 'none'}
              stroke="var(--sunset-orange)"
              strokeWidth="2"
              animate={
              isFavorite ?
              {
                scale: [1, 1.3, 1]
              } :
              {}
              }
              transition={{
                duration: 0.3
              }}>
              
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </motion.svg>
            </motion.button>
          }
          {/* Share button */}
          {showShareButton &&
          <motion.button
            whileHover={{
              scale: 1.15
            }}
            whileTap={{
              scale: 0.85
            }}
            onClick={handleShare}
            className="p-2.5 rounded-full bg-white/80 border border-earth-brown/10 shadow-warm hover:shadow-warm-lg transition-shadow"
            aria-label="Share this location">
            
              <svg
              className="w-6 h-6 text-sky-blue"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round">
              
                <circle cx="18" cy="5" r="3" />
                <circle cx="6" cy="12" r="3" />
                <circle cx="18" cy="19" r="3" />
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
              </svg>
            </motion.button>
          }
        </div>
      </div>

      <p className="font-body text-earth-brown/80 text-lg leading-relaxed mb-8 font-medium">
        {location.description}
      </p>

      {/* 24-Hour Shade Timeline */}
      <div className="mb-8">
        <ShadeDayTimeline hourlyShade={location.hourlyShade} />
      </div>

      {/* Nearby Places */}
      {location.nearbyPlaces && location.nearbyPlaces.length > 0 &&
      <div className="border-t-2 border-earth-brown/10 pt-6 mt-6">
          <h3 className="font-heading text-xl font-bold text-earth-brown mb-4 flex items-center gap-2">
            <WeatherIcon type="leaf" size="sm" />
            Nearby Play Patches
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {location.nearbyPlaces.map((place) =>
          <div
            key={place.id}
            className="flex items-center gap-3 bg-white/60 p-3 rounded-xl border border-earth-brown/10 hover:bg-white transition-colors cursor-pointer">
            
                <WeatherIcon
              type={getIconForType(place.type) as any}
              size="sm" />
            
                <span className="font-heading font-bold text-earth-brown">
                  {place.name}
                </span>
              </div>
          )}
          </div>
        </div>
      }

      {/* Share toast */}
      <AnimatePresence>
        {showShareToast &&
        <motion.div
          initial={{
            opacity: 0,
            y: 20
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          exit={{
            opacity: 0,
            y: 20
          }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-earth-brown text-cloud-white font-heading font-bold text-sm px-5 py-3 rounded-full shadow-warm-lg z-50">
          
            ✓ Link copied to clipboard!
          </motion.div>
        }
      </AnimatePresence>
    </CardWrapper>);

}