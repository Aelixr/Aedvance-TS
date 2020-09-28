import { Point } from"./interfaces";

export enum CardType {
  UNIT,
  SPELL,
}

export interface BaseCard {
  type:       CardType;
  name:       string;
}

export interface UnitCard extends BaseCard {
  type: CardType.UNIT
  stats: UnitCardStats;
}

export interface UnitCardStats {
  health:  number;
  damage:  number;
  defense: number;
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

//---------------------------------------------------------------------

const BananaCard: UnitCard = {
  type: CardType.UNIT,
  name: "banana",
  stats: {
    health:  100,
    damage:  10,
    defense: 5,
  }
}