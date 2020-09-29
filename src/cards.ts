import { Point } from"./interfaces";

export enum CardType {
  UNIT,
  SPELL,
}

export interface BaseCard {
  type: CardType;
  name: string;
}

export interface UnitCard extends BaseCard {
  type: CardType.UNIT
  stats: UnitCardStats;
  afflictionOnHit?: Affliction[];
}

export interface UnitCardStats {
  health:  number;
  damage:  number;
  defense: number;
}

export interface SpellCard extends BaseCard {
  type: CardType.SPELL
}

export type CardAction = {
  type:     "move";
  position: Point;
}|{
  type:           "attack";
  fromCardId:     string;
  targetCardsIds: string[];
}|{
  type:           "use-spell";
  fromCardId:     string;
  targetCardsIds: string[];
}

// export type Affliction = {
//   type:     "bleed";
//   duration: number;
//   effect:   { damage: 10 }
// }|{
//   type:           "cold";
//   duration:       number;
//   speedReduction: number;
// };

interface Affliction {
  name?:     string;
  duration?: number;
  damage?:   number;
  defense?:  number;
  speed?:    number;
}

const Afflictions: Record<string, Affliction> = {
  bleed: {
    name:     "bleed",
    damage:   10,
    duration: 3,
  },

  cold: {
    name:     "cold",
    damage:   1,
    duration: 3
  }
}

//---------------------------------------------------------------------

const BananaCard: UnitCard = {
  type: CardType.UNIT,
  name: "banana",
  stats: {
    health:  100,
    damage:  10,
    defense: 5,
  }
};

const AppleCard: UnitCard = {
  type: CardType.UNIT,
  name: "apple",
  stats: {
    health: 200,
    damage: 5,
    defense: 20,
  }
};

const AppleBee: UnitCard = {
  type: CardType.UNIT,
  name: "Apple Bee",
  stats: {
    health: 25,
    damage: 30,
    defense: 1,
  }
}
