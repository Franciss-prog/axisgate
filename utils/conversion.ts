import type { Coordinates } from '@/app/page';
// cob
export const convertNetherToOverworld = (netherCoords: Coordinates) => {

  return {
    x: Number(netherCoords.x) * 8,
    y: Number(netherCoords.y),
    z: Number(netherCoords.z) * 8,
  };
};

// convert the overworld coordinates to nether coordinates
export const convertOverworldToNether = (overworldCoords: Coordinates) => {
  return {
    x: Number(overworldCoords.x) / 8,
    y: Number(overworldCoords.y),
    z: Number(overworldCoords.z) / 8,
  };
};