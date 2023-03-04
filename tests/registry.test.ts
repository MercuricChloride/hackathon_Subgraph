import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address } from "@graphprotocol/graph-ts"
import { ContractAdded } from "../generated/schema"
import { ContractAdded as ContractAddedEvent } from "../generated/Registry/Registry"
import { handleContractAdded } from "../src/registry"
import { createContractAddedEvent } from "./registry-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let _address = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let _type = 123
    let newContractAddedEvent = createContractAddedEvent(_address, _type)
    handleContractAdded(newContractAddedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("ContractAdded created and stored", () => {
    assert.entityCount("ContractAdded", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "ContractAdded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "_address",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "ContractAdded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "_type",
      "123"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
