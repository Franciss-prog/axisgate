import type { Coordinates } from '@/app/page';
// cob
export const convertNetherToOverworld = (netherCoords: Coordinates) => {

  return {
    x: Math.floor(Number(netherCoords.x) * 8),
    y: Number(netherCoords.y),
    z: Math.floor(Number(netherCoords.z) * 8),
  };
};

// convert the overworld coordinates to nether coordinates
export const convertOverworldToNether = (overworldCoords: Coordinates) => {
  return {
    x: Math.floor(Number(overworldCoords.x) / 8),
    y: Number(overworldCoords.y),
    z: Math.floor(Number(overworldCoords.z) / 8),
  };
};