import { newMockEvent } from "matchstick-as"
import { ethereum, Address } from "@graphprotocol/graph-ts"
import {
  ContractAdded,
  ContractRemoved,
  OwnershipTransferred
} from "../generated/Registry/Registry"

export function createContractAddedEvent(
  _address: Address,
  _type: i32
): ContractAdded {
  let contractAddedEvent = changetype<ContractAdded>(newMockEvent())

  contractAddedEvent.parameters = new Array()

  contractAddedEvent.parameters.push(
    new ethereum.EventParam("_address", ethereum.Value.fromAddress(_address))
  )
  contractAddedEvent.parameters.push(
    new ethereum.EventParam(
      "_type",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(_type))
    )
  )

  return contractAddedEvent
}

export function createContractRemovedEvent(
  _address: Address,
  _type: i32
): ContractRemoved {
  let contractRemovedEvent = changetype<ContractRemoved>(newMockEvent())

  contractRemovedEvent.parameters = new Array()

  contractRemovedEvent.parameters.push(
    new ethereum.EventParam("_address", ethereum.Value.fromAddress(_address))
  )
  contractRemovedEvent.parameters.push(
    new ethereum.EventParam(
      "_type",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(_type))
    )
  )

  return contractRemovedEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}
