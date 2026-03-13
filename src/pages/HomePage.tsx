import React, { Children } from 'react';
import { motion } from 'framer-motion';
import { PageType } from '../types';
import { TreePatchHeader } from '../components/TreePatchHeader';
import { CloudBackground } from '../components/CloudBackground';
import { CategoryButton } from '../components/CategoryButton';
import { WeatherIcon } from '../components/WeatherIcon';
interface HomePageProps {
  onNavigate: (page: PageType) => void;
}
export function HomePage({ onNavigate }: HomePageProps) {
  const categories = [
  {
    id: 'playgrounds',
    label: 'Playgrounds',
    icon: 'treehouse',
    color: 'bg-leafy-green/20',
    blob: 1
  },
  {
    id: 'parks',
    label: 'Parks',
    icon: 'leaf',
    color: 'bg-breezy-teal/20',
    blob: 2
  },
  {
    id: 'splash',
    label: 'Splash Pads',
    icon: 'water-splash',
    color: 'bg-sky-blue/20',
    blob: 3
  },
  {
    id: 'basketball',
    label: 'Basketball',
    icon: 'court',
    color: 'bg-sunset-orange/20',
    blob: 4
  },
  {
    id: 'tennis',
    label: 'Tennis Courts',
    icon: 'court',
    color: 'bg-sunshine-yellow/30',
    blob: 1
  },
  {
    id: 'soccer',
    label: 'Soccer Fields',
    icon: 'grassy-hill',
    color: 'bg-leafy-green/30',
    blob: 2
  },
  {
    id: 'skate',
    label: 'Skate Parks',
    icon: 'skateboard',
    color: 'bg-earth-brown/10',
    blob: 3
  },
  {
    id: 'all',
    label: 'View All',
    icon: 'sun',
    color: 'bg-sunshine-yellow/40',
    blob: 4
  }];

  const containerVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20
      }
    }
  };
  return (
    <div className="min-h-screen w-full relative overflow-x-hidden flex flex-col">
      <CloudBackground />
      <TreePatchHeader currentPage="home" onNavigate={onNavigate} />

      <main className="flex-1 relative z-10 flex flex-col items-center px-4 pt-8 pb-24 sm:pt-16 max-w-6xl mx-auto w-full">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-12 sm:mb-16 relative"
          initial={{
            opacity: 0,
            y: -20
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 0.6,
            ease: 'easeOut'
          }}>
          
          <motion.div
            className="absolute -top-10 -left-10 sm:-left-16 z-[-1]"
            animate={{
              rotate: 360
            }}
            transition={{
              duration: 40,
              repeat: Infinity,
              ease: 'linear'
            }}>
            
            <WeatherIcon type="sun" size="xl" />
          </motion.div>

          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-extrabold text-earth-brown leading-tight max-w-3xl mx-auto drop-shadow-sm">
            Find the perfect patch of shade to play in Philly
          </h2>
          <p className="font-body text-lg sm:text-xl font-semibold text-earth-brown/80 mt-4 max-w-2xl mx-auto">
            Explore outdoor play spaces with optimal sun protection for kids.
          </p>
        </motion.div>

        {/* Category Grid */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 w-full"
          variants={containerVariants}
          initial="hidden"
          animate="visible">
          
          {categories.map((cat) =>
          <motion.div key={cat.id} variants={itemVariants}>
              <CategoryButton
              icon={cat.icon as any}
              label={cat.label}
              colorClass={cat.color}
              blobType={cat.blob as any}
              onClick={() => onNavigate('map')} />
            
            </motion.div>
          )}
        </motion.div>
      </main>

      {/* Decorative Horizon Line */}
      <div className="absolute bottom-0 left-0 w-full h-32 pointer-events-none z-0 overflow-hidden">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="absolute bottom-0 w-full h-full text-leafy-green/20 fill-current">
          
          <path d="M0,120 C150,100 350,0 600,60 C850,120 1050,40 1200,80 L1200,120 L0,120 Z" />
        </svg>
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="absolute bottom-0 w-full h-24 text-leafy-green/30 fill-current">
          
          <path d="M0,120 C200,80 400,120 600,40 C800,-40 1000,80 1200,60 L1200,120 L0,120 Z" />
        </svg>
      </div>
    </div>);

}