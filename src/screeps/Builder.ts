export class Builder {
  // static helper function
  static createBuilder(spawn: StructureSpawn, name: string): number {
    return spawn.spawnCreep([WORK, CARRY, MOVE], name, {
      memory: { role: 'Builder' }
    });
  }

  // hold creep reference
  creep: Creep;

  constructor(creep: Creep) {
    this.creep = creep;
  }

  // some action api
  upgradeControllerUsing(spawn: StructureSpawn): void {
    if (this.creep.carry.energy == 0) {
      if (this.creep.withdraw(spawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        this.creep.moveTo(spawn);
      }
    }
    else {
      let controller: StructureController | undefined = this.creep.room.controller;
      if (controller && this.creep.upgradeController(controller) == ERR_NOT_IN_RANGE) {
        this.creep.moveTo(controller);
      }
    }
  }
}
