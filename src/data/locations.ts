import { Location, SunExposure, HourlyShade, ShadeLevel } from '../types';

function generateHourlyShade(
pattern:
'heavy-canopy' |
'moderate-trees' |
'open-field' |
'mixed' |
'exposed' |
'afternoon-shade' |
'morning-shade' |
'pavilion',
peakTemp: number)
: HourlyShade[] {
  const hours: HourlyShade[] = [];

  for (let h = 0; h < 24; h++) {
    // Temperature curve: cool night, warm peak at 2-3pm
    const tempBase = peakTemp - 20;
    const tempCurve =
    h < 6 ?
    tempBase + 2 * h :
    h < 14 ?
    tempBase + 12 + (peakTemp - tempBase - 12) * (h - 6) / 8 :
    h < 20 ?
    peakTemp - (peakTemp - tempBase - 8) * (h - 14) / 6 :
    tempBase + 8 - (h - 20) * 1.5;

    let shadeLevel: ShadeLevel;

    switch (pattern) {
      case 'heavy-canopy':
        // Dense tree cover — shaded most of the day
        if (h < 6 || h >= 20) shadeLevel = 'full-shade';else
        if (h >= 11 && h <= 14) shadeLevel = 'partial-shade';else
        shadeLevel = 'full-shade';
        break;

      case 'moderate-trees':
        // Good tree cover but some gaps
        if (h < 6 || h >= 19) shadeLevel = 'full-shade';else
        if (h >= 7 && h <= 9) shadeLevel = 'full-shade';else
        if (h >= 10 && h <= 11) shadeLevel = 'partial-shade';else
        if (h >= 12 && h <= 14) shadeLevel = 'light-sun';else
        if (h >= 15 && h <= 16) shadeLevel = 'partial-shade';else
        shadeLevel = 'full-shade';
        break;

      case 'open-field':
        // Mostly exposed with some peripheral trees
        if (h < 6 || h >= 20) shadeLevel = 'full-shade';else
        if (h >= 7 && h <= 8) shadeLevel = 'partial-shade';else
        if (h >= 9 && h <= 16) shadeLevel = 'full-sun';else
        if (h >= 17 && h <= 18) shadeLevel = 'light-sun';else
        shadeLevel = 'partial-shade';
        break;

      case 'mixed':
        // Playground with structures + some trees
        if (h < 6 || h >= 19) shadeLevel = 'full-shade';else
        if (h >= 7 && h <= 9) shadeLevel = 'partial-shade';else
        if (h >= 10 && h <= 12) shadeLevel = 'light-sun';else
        if (h >= 13 && h <= 15) shadeLevel = 'partial-shade';else
        shadeLevel = 'full-shade';
        break;

      case 'exposed':
        // Very little shade — riverside, open trail
        if (h < 6 || h >= 20) shadeLevel = 'full-shade';else
        if (h >= 7 && h <= 8) shadeLevel = 'light-sun';else
        if (h >= 9 && h <= 17) shadeLevel = 'full-sun';else
        if (h === 18) shadeLevel = 'light-sun';else
        shadeLevel = 'partial-shade';
        break;

      case 'afternoon-shade':
        // Morning sun, afternoon shade from buildings/trees
        if (h < 6 || h >= 19) shadeLevel = 'full-shade';else
        if (h >= 7 && h <= 8) shadeLevel = 'light-sun';else
        if (h >= 9 && h <= 12) shadeLevel = 'full-sun';else
        if (h >= 13 && h <= 14) shadeLevel = 'light-sun';else
        if (h >= 15 && h <= 17) shadeLevel = 'partial-shade';else
        shadeLevel = 'full-shade';
        break;

      case 'morning-shade':
        // Shaded mornings, sunny afternoons
        if (h < 6 || h >= 19) shadeLevel = 'full-shade';else
        if (h >= 7 && h <= 10) shadeLevel = 'full-shade';else
        if (h === 11) shadeLevel = 'partial-shade';else
        if (h >= 12 && h <= 16) shadeLevel = 'light-sun';else
        if (h >= 17 && h <= 18) shadeLevel = 'partial-shade';else
        shadeLevel = 'full-shade';
        break;

      case 'pavilion':
        // Covered structure with surrounding open areas
        if (h < 6 || h >= 19) shadeLevel = 'full-shade';else
        if (h >= 7 && h <= 9) shadeLevel = 'full-shade';else
        if (h >= 10 && h <= 11) shadeLevel = 'partial-shade';else
        if (h >= 12 && h <= 14) shadeLevel = 'partial-shade';else
        if (h >= 15 && h <= 17) shadeLevel = 'full-shade';else
        shadeLevel = 'full-shade';
        break;

      default:
        shadeLevel = 'partial-shade';
    }

    hours.push({
      hour: h,
      shadeLevel,
      temperature: Math.round(tempCurve)
    });
  }

  return hours;
}

export function getSunExposure(location: Location): SunExposure {
  // Count daytime hours (7am - 7pm) by shade level
  const daytimeHours = location.hourlyShade.filter(
    (h) => h.hour >= 7 && h.hour <= 19
  );
  const sunnyHours = daytimeHours.filter(
    (h) => h.shadeLevel === 'full-sun' || h.shadeLevel === 'light-sun'
  ).length;
  const shadyHours = daytimeHours.filter(
    (h) => h.shadeLevel === 'full-shade' || h.shadeLevel === 'partial-shade'
  ).length;

  if (sunnyHours >= 8) return 'full';
  if (shadyHours >= 9) return 'none';
  return 'partial';
}

export const LOCATIONS: Location[] = [
{
  id: '1',
  name: 'Clark Park',
  shadeRating: 4,
  bestTime: 'Morning',
  description:
  'A beloved West Philly park with a dense canopy of mature trees. The playground area is wonderfully shaded in the morning, making it a perfect spot before the midday heat.',
  type: 'park',
  coordinates: { x: 25, y: 60 },
  temperature: 86,
  hourlyShade: generateHourlyShade('moderate-trees', 86),
  shadePeriods: [
  {
    time: 'Morning',
    shadeLevel: 'full-shade',
    description: 'Deep canopy cover'
  },
  {
    time: 'Midday',
    shadeLevel: 'partial-shade',
    description: 'Dappled sunlight'
  },
  {
    time: 'Afternoon',
    shadeLevel: 'light-sun',
    description: 'Sun peeks through'
  },
  {
    time: 'Evening',
    shadeLevel: 'full-shade',
    description: 'Cool and breezy'
  }],

  nearbyPlaces: [
  { id: '101', name: 'Woodland Playground', type: 'playground' },
  { id: '102', name: 'Spruce Hill Courts', type: 'court' }]

},
{
  id: '2',
  name: 'Rittenhouse Square',
  shadeRating: 5,
  bestTime: 'Afternoon',
  description:
  'The crown jewel of Center City parks. Massive, century-old trees provide almost complete coverage over the winding paths and grassy patches.',
  type: 'park',
  coordinates: { x: 50, y: 45 },
  temperature: 84,
  hourlyShade: generateHourlyShade('heavy-canopy', 84),
  shadePeriods: [
  {
    time: 'Morning',
    shadeLevel: 'full-shade',
    description: 'Completely shaded'
  },
  {
    time: 'Midday',
    shadeLevel: 'full-shade',
    description: 'Cool under the trees'
  },
  {
    time: 'Afternoon',
    shadeLevel: 'full-shade',
    description: 'Perfect afternoon spot'
  },
  {
    time: 'Evening',
    shadeLevel: 'partial-shade',
    description: 'Golden hour glow'
  }],

  nearbyPlaces: [
  { id: '201', name: 'Fitler Square', type: 'park' },
  { id: '202', name: 'Schuylkill Banks', type: 'field' }]

},
{
  id: '3',
  name: 'FDR Park',
  shadeRating: 3,
  bestTime: 'Morning',
  description:
  'Expansive fields and lakes. While many areas are open to the sun, there are beautiful clusters of weeping willows and shaded picnic groves to discover.',
  type: 'field',
  coordinates: { x: 45, y: 85 },
  temperature: 91,
  hourlyShade: generateHourlyShade('open-field', 91),
  shadePeriods: [
  {
    time: 'Morning',
    shadeLevel: 'partial-shade',
    description: 'Morning mist and shade'
  },
  {
    time: 'Midday',
    shadeLevel: 'full-sun',
    description: 'Very bright and open'
  },
  {
    time: 'Afternoon',
    shadeLevel: 'light-sun',
    description: 'Some tree shadows lengthen'
  },
  {
    time: 'Evening',
    shadeLevel: 'partial-shade',
    description: 'Beautiful sunset views'
  }],

  nearbyPlaces: [
  { id: '301', name: 'Pattison Playground', type: 'playground' },
  { id: '302', name: 'Lakeside Courts', type: 'court' }]

},
{
  id: '4',
  name: 'Smith Playground',
  shadeRating: 4,
  bestTime: 'All Day',
  description:
  'A magical play space in East Fairmount Park. Features massive wooden play structures that provide their own shade, plus plenty of surrounding trees.',
  type: 'playground',
  coordinates: { x: 35, y: 20 },
  temperature: 85,
  hourlyShade: generateHourlyShade('pavilion', 85),
  shadePeriods: [
  {
    time: 'Morning',
    shadeLevel: 'full-shade',
    description: 'Cool and quiet'
  },
  {
    time: 'Midday',
    shadeLevel: 'partial-shade',
    description: 'Playhouse provides cover'
  },
  {
    time: 'Afternoon',
    shadeLevel: 'partial-shade',
    description: 'Trees block western sun'
  },
  {
    time: 'Evening',
    shadeLevel: 'full-shade',
    description: 'Deeply shaded'
  }],

  nearbyPlaces: [
  { id: '401', name: 'Kelly Drive Path', type: 'park' },
  { id: '402', name: 'Lemon Hill', type: 'field' }]

},
{
  id: '5',
  name: 'Schuylkill River Trail',
  shadeRating: 2,
  bestTime: 'Evening',
  description:
  'A beautiful riverside path, but largely exposed to the sun. Best enjoyed in the early morning or evening when the sun dips behind the city skyline.',
  type: 'skate',
  coordinates: { x: 40, y: 50 },
  temperature: 92,
  hourlyShade: generateHourlyShade('exposed', 92),
  shadePeriods: [
  {
    time: 'Morning',
    shadeLevel: 'light-sun',
    description: 'Bright morning light'
  },
  { time: 'Midday', shadeLevel: 'full-sun', description: 'Very exposed' },
  {
    time: 'Afternoon',
    shadeLevel: 'full-sun',
    description: 'Hot in the summer'
  },
  {
    time: 'Evening',
    shadeLevel: 'full-shade',
    description: 'Skyline blocks the sun'
  }],

  nearbyPlaces: [
  { id: '501', name: "Paine's Park", type: 'skate' },
  { id: '502', name: 'Waterworks', type: 'splash-pad' }]

},
{
  id: '6',
  name: 'Starr Garden',
  shadeRating: 3,
  bestTime: 'Afternoon',
  description:
  'One of the oldest playgrounds in the city! It has a mix of open sports courts and a shaded playground area tucked under some lovely old trees.',
  type: 'playground',
  coordinates: { x: 65, y: 55 },
  temperature: 88,
  hourlyShade: generateHourlyShade('afternoon-shade', 88),
  shadePeriods: [
  {
    time: 'Morning',
    shadeLevel: 'full-sun',
    description: 'Courts are bright'
  },
  {
    time: 'Midday',
    shadeLevel: 'light-sun',
    description: 'Getting warmer'
  },
  {
    time: 'Afternoon',
    shadeLevel: 'partial-shade',
    description: 'Trees provide relief'
  },
  {
    time: 'Evening',
    shadeLevel: 'full-shade',
    description: 'Cool and comfortable'
  }],

  nearbyPlaces: [
  { id: '601', name: 'Seger Park', type: 'playground' },
  { id: '602', name: 'Washington Square', type: 'park' }]

},
{
  id: '7',
  name: 'Malcolm X Park',
  shadeRating: 4,
  bestTime: 'Morning',
  description:
  'A vibrant community hub with a fantastic canopy of towering trees. The central pavilion and surrounding benches are wonderfully protected from the sun.',
  type: 'park',
  coordinates: { x: 15, y: 45 },
  temperature: 83,
  hourlyShade: generateHourlyShade('heavy-canopy', 83),
  shadePeriods: [
  {
    time: 'Morning',
    shadeLevel: 'full-shade',
    description: 'Dense canopy cover'
  },
  {
    time: 'Midday',
    shadeLevel: 'partial-shade',
    description: 'Dappled light'
  },
  {
    time: 'Afternoon',
    shadeLevel: 'partial-shade',
    description: 'Comfortable shade'
  },
  {
    time: 'Evening',
    shadeLevel: 'full-shade',
    description: 'Deeply shaded'
  }],

  nearbyPlaces: [
  { id: '701', name: 'Cedar Park', type: 'park' },
  { id: '702', name: 'Barkan Park', type: 'park' }]

},
{
  id: '8',
  name: 'Dickinson Square',
  shadeRating: 3,
  bestTime: 'Midday',
  description:
  'A classic South Philly park with a great playground. The trees are strategically placed around the perimeter, offering nice shady patches for picnics.',
  type: 'park',
  coordinates: { x: 60, y: 75 },
  temperature: 87,
  hourlyShade: generateHourlyShade('mixed', 87),
  shadePeriods: [
  {
    time: 'Morning',
    shadeLevel: 'light-sun',
    description: 'Bright and open'
  },
  {
    time: 'Midday',
    shadeLevel: 'partial-shade',
    description: 'Good spots under trees'
  },
  {
    time: 'Afternoon',
    shadeLevel: 'full-sun',
    description: 'Playground gets sunny'
  },
  {
    time: 'Evening',
    shadeLevel: 'partial-shade',
    description: 'Cooling down'
  }],

  nearbyPlaces: [
  { id: '801', name: 'Gold Star Park', type: 'park' },
  { id: '802', name: 'Capitolo Playground', type: 'playground' }]

}];