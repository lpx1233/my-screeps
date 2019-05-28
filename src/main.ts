import { Harvester } from "screeps/Harvester";
import { Builder } from "screeps/Builder";

import { ID } from "utils/helpers";

// overall config of number of each type of creeps
const config = {
  Harvester: 3,
  Builder: 1
};

// main loop
// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = () => {
  console.log(`Current game tick is ${Game.time}`);

  // instaniate screeps with specific types
  let harvesters: Harvester[] = [];
  let builders: Builder[] = [];
  for (const i in Game.creeps) {
    switch (Game.creeps[i].memory.role) {
      case 'Harvester': {
        harvesters.push(new Harvester(Game.creeps[i]));
        break;
      }
      case 'Builder': {
        builders.push(new Builder(Game.creeps[i]));
        break;
      }
      // TODO: add other types of creep
      default:
        break;
    }
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
  if (builders.length < config.Builder) {
    let n = config.Builder - builders.length;
    // get all idle spawns
    let idleSpawns = spawns.filter((sp: StructureSpawn) => sp.spawning == null);
    // dispatch task to spawns
    for (let i = 0; i < idleSpawns.length && i < n; i++) {
      Builder.createBuilder(idleSpawns[i], "Builder" + ID());
    }
  }

  // do work (harvest, build ...)
  for (let i = 0; i < harvesters.length; i++) {
    harvesters[i].findHarvestAndTransferEnergyTo(spawns[0]);
  }
  for (let i = 0; i < builders.length; i++) {
    builders[i].upgradeControllerUsing(spawns[0]);
  }

  // Automatically delete memory of missing creeps
  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      delete Memory.creeps[name];
    }
  }
};
