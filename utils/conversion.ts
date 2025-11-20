import type { Coordinates } from '@/app/page';
export const convertNetherToOverworld = (netherCoords: Coordinates) => {
    return {
      x: Number(netherCoords.x) * 8,
      y: Number(netherCoords.y),
      z: Number(netherCoords.z) * 8,
    };
  };
  
  export const convertOverworldToNether = (overworldCoords: Coordinates) => {
    return {
      x: Number(overworldCoords.x) / 8,
      y: Number(overworldCoords.y),
      z: Number(overworldCoords.z) / 8,
    };
  };
  