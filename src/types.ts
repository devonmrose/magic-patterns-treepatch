export type ShadeLevel =
'full-sun' |
'light-sun' |
'partial-shade' |
'full-shade';

export interface ShadePeriod {
  time: string;
  shadeLevel: ShadeLevel;
  description: string;
}

export interface HourlyShade {
  hour: number; // 0-23
  shadeLevel: ShadeLevel;
  temperature: number; // Fahrenheit
}

export type SunExposure = 'full' | 'partial' | 'none';

export interface Location {
  id: string;
  name: string;
  shadeRating: number; // 1-5 (kept for backwards compat, not displayed)
  bestTime: string;
  description: string;
  type: 'playground' | 'park' | 'splash-pad' | 'court' | 'field' | 'skate';
  coordinates: {x: number;y: number;};
  shadePeriods: ShadePeriod[];
  nearbyPlaces: {id: string;name: string;type: string;}[];
  hourlyShade: HourlyShade[];
  temperature: number; // peak temp for the day
}

export type PageType = 'home' | 'map' | 'detail';