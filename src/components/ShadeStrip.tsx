import React, { Children } from 'react';
import { motion } from 'framer-motion';
import { ShadePeriod } from '../types';
import { WeatherIcon } from './WeatherIcon';
interface ShadeStripProps {
  periods: ShadePeriod[];
}
export function ShadeStrip({ periods }: ShadeStripProps) {
  const getShadeColor = (level: string) => {
    switch (level) {
      case 'full-sun':
        return 'bg-sunshine-yellow/40 border-sunshine-yellow';
      case 'light-sun':
        return 'bg-sunset-orange/30 border-sunset-orange';
      case 'partial-shade':
        return 'bg-leafy-green/30 border-leafy-green';
      case 'full-shade':
        return 'bg-leafy-green/60 border-leafy-green';
      default:
        return 'bg-cloud-white border-earth-brown/20';
    }
  };
  const getShadeIcon = (level: string) => {
    switch (level) {
      case 'full-sun':
        return 'full-sun';
      case 'light-sun':
        return 'light-sun';
      case 'partial-shade':
        return 'partial-shade';
      case 'full-shade':
        return 'full-shade';
      default:
        return 'sun';
    }
  };
  const containerVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };
  const itemVariants = {
    hidden: {
      opacity: 0,
      scaleX: 0,
      originX: 0
    },
    visible: {
      opacity: 1,
      scaleX: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  };
  return (
    <div className="w-full">
      <h3 className="font-heading text-lg font-bold text-earth-brown mb-3 flex items-center gap-2">
        <WeatherIcon type="sun" size="sm" />
        Daily Shade Forecast
      </h3>

      <motion.div
        className="flex flex-col sm:flex-row w-full rounded-2xl overflow-hidden border-2 border-earth-brown/20 shadow-warm-inner"
        variants={containerVariants}
        initial="hidden"
        animate="visible">
        
        {periods.map((period, index) =>
        <motion.div
          key={period.time}
          variants={itemVariants}
          className={`flex-1 p-3 border-b sm:border-b-0 sm:border-r last:border-0 border-earth-brown/20 ${getShadeColor(period.shadeLevel)} flex flex-row sm:flex-col items-center sm:justify-center gap-3 sm:gap-1`}>
          
            <div className="flex-shrink-0">
              <WeatherIcon
              type={getShadeIcon(period.shadeLevel) as any}
              size="md" />
            
            </div>
            <div className="flex flex-col sm:items-center text-left sm:text-center">
              <span className="font-heading font-bold text-earth-brown text-base leading-tight">
                {period.time}
              </span>
              <span className="font-body text-xs font-semibold text-earth-brown/80 leading-tight">
                {period.description}
              </span>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>);

}