import React from 'react';
import { motion } from 'framer-motion';
import { WeatherIcon } from './WeatherIcon';
export function CloudBackground() {
  // Generate random clouds that will drift across the screen
  const clouds = [
  {
    id: 1,
    top: '10%',
    size: 'xl' as const,
    duration: 45,
    delay: 0,
    opacity: 0.6
  },
  {
    id: 2,
    top: '30%',
    size: 'lg' as const,
    duration: 35,
    delay: -10,
    opacity: 0.4
  },
  {
    id: 3,
    top: '60%',
    size: 'xl' as const,
    duration: 50,
    delay: -25,
    opacity: 0.5
  },
  {
    id: 4,
    top: '80%',
    size: 'md' as const,
    duration: 30,
    delay: -5,
    opacity: 0.3
  },
  {
    id: 5,
    top: '15%',
    size: 'lg' as const,
    duration: 40,
    delay: -20,
    opacity: 0.7
  }];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {clouds.map((cloud) =>
      <motion.div
        key={cloud.id}
        className="absolute"
        style={{
          top: cloud.top,
          opacity: cloud.opacity
        }}
        initial={{
          x: '-20vw'
        }}
        animate={{
          x: '120vw'
        }}
        transition={{
          duration: cloud.duration,
          repeat: Infinity,
          ease: 'linear',
          delay: cloud.delay
        }}>
        
          <WeatherIcon
          type="cloud"
          size={cloud.size}
          color="var(--cloud-white)" />
        
        </motion.div>
      )}
    </div>);

}