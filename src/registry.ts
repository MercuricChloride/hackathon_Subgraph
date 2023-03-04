import {
  ContractAdded as ContractAddedEvent,
  ContractRemoved as ContractRemovedEvent,
  OwnershipTransferred as OwnershipTransferredEvent
} from "../generated/Registry/Registry"
import {
  ContractAdded,
  ContractRemoved,
  OwnershipTransferred
} from "../generated/schema"

export function handleContractAdded(event: ContractAddedEvent): void {
  let entity = new ContractAdded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._address = event.params._address
  entity._type = event.params._type

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleContractRemoved(event: ContractRemovedEvent): void {
  let entity = new ContractRemoved(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._address = event.params._address
  entity._type = event.params._type

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
