import shopsData from '../data/shops.json';

// ZIP code → state lookup (US only, common prefixes)
const ZIP_STATE_MAP = [
  { prefix: '98', state: 'WA' }, { prefix: '99', state: 'WA' },
  { prefix: '97', state: 'OR' },
  { prefix: '9', state: 'CA' },
  { prefix: '85', state: 'AZ' }, { prefix: '86', state: 'AZ' },
  { prefix: '8', state: 'CO' },
  { prefix: '7', state: 'TX' },
  { prefix: '6', state: 'IL' },
  { prefix: '5', state: 'MN' },
  { prefix: '4', state: 'MI' },
  { prefix: '3', state: 'FL' },
  { prefix: '28', state: 'NC' }, { prefix: '29', state: 'SC' },
  { prefix: '2', state: 'NY' },
  { prefix: '1', state: 'MA' },
];

// Approximate ZIP centroid coords for distance calc (top metros)
const ZIP_COORDS = {
  '900': { lat: 34.0522, lng: -118.2437 }, // LA
  '941': { lat: 37.7749, lng: -122.4194 }, // SF
  '980': { lat: 47.6062, lng: -122.3321 }, // Seattle
  '972': { lat: 45.5051, lng: -122.6750 }, // Portland
  '850': { lat: 33.4484, lng: -112.0740 }, // Phoenix
  '787': { lat: 30.2672, lng: -97.7431 },  // Austin
  '770': { lat: 29.7604, lng: -95.3698 },  // Houston
  '606': { lat: 41.8781, lng: -87.6298 },  // Chicago
  '100': { lat: 40.7128, lng: -74.0060 },  // NYC
  '300': { lat: 33.7490, lng: -84.3880 },  // Atlanta
  '331': { lat: 25.7617, lng: -80.1918 },  // Miami
  '800': { lat: 39.7392, lng: -104.9903 }, // Denver
};

function getStateFromZip(zip) {
  if (!zip || zip.length < 5) return null;
  const sorted = [...ZIP_STATE_MAP].sort((a, b) => b.prefix.length - a.prefix.length);
  for (const { prefix, state } of sorted) {
    if (zip.startsWith(prefix)) return state;
  }
  return null;
}

function getCoordsFromZip(zip) {
  if (!zip) return null;
  const prefix3 = zip.slice(0, 3);
  const prefix2 = zip.slice(0, 2);
  return ZIP_COORDS[prefix3] || ZIP_COORDS[prefix2] || null;
}

function haversineDistance(lat1, lng1, lat2, lng2) {
  const R = 3958.8; // miles
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function getStateFromZipCode(zip) {
  return getStateFromZip(zip);
}

export function getAllShops({ specialty = null, ecuBrand = null, tier = null } = {}) {
  let shops = shopsData.filter((s) => s.status === 'approved');
  if (specialty) shops = shops.filter((s) => s.specialties.includes(specialty));
  if (ecuBrand) shops = shops.filter((s) => s.ecuBrands.includes(ecuBrand));
  if (tier) shops = shops.filter((s) => s.tier === tier);
  return shops;
}

export function getShopsByTier(shops, zip = '') {
  const featured = shops.filter((s) => s.tier === 'featured');
  const standard = shops.filter((s) => s.tier === 'standard');
  const free = shops
    .filter((s) => s.tier === 'free')
    .sort((a, b) => a.name.localeCompare(b.name));

  if (!zip || zip.length !== 5) {
    return { featured, standard, free };
  }

  const visitorState = getStateFromZip(zip);
  const visitorCoords = getCoordsFromZip(zip);

  // Featured: sort by exact distance if coords available
  const featuredSorted = visitorCoords
    ? featured
        .map((s) => ({
          ...s,
          distance:
            s.lat && s.lng
              ? Math.round(haversineDistance(visitorCoords.lat, visitorCoords.lng, s.lat, s.lng))
              : 9999,
        }))
        .sort((a, b) => a.distance - b.distance)
    : featured;

  // Standard: same state floats to top
  const standardSorted = visitorState
    ? [
        ...standard.filter((s) => s.state === visitorState),
        ...standard.filter((s) => s.state !== visitorState),
      ]
    : standard;

  return {
    featured: featuredSorted,
    standard: standardSorted,
    free,
    visitorState,
    hasCoords: !!visitorCoords,
  };
}

export function getShopById(id) {
  return shopsData.find((s) => s.id === id) || null;
}

export const SPECIALTIES = [
  { id: 'ecu-install',    label: 'ECU install' },
  { id: 'wiring-harness', label: 'Wiring / harness' },
  { id: 'tuning-dyno',    label: 'Tuning (dyno)' },
  { id: 'tuning-street',  label: 'Tuning (street)' },
  { id: 'remote-tuning',  label: 'Remote tuning' },
  { id: 'engine-build',   label: 'Engine build' },
  { id: 'fabrication',    label: 'Fabrication' },
  { id: 'other',          label: 'Other' },
];

export const ECU_BRANDS = [
  'Haltech', 'Link ECU', 'AEM', 'MoTeC', 'Emtron', 'Ecumaster', 'Vi-PEC', 'Other',
];

export const TIERS = {
  free:     { label: 'Free',     price: '$0',   color: '#6b7280' },
  standard: { label: 'Standard', price: '$9',   color: '#5b9cf6' },
  featured: { label: 'Featured', price: '$39',  color: '#b8ff4f' },
};
