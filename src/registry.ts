import {
  ContractAdded as ContractAddedEvent,
} from "../generated/Registry/Registry"
import { PlayerSheet } from "../generated/templates";
import {createContract, setAddress, setType} from "../generated/UncrashableEntityHelpers"
import {
  Contract as ContractEntity, PlayerClass,
} from "../generated/schema"
import { Address, log, BigInt } from "@graphprotocol/graph-ts";

function getOrCreateContract(address: Address, type: number): ContractEntity {
  log.info("Creating contract {}", [address.toHex()])
  let contract = ContractEntity.load(address.toHex())
  if (contract == null) {
    contract = new ContractEntity(address.toHex())
    contract.address = address
    contract.type = type as i32
    contract.removed = false
    contract.save()
  }
  return contract as ContractEntity
}

export function handleContractAdded(event: ContractAddedEvent): void {
  let contract =createContract(event.params._address.toHexString(), {
    address: event.params._address,
    type: event.params._type,
  });
  if(contract.type == 2) {
    log.info("Creating template for PlayerSheet {}", [contract.address.toHex()])
    PlayerSheet.create(event.params._address)
  }
}
