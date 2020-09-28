import { clone } from "lodash";
import { interval, Observable, race } from "rxjs";
import { filter, map, mapTo } from "rxjs/operators";
import { MatchState, MatchConfig, PlayerInputStream, PlayerState, PlayerCommandType } from "./interfaces";

export const Game = (players: PlayerState[], inputs: PlayerInputStream, config: MatchConfig) => {
  let state: MatchState = {
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

    inputs.subscribe(([id, action]) => {

    });

    //---------------------------------------------------

    (async function GameTickLogic() {

      const acceptedCommands = [
        PlayerCommandType.PLACE_UNIT,
        PlayerCommandType.CAST_SPELL
      ];

      for (let i = 0; i < 99999; i++) {
        const round     = Math.floor(i / players.length),
              tick      = i % players.length,
              whoseTurn = players[i % players.length];

        const action = await race([
          interval(config.roundTime).pipe(mapTo(undefined)),
          inputs.pipe(
            filter(([id, action]) => /*id === whoseTurn.id &&*/ acceptedCommands.includes(action.type)),
            map(([, action]) => action))
        ])
        .toPromise();

        if (!action)
          continue;

        switch (action.type) {
          case PlayerCommandType.MOVE_CARD:
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
  })
  .pipe(map(clone));
};
