export class Harvester {
  // static helper function
  static createHarvester(spawn: StructureSpawn, name: string): number {
    return spawn.spawnCreep([WORK, CARRY, MOVE], name, {
      memory: { role: 'Harvester' }
    });
  }

  // hold creep reference
  creep: Creep;

  constructor(creep: Creep) {
    this.creep = creep;
  }

  // some action api
  findHarvestAndTransferEnergyTo(spawn: StructureSpawn): void {
    if (this.creep.carry.energy < this.creep.carryCapacity) {
      var sources = this.creep.room.find(FIND_SOURCES);
      if (this.creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
        this.creep.moveTo(sources[0]);
      }
    }
    else {
      if (this.creep.transfer(spawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        this.creep.moveTo(spawn);
      }
    }
  }
}
