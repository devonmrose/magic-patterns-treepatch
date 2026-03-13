import React from 'react';
import { motion } from 'framer-motion';
import { WeatherIcon } from './WeatherIcon';
import { PageType } from '../types';
interface TreePatchHeaderProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
}
export function TreePatchHeader({
  currentPage,
  onNavigate
}: TreePatchHeaderProps) {
  return (
    <header className="relative z-10 w-full px-6 py-4 flex items-center justify-between bg-cloud-white/80 backdrop-blur-sm border-b-2 border-earth-brown/10">
      <motion.div
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => onNavigate('home')}
        whileHover={{
          scale: 1.02
        }}
        whileTap={{
          scale: 0.98
        }}>
        
        <motion.div
          initial={{
            rotate: -5
          }}
          animate={{
            rotate: 5
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut'
          }}>
          
          <WeatherIcon type="tree-canopy" size="md" />
        </motion.div>
        <div>
          <h1 className="font-heading text-3xl font-bold text-leafy-green leading-none tracking-wide">
            TreePatch
          </h1>
          <p className="font-body text-sm font-semibold text-earth-brown/70 leading-none mt-1">
            Find shaded outdoor play spaces
          </p>
        </div>
      </motion.div>

      <nav className="flex items-center gap-2">
        <motion.button
          whileHover={{
            scale: 1.1,
            rotate: -5
          }}
          whileTap={{
            scale: 0.9
          }}
          onClick={() => onNavigate('home')}
          className={`p-2 rounded-blob-1 transition-colors ${currentPage === 'home' ? 'bg-sunshine-yellow/30' : 'hover:bg-earth-brown/5'}`}
          aria-label="Home">
          
          <WeatherIcon type="treehouse" size="sm" />
        </motion.button>
        <motion.button
          whileHover={{
            scale: 1.1,
            rotate: 5
          }}
          whileTap={{
            scale: 0.9
          }}
          onClick={() => onNavigate('map')}
          className={`p-2 rounded-blob-2 transition-colors ${currentPage === 'map' ? 'bg-leafy-green/30' : 'hover:bg-earth-brown/5'}`}
          aria-label="Map">
          
          <WeatherIcon type="leaf" size="sm" />
        </motion.button>
      </nav>
    </header>);

}