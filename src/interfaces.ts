import { Observable } from "rxjs";

export type PlayerInputStream = Observable<[id: string, input: PlayerCommand]>;

//#region Card Stuff
export interface MatchState {
  players: PlayerState[];
  cardsInPlay: GameEntity<BaseCard>[];
  tick: number;
  round: number;
  worldSize: Point;
}

export interface MatchConfig {
  roundTime: number;
}

enum CardType {
  UNIT, SPELL
}

interface BaseCard {
  type: CardType
  name: string;
  cost: number;
}

enum EffectType {
  BLEED,
  DAMAGE
}

export interface SpellCard extends BaseCard {
  type: CardType.SPELL;
  effects: Array<EffectType | [turns: number, type: EffectType]>
}

export interface UnitCard extends BaseCard {
    type: CardType.UNIT
    attacksWaited: number;
    movesWaited: number;
    stats: UnitCardStats;
}

interface UnitCardStats {
    health: number;
    power: number;
    attackDelay: number;
    moveDelay: number;
}
//#endregion

export enum PlayerCommandType {
  PLACE_UNIT,
  CAST_SPELL,
  NONE
}

export type PlayerCommand = PlayerAttackCommand|PlayerMoveCommand;

export interface PlayerAttackCommand {
  type:     PlayerCommandType.ATTACK;
  cardId:   string;
  targetId: string;
}

export interface PlayerMoveCommand {
  type:        PlayerCommandType.MOVE_CARD,
  cardId:      string;
  newPosition: Point;
}

export interface PlayerState {
    id: string;
    name: string;
    mana: number;
    hand: BaseCard[];
    deck: BaseCard[];
}

export type Point = [x: number, y: number];
export type GameEntity<T> = T & { position: Point, id: string, ownerId: string }

// interface Thing {
//   effect: "hp = hp - 1" // over here
//   otherEffect: "hp = wind_dmg + blah"
// }


// const effect = (properties: Properties) => {
//   const hp = hp + properties.wind * 0.25
// }

/*
  lets fill in these blanks then
  also at what point do i explain the general idea/game rules of the game
  or do we just wing it hehe

  both! the game rules will be explained in the interfaces
  and game logic kind of stuff
  oh shit that's rlly nice

  i was thinking to explain debuffs and stuff we could do like
  it'd be easy to serialize over net but we'd have to make a parser for it
  but for this i think it would be a very simple parser

  or maybe thru a function... but with a string we could easily display information
  and reduce redundancy in that area

  like for state change across net wait why a parser for that
  u mean debuffs as in buffs/debuffs

  yeah.. we could even add an effect like
  wind_dmg -= 1%
  so card would have Card { effects: string[] }
  */


