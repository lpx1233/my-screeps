// import { ErrorMapper } from "utils/ErrorMapper";
import { Harvester } from "screeps/Harvester";
import { ID } from "utils/helpers";

// overall config of number of each type of creeps
const config = {
  'Harvester': 1,
};

// main loop
// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = () => {
  console.log(`Current game tick is ${Game.time}`);

  // instaniate screeps with specific types
  let harvesters: Harvester[] = [];
  for (const i in Game.creeps) {
    if (Game.creeps[i].memory.role == 'Harvester') {
      harvesters.push(new Harvester(Game.creeps[i]));
    }
    // TODO: add other types of creep
  }

  // start spawn screeps if need
  let spawns: StructureSpawn[] = [];
  for (const i in Game.spawns) {
    spawns.push(Game.spawns[i]);
  }
  if (harvesters.length < config.Harvester) {
    let n = config.Harvester - harvesters.length;
    // get all idle spawns
    let idleSpawns = spawns.filter((sp: StructureSpawn) => sp.spawning == null);
    // dispatch task to spawns
    for (let i = 0; i < idleSpawns.length && i < n; i++) {
      Harvester.createHarvester(idleSpawns[i], "Harvester" + ID());
    }
  }

  // do work (harvest, build ...)
  for (let i = 0; i < harvesters.length; i++) {
    harvesters[i].findHarvestAndTransferEnergyTo(spawns[0]);
  }

  // Automatically delete memory of missing creeps
  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      delete Memory.creeps[name];
    }
  }
};
