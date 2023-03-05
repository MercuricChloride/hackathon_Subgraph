import {
  DungeonLost as DungeonLostEvent,
  DungeonPlayed as DungeonPlayedEvent,
  DungeonWon as DungeonWonEvent
} from "../generated/Contract/Contract"
import {createDungeonPlayed, createDungeonFinalized} from "../generated/UncrashableEntityHelpers"

export function handleDungeonLost(event: DungeonLostEvent): void {
  let dungeonId = event.params.dungeonId();
  createDungeonFinalized(event.params.dungeonId, {
    dungeonId,
    won: false,
    owner: event.transaction.from
  });
}

export function handleDungeonPlayed(event: DungeonPlayedEvent): void {
}

export function handleDungeonWon(event: DungeonWonEvent): void {
  let dungeonId = event.params.dungeonId();
  createDungeonFinalized(event.params.dungeonId, {
    dungeonId,
    owner: event.transaction.from
    won: true,
  });
}
