import React from 'react';
import { motion } from 'framer-motion';
import { PageType, Location } from '../types';
import { TreePatchHeader } from '../components/TreePatchHeader';
import { LocationCard } from '../components/LocationCard';
import { WeatherIcon } from '../components/WeatherIcon';
import { CloudBackground } from '../components/CloudBackground';
interface LocationDetailPageProps {
  location: Location | null;
  onNavigate: (page: PageType) => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}
export function LocationDetailPage({
  location,
  onNavigate,
  isFavorite,
  onToggleFavorite
}: LocationDetailPageProps) {
  if (!location) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>
          Location not found.{' '}
          <button
            onClick={() => onNavigate('map')}
            className="text-leafy-green underline">
            
            Go back
          </button>
        </p>
      </div>);

  }
  return (
    <div className="min-h-screen w-full relative overflow-x-hidden flex flex-col bg-cloud-white">
      <CloudBackground />
      <TreePatchHeader currentPage="detail" onNavigate={onNavigate} />

      <main className="flex-1 relative z-10 px-4 py-8 sm:py-12 max-w-4xl mx-auto w-full">
        <motion.button
          initial={{
            opacity: 0,
            x: -20
          }}
          animate={{
            opacity: 1,
            x: 0
          }}
          onClick={() => onNavigate('map')}
          className="flex items-center gap-2 text-earth-brown/80 hover:text-earth-brown font-heading font-bold text-lg mb-6 group">
          
          <motion.div
            whileHover={{
              x: -5
            }}
            transition={{
              type: 'spring'
            }}>
            
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}>
              
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              
            </svg>
          </motion.div>
          Back to Map
        </motion.button>

        <LocationCard
          location={location}
          isFavorite={isFavorite}
          onToggleFavorite={onToggleFavorite}
          showShareButton={true} />
        

        {/* Decorative footer elements */}
        <div className="mt-16 flex justify-center gap-8 opacity-40">
          <WeatherIcon type="leaf" size="md" />
          <WeatherIcon type="tree-canopy" size="lg" />
          <WeatherIcon
            type="leaf"
            size="md"
            className="transform scale-x-[-1]" />
          
        </div>
      </main>
    </div>);

}