import {
  GearEquipped as GearEquippedEvent,
  PlayerMinted as PlayerMintedEvent,
} from "../generated/templates/PlayerSheet/PlayerSheet";
import {createPlayer, createPlayerClass} from "../generated/UncrashableEntityHelpers"

import {
  PlayerClass,
  Player,
  Gear,
  GearType
} from "../generated/schema"

import { log } from "@graphprotocol/graph-ts";

export function handlePlayerMinted(event: PlayerMintedEvent): void {
  createPlayerClass(event.params.playerClass.toHexString(), {
   name: event.params.className
  })

  let id = event.params.playerClass.toHexString() + "-" + event.params.tokenId.toHexString();

  createPlayer(id, {
    tokenId: event.params.tokenId,
    owner: event.transaction.from.toHexString(),
    playerClass: event.params.playerClass.toHexString(),
    pointsToSpend: event.params.stats.pointsToSpend,
    constitution: event.params.stats.constitution,
    dexterity: event.params.stats.dexterity,
    strength: event.params.stats.strength,
    wisdom: event.params.stats.wisdom,
    intelligence: event.params.stats.inteligence,
    charisma: event.params.stats.charisma,
    luck: event.params.stats.luck,
    head: "",
    body: "",
    legs: "",
    feet: "",
  });
}

export function handleGearEquipped(event: GearEquippedEvent): void {
  let id = event.params.tokenId.toHexString();
  let gear = Gear.load(id);
  if(gear == null) {
    log.debug("Gear not found: {}", [id]);
    return
  }
  let gearType = GearType.load(gear.gearType);
  let player = Player.load(gear.owner);
  if(gearType == null) {
    log.debug("GearType not found: {}", [gear.gearType]);
    return
  }
  if(player == null) {
    log.debug("player not found: {}", [gear.owner]);
    return
  }
  let slot = gearType.slot;

  if(slot == 0) {
    player.head = gear.id;
  } else if(slot == 1) {
    player.body = gear.id;
  } else if(slot == 2) {
    player.legs = gear.id;
  } else {
    player.feet = gear.id;
  }
  player.save();
}
