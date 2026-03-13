import React from 'react';
import { motion } from 'framer-motion';
import { Location } from '../types';
import { WeatherIcon } from './WeatherIcon';
interface StoryBookMapProps {
  locations: Location[];
  onSelectLocation: (location: Location) => void;
  selectedLocationId?: string;
}
export function StoryBookMap({
  locations,
  onSelectLocation,
  selectedLocationId
}: StoryBookMapProps) {
  // Decorative background elements
  const decorations = [
  {
    type: 'cloud',
    x: 10,
    y: 15,
    size: 'lg',
    opacity: 0.4
  },
  {
    type: 'cloud',
    x: 80,
    y: 10,
    size: 'xl',
    opacity: 0.3
  },
  {
    type: 'cloud',
    x: 60,
    y: 85,
    size: 'lg',
    opacity: 0.5
  },
  {
    type: 'tree-canopy',
    x: 15,
    y: 75,
    size: 'xl',
    opacity: 0.15
  },
  {
    type: 'tree-canopy',
    x: 85,
    y: 40,
    size: 'xl',
    opacity: 0.15
  },
  {
    type: 'leaf',
    x: 40,
    y: 30,
    size: 'md',
    opacity: 0.2
  },
  {
    type: 'wind',
    x: 70,
    y: 60,
    size: 'lg',
    opacity: 0.2
  }];

  return (
    <div className="relative w-full h-full min-h-[600px] bg-[#E8F4F8] rounded-3xl border-4 border-earth-brown/20 overflow-hidden shadow-warm-inner">
      {/* Watercolor-like background gradient */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
          'radial-gradient(circle at 30% 30%, var(--leafy-green) 0%, transparent 40%), radial-gradient(circle at 70% 60%, var(--sky-blue) 0%, transparent 50%), radial-gradient(circle at 50% 80%, var(--sunshine-yellow) 0%, transparent 40%)',
          filter: 'blur(40px)'
        }} />
      

      {/* Decorative elements */}
      {decorations.map((dec, i) =>
      <div
        key={`dec-${i}`}
        className="absolute pointer-events-none"
        style={{
          left: `${dec.x}%`,
          top: `${dec.y}%`,
          opacity: dec.opacity
        }}>
        
          <WeatherIcon type={dec.type as any} size={dec.size as any} />
        </div>
      )}

      {/* Winding path SVG */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
        preserveAspectRatio="none">
        
        <path
          d="M 0,50 Q 20,30 40,50 T 80,40 T 100,60"
          fill="none"
          stroke="var(--earth-brown)"
          strokeWidth="4"
          strokeDasharray="10, 15"
          strokeLinecap="round" />
        
        <path
          d="M 20,100 Q 30,70 50,60 T 90,80"
          fill="none"
          stroke="var(--earth-brown)"
          strokeWidth="4"
          strokeDasharray="10, 15"
          strokeLinecap="round" />
        
      </svg>

      {/* Location Markers */}
      {locations.map((location, index) => {
        const isSelected = selectedLocationId === location.id;
        return (
          <motion.div
            key={location.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
            style={{
              left: `${location.coordinates.x}%`,
              top: `${location.coordinates.y}%`
            }}
            initial={{
              scale: 0,
              y: 20
            }}
            animate={{
              scale: 1,
              y: 0
            }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 15,
              delay: index * 0.1
            }}
            onClick={() => onSelectLocation(location)}
            whileHover={{
              scale: 1.1,
              zIndex: 20
            }}
            whileTap={{
              scale: 0.9
            }}>
            
            <div className="relative group flex flex-col items-center">
              {/* Tooltip */}
              <div
                className={`absolute bottom-full mb-2 bg-cloud-white px-3 py-1.5 rounded-xl border-2 border-earth-brown/20 shadow-warm whitespace-nowrap transition-opacity duration-200 ${isSelected ? 'opacity-100 z-30' : 'opacity-0 group-hover:opacity-100'}`}>
                
                <span className="font-heading font-bold text-earth-brown text-sm">
                  {location.name}
                </span>
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-earth-brown/20"></div>
              </div>

              {/* Marker Icon */}
              <div
                className={`relative p-2 rounded-blob-1 transition-all duration-300 ${isSelected ? 'bg-sunshine-yellow shadow-warm-lg scale-110 border-2 border-earth-brown' : 'bg-white/80 shadow-warm border-2 border-earth-brown/20 hover:bg-white'}`}>
                
                {location.shadeRating >= 4 ?
                <WeatherIcon type="tree-canopy" size="md" /> :
                location.shadeRating <= 2 ?
                <WeatherIcon type="sun" size="md" /> :

                <WeatherIcon type="partial-shade" size="md" />
                }

                {/* Pulse ring for selected */}
                {isSelected &&
                <motion.div
                  className="absolute inset-0 rounded-blob-1 border-4 border-sunshine-yellow"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.8, 0, 0.8]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity
                  }} />

                }
              </div>
            </div>
          </motion.div>);

      })}
    </div>);

}