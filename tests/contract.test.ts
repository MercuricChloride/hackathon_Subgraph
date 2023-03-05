import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt } from "@graphprotocol/graph-ts"
import { DungeonLost } from "../generated/schema"
import { DungeonLost as DungeonLostEvent } from "../generated/Contract/Contract"
import { handleDungeonLost } from "../src/contract"
import { createDungeonLostEvent } from "./contract-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let dungeonId = BigInt.fromI32(234)
    let newDungeonLostEvent = createDungeonLostEvent(dungeonId)
    handleDungeonLost(newDungeonLostEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("DungeonLost created and stored", () => {
    assert.entityCount("DungeonLost", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "DungeonLost",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "dungeonId",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
