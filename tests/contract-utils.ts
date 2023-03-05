import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt } from "@graphprotocol/graph-ts"
import {
  DungeonLost,
  DungeonPlayed,
  DungeonWon
} from "../generated/Contract/Contract"

export function createDungeonLostEvent(dungeonId: BigInt): DungeonLost {
  let dungeonLostEvent = changetype<DungeonLost>(newMockEvent())

  dungeonLostEvent.parameters = new Array()

  dungeonLostEvent.parameters.push(
    new ethereum.EventParam(
      "dungeonId",
      ethereum.Value.fromUnsignedBigInt(dungeonId)
    )
  )

  return dungeonLostEvent
}

export function createDungeonPlayedEvent(dungeonId: BigInt): DungeonPlayed {
  let dungeonPlayedEvent = changetype<DungeonPlayed>(newMockEvent())

  dungeonPlayedEvent.parameters = new Array()

  dungeonPlayedEvent.parameters.push(
    new ethereum.EventParam(
      "dungeonId",
      ethereum.Value.fromUnsignedBigInt(dungeonId)
    )
  )

  return dungeonPlayedEvent
}

export function createDungeonWonEvent(dungeonId: BigInt): DungeonWon {
  let dungeonWonEvent = changetype<DungeonWon>(newMockEvent())

  dungeonWonEvent.parameters = new Array()

  dungeonWonEvent.parameters.push(
    new ethereum.EventParam(
      "dungeonId",
      ethereum.Value.fromUnsignedBigInt(dungeonId)
    )
  )

  return dungeonWonEvent
}
