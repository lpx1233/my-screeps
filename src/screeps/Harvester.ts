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
  harvest(target: Source | Mineral): number {
    return this.creep.harvest(target);
  }

  moveTo(target: RoomPosition | { pos: RoomPosition; }): number {
    // TODO: optimize pathfinder using cache to reduce CPU usage
    return this.creep.moveTo(target);
  }

  transfer(target: Creep | Structure | PowerCreep, resourceType: ResourceConstant): number {
    return this.creep.transfer(target, resourceType);
  }

  findHarvestAndTransferEnergyTo(spawn: StructureSpawn): void {
    if (this.creep.carry.energy < this.creep.carryCapacity) {
      var sources = this.creep.room.find(FIND_SOURCES);
      if (this.creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
        this.creep.moveTo(sources[0]);
      }
    }
    else if (spawn.energy < spawn.energyCapacity) {
      if (this.creep.transfer(spawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        this.creep.moveTo(spawn);
      }
    }
  }
}
