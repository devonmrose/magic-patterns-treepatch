import React, { Children } from 'react';
import { motion } from 'framer-motion';
import { HourlyShade, ShadeLevel } from '../types';
import { WeatherIcon } from './WeatherIcon';
interface ShadeDayTimelineProps {
  hourlyShade: HourlyShade[];
  bestTime?: string;
}
// Map our 4 shade levels to the reference's 3 visual categories
type VisualShade = 'full-shade' | 'partial-shade' | 'mostly-sunny';
function toVisualShade(level: ShadeLevel): VisualShade {
  switch (level) {
    case 'full-shade':
      return 'full-shade';
    case 'partial-shade':
      return 'partial-shade';
    case 'light-sun':
      return 'partial-shade';
    case 'full-sun':
      return 'mostly-sunny';
    default:
      return 'partial-shade';
  }
}
function getBlockColor(shade: VisualShade) {
  switch (shade) {
    case 'full-shade':
      return 'bg-[#6BBF6B]';
    // Leafy green
    case 'partial-shade':
      return 'bg-[#F5D76E]';
    // Warm yellow
    case 'mostly-sunny':
      return 'bg-[#F0944D]';
    // Warm orange
    default:
      return 'bg-earth-brown/20';
  }
}
function getLegendColor(shade: VisualShade) {
  switch (shade) {
    case 'full-shade':
      return 'bg-[#6BBF6B]';
    case 'partial-shade':
      return 'bg-[#F5D76E]';
    case 'mostly-sunny':
      return 'bg-[#F0944D]';
    default:
      return 'bg-earth-brown/20';
  }
}
// Find the best consecutive shade window
function findBestWindow(hourlyShade: HourlyShade[]): {
  start: number;
  end: number;
  label: string;
} {
  const daytime = hourlyShade.filter((h) => h.hour >= 6 && h.hour <= 20);
  // Score each hour: full-shade=3, partial-shade=2, light-sun=1, full-sun=0
  const scored = daytime.map((h) => {
    switch (h.shadeLevel) {
      case 'full-shade':
        return {
          hour: h.hour,
          score: 3
        };
      case 'partial-shade':
        return {
          hour: h.hour,
          score: 2
        };
      case 'light-sun':
        return {
          hour: h.hour,
          score: 1
        };
      case 'full-sun':
        return {
          hour: h.hour,
          score: 0
        };
      default:
        return {
          hour: h.hour,
          score: 1
        };
    }
  });
  // Find best 3-hour window
  let bestStart = 0;
  let bestScore = 0;
  for (let i = 0; i <= scored.length - 3; i++) {
    const windowScore =
    scored[i].score + scored[i + 1].score + scored[i + 2].score;
    if (windowScore > bestScore) {
      bestScore = windowScore;
      bestStart = i;
    }
  }
  const startHour = scored[bestStart].hour;
  const endHour = scored[Math.min(bestStart + 2, scored.length - 1)].hour + 1;
  // Label the time period
  let label = 'Morning';
  if (startHour >= 6 && startHour <= 9) label = 'Early Morning';else
  if (startHour >= 10 && startHour <= 11) label = 'Late Morning';else
  if (startHour >= 12 && startHour <= 14) label = 'Midday';else
  if (startHour >= 15 && startHour <= 17) label = 'Afternoon';else
  if (startHour >= 18) label = 'Evening';
  return {
    start: startHour,
    end: endHour,
    label
  };
}
function formatHourLabel(h: number) {
  if (h === 0 || h === 24) return '12 AM';
  if (h < 12) return `${h} AM`;
  if (h === 12) return 'NOON';
  return `${h - 12} PM`;
}
export function ShadeDayTimeline({
  hourlyShade,
  bestTime
}: ShadeDayTimelineProps) {
  const currentHour = new Date().getHours();
  // Daytime hours: 6 AM to 8 PM (hours 6-20)
  const daytimeHours = hourlyShade.filter((h) => h.hour >= 6 && h.hour <= 20);
  const bestWindow = findBestWindow(hourlyShade);
  // Determine comfort recommendation
  const comfortNote = (() => {
    const morningShade = hourlyShade.
    filter((h) => h.hour >= 7 && h.hour <= 10).
    every(
      (h) =>
      h.shadeLevel === 'full-shade' || h.shadeLevel === 'partial-shade'
    );
    const afternoonShade = hourlyShade.
    filter((h) => h.hour >= 16 && h.hour <= 19).
    every(
      (h) =>
      h.shadeLevel === 'full-shade' || h.shadeLevel === 'partial-shade'
    );
    if (morningShade && afternoonShade) return 'Comfortable most of the day';
    if (morningShade) return `Most comfortable before ${formatHourLabel(11)}`;
    if (afternoonShade) return `Most comfortable after ${formatHourLabel(16)}`;
    return `Most comfortable before ${formatHourLabel(10)} or after ${formatHourLabel(16)}`;
  })();
  // Time label positions
  const timeLabels = [
  {
    hour: 6,
    label: '6 AM'
  },
  {
    hour: 9,
    label: 'MORNING'
  },
  {
    hour: 12,
    label: 'NOON'
  },
  {
    hour: 15,
    label: 'AFTERNOON'
  },
  {
    hour: 20,
    label: '8 PM'
  }];

  // Current time indicator position
  const isCurrentDaytime = currentHour >= 6 && currentHour <= 20;
  const currentIndex = daytimeHours.findIndex((h) => h.hour === currentHour);
  return (
    <div className="w-full">
      {/* Title */}
      <h3 className="font-heading text-xl font-bold text-earth-brown mb-4 flex items-center gap-2">
        🌤️ Sun Coverage
      </h3>

      {/* Hourly blocks */}
      <motion.div
        className="flex gap-[3px] w-full mb-1"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {
            opacity: 0
          },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.03
            }
          }
        }}>
        
        {daytimeHours.map((h, i) => {
          const visual = toVisualShade(h.shadeLevel);
          const isFirst = i === 0;
          const isLast = i === daytimeHours.length - 1;
          return (
            <motion.div
              key={h.hour}
              variants={{
                hidden: {
                  opacity: 0,
                  scaleY: 0.3
                },
                visible: {
                  opacity: 1,
                  scaleY: 1,
                  transition: {
                    type: 'spring',
                    stiffness: 300,
                    damping: 20
                  }
                }
              }}
              className={`flex-1 h-11 sm:h-14 ${getBlockColor(visual)} ${isFirst ? 'rounded-l-lg' : ''} ${isLast ? 'rounded-r-lg' : ''} rounded-[4px]`}
              style={{
                originY: 1
              }} />);


        })}
      </motion.div>

      {/* Current time indicator dashes */}
      {isCurrentDaytime && currentIndex >= 0 &&
      <div className="flex gap-[3px] w-full mb-1.5">
          {daytimeHours.map((h, i) =>
        <div key={h.hour} className="flex-1 flex justify-center">
              {(i === currentIndex ||
          i === currentIndex - 1 ||
          i === currentIndex + 1) &&
          <motion.div
            className="w-3/4 h-[3px] bg-breezy-teal rounded-full"
            initial={{
              scaleX: 0
            }}
            animate={{
              scaleX: 1
            }}
            transition={{
              delay: 0.5 + i * 0.05,
              duration: 0.3
            }} />

          }
            </div>
        )}
        </div>
      }

      {/* Time labels */}
      <div
        className="flex w-full mb-4 relative"
        style={{
          height: '18px'
        }}>
        
        {timeLabels.map((tl) => {
          const index = daytimeHours.findIndex((h) => h.hour === tl.hour);
          if (index < 0) return null;
          const percent = index / (daytimeHours.length - 1) * 100;
          return (
            <span
              key={tl.hour}
              className="absolute font-body text-[10px] sm:text-xs font-bold text-earth-brown/40 uppercase tracking-wider whitespace-nowrap"
              style={{
                left: `${percent}%`,
                transform:
                tl.hour === 20 ?
                'translateX(-100%)' :
                tl.hour === 6 ?
                'none' :
                'translateX(-50%)'
              }}>
              
              {tl.label}
            </span>);

        })}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-5 mb-5">
        {[
        {
          shade: 'full-shade' as VisualShade,
          label: 'Full Shade'
        },
        {
          shade: 'partial-shade' as VisualShade,
          label: 'Partial Shade'
        },
        {
          shade: 'mostly-sunny' as VisualShade,
          label: 'Mostly Sunny'
        }].
        map((item) =>
        <div key={item.shade} className="flex items-center gap-1.5">
            <div
            className={`w-3.5 h-3.5 rounded ${getLegendColor(item.shade)}`} />
          
            <span className="font-body text-xs sm:text-sm font-semibold text-earth-brown/60">
              {item.label}
            </span>
          </div>
        )}
      </div>

      {/* Best time callout */}
      <motion.div
        className="bg-leafy-green/10 border-2 border-leafy-green/20 rounded-2xl px-5 py-3.5 mb-3"
        initial={{
          opacity: 0,
          y: 10
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        transition={{
          delay: 0.4,
          type: 'spring',
          stiffness: 200
        }}>
        
        <div className="flex items-center gap-2">
          <span className="text-base">⛱</span>
          <span className="font-heading font-bold text-earth-brown text-base">
            Best: {bestWindow.label}
          </span>
          <span className="font-body text-sm text-earth-brown/60 font-semibold">
            ({formatHourLabel(bestWindow.start)} –{' '}
            {formatHourLabel(bestWindow.end)})
          </span>
        </div>
      </motion.div>

      {/* Comfort note */}
      <p className="font-body text-sm font-semibold text-leafy-green/80 italic">
        {comfortNote}
      </p>
    </div>);

}