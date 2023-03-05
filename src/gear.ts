import { BigInt } from "@graphprotocol/graph-ts";
import {
  GearCreated as GearCreatedEvent,
  GearEquipped as GearEquippedEvent,
  GearUnequipped as GearUnequippedEvent,
  LootBoxCreated as LootBoxCreatedEvent,
  LootBoxOpened as LootBoxOpened,
} from "../generated/Gear/Gear";
import {createGearType, createGear, createModifier} from "../generated/UncrashableEntityHelpers";

import {
  Gear,
  GearType,
  Modifier,
  Player
} from "../generated/schema"

export function handleGearCreated(event: GearCreatedEvent): void {
  // create a new gearType entity
  let id = event.params.id.toHexString();
  let modifiers: Array<string> = [];
  for(let i = 0; i < event.params.modifiers.length; i++) {
    let modifier = event.params.modifiers[i];
    let modifierId = id + "-" + i.toString();
    createModifier(modifierId, {
      stat: modifier.stat,
      mod: modifier.mod,
    });
    modifiers.push(modifierId);
  }
  createGearType(id, {
    modifiers,
    slot: event.params.slot,
  });
}

export function handleGearMinted(event: GearEquippedEvent): void {
  let id = event.params.tokenId.toHexString();
  createGear(id, {
    gearType: event.params.gearId.toHexString(),
    owner: event.transaction.from.toHexString(),
  });
}
