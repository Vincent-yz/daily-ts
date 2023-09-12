interface BaseStats {
  hp: number;
  attack: number;
  defense: number;
  sp_attack: number;
  sp_defense: number;
  speed: number;
}

interface Pokemon {
  nationalNum: number;
  name: string;
  typeId1: string;
  typeId2: string;
  abilityId1: string;
  abilityId2: string;
  abilityId3: string;
  baseStats: BaseStats;
}

export {};
