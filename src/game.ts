import { clone } from "lodash";
import { fromEvent, interval, Observable, race } from "rxjs";
import { filter, map, mapTo } from "rxjs/operators";
import { MatchState, MatchConfig, PlayerInputStream, PlayerState, PlayerCommandType } from "./interfaces";
import { sleep } from "./utils";

export const Game2 = (players: PlayerState[], sockets: Record<string, SocketIO.Socket>, config: MatchConfig) => {
  let state: MatchState = {
    players:     players,
    cardsInPlay: [],
    round:       0,
    tick:        0,
    worldSize:   [5, 9],
  };

  return new Observable($ => {
    const updateState = (newState: Partial<MatchState>) => {
      state = { ...state, ...newState };
      $.next(state);
      return state;
    };

    (async function GameTick() {
      for (let i = 0; i < 99999; i++) {
        const tick      = i % players.length,
              round     = Math.floor(tick / players.length),
              whoseTurn = players[i % players.length],
              socket    = sockets[whoseTurn.id];
      }
    })();
  })
}

export const Game = (players: PlayerState[], inputs: PlayerInputStream, config: MatchConfig) => {
  let state: MatchState = {
    players:     players,
    cardsInPlay: [],
    round:       0,
    tick:        0,
    worldSize:   [5, 9],
  };

  return new Observable($ => {
    const updateState = (newState: Partial<MatchState>) => {
      state = { ...state, ...newState };
      $.next(state);
      return state;
    };

    const subs = [
      inputs.subscribe(([id, action]) => {
        if (action === PlayerCommandType.PLACE_UNIT) {

        }
      })
    ];

    //---------------------------------------------------

    (async function GameTickLogic() {

      const acceptedCommands = [
        PlayerCommandType.PLACE_UNIT,
        PlayerCommandType.CAST_SPELL
      ];

      for (let i = 0; i < 99999; i++) {
        const tick      = i % players.length,
              round     = Math.floor(tick / players.length),
              whoseTurn = players[i % players.length];

        const action = await race([
          interval(Math.floor(config.roundTime / 2)).pipe(mapTo(undefined)),
          inputs.pipe(
            filter(([, action]) => /*id === whoseTurn.id &&*/ acceptedCommands.includes(action.type)),
            map(([, action]) => action))
        ])
        .toPromise();

        if (!action)
          continue;

        switch (action.type) {
          case PlayerCommandType.PLACE_UNIT:
            updateState({
              cardsInPlay: state.cardsInPlay.map(card =>
                card.id === action.cardId
                  ? { ...card, position: action.newPosition }
                  : card)
            })

            break;

          case PlayerCommandType.ATTACK:
        }

      }

      $.complete();
    })();

    return () => {
      subs.forEach(sub => sub.unsubscribe());
    };
  })
  .pipe(map(clone));
};
