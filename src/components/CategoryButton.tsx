import React from 'react';
import { motion } from 'framer-motion';
import { WeatherIcon, WeatherIconType } from './WeatherIcon';
interface CategoryButtonProps {
  icon: WeatherIconType;
  label: string;
  colorClass: string;
  blobType?: 1 | 2 | 3 | 4;
  onClick: () => void;
}
export function CategoryButton({
  icon,
  label,
  colorClass,
  blobType = 1,
  onClick
}: CategoryButtonProps) {
  const blobClasses = {
    1: 'rounded-blob-1',
    2: 'rounded-blob-2',
    3: 'rounded-blob-3',
    4: 'rounded-blob-4'
  };
  return (
    <motion.button
      onClick={onClick}
      whileHover={{
        scale: 1.05,
        y: -5
      }}
      whileTap={{
        scale: 0.95
      }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 17
      }}
      className={`flex flex-col items-center justify-center p-6 gap-3 w-full aspect-square ${colorClass} ${blobClasses[blobType]} shadow-warm hover:shadow-warm-lg transition-shadow border-2 border-earth-brown/10 focus:outline-none focus:ring-4 focus:ring-leafy-green/50`}>
      
      <motion.div
        initial={{
          rotate: 0
        }}
        whileHover={{
          rotate: [0, -10, 10, -5, 5, 0]
        }}
        transition={{
          duration: 0.5
        }}>
        
        <WeatherIcon type={icon} size="lg" />
      </motion.div>
      <span className="font-heading text-xl font-bold text-earth-brown text-center leading-tight">
        {label}
      </span>
    </motion.button>);

}