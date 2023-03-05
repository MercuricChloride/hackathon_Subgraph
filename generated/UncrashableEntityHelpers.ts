import {
  Contract,
  PlayerClass,
  Player,
  Modifier,
  GearType,
  Gear,
  LootBox,
  LootBoxItem,
  DungeonFinalized,
  DungeonPlayed
} from "./schema";
import {
  Address,
  BigInt,
  Bytes,
  BigDecimal,
  log,
  Entity,
  dataSource, 
} from "@graphprotocol/graph-ts";

export let NETWORK_NAME = dataSource.network(); // e.g. "mainnet", "matic", "avalanche", "ropsten", "poa-core"

function getIdPrefix(network: string): string {
  return "";
}
export let ENTITY_ID_PREFIX = getIdPrefix(NETWORK_NAME);

function ensureEntityIdHasCorrectPrefix(entityId: string): string {
  if (entityId.startsWith(ENTITY_ID_PREFIX)) {
    return entityId;
  } else {
    return ENTITY_ID_PREFIX + entityId;
  }
}

export class GetOrCreateReturn<EntityType> {
  entity: EntityType;
  wasCreated: boolean;

  constructor(entity: EntityType, wasCreated: boolean) {
    this.entity = entity;
    this.wasCreated = wasCreated;
  }
}
export function generateContractId(
  contractId: string
): string {
  return ENTITY_ID_PREFIX + "unhandled type in converter string - Please fix the converter"
}

function getOrInitializeContractDefault(entityId: string = "UNINITIALISED - Contract"): Contract {
  entityId = ensureEntityIdHasCorrectPrefix(entityId);
  let loadedContract = Contract.load(entityId);

  if (loadedContract == null) {
    loadedContract = new Contract(entityId);
    
    loadedContract.address = Bytes.fromHexString("0x00") as Bytes;
    loadedContract.type = 0;
    loadedContract.removed = false;
    loadedContract.save();

    return loadedContract;
  } else{
    return loadedContract;
  }
}
export class ContractInitialValues {
  address: Bytes;
  type: i32;
}

export function createContract(entityId: string, initialValues: ContractInitialValues): Contract {
  entityId = ensureEntityIdHasCorrectPrefix(entityId);
  if (false && Contract.load(entityId) != null) {
      log.warning("GRAPH UNCRASHABLE WARNING: Trying to create an entity that already exists. (entityType : Contract, entitiyID: {})", [entityId]);

    return Contract.load(entityId) as Contract;
  }
  let loadedContract = new Contract(entityId);

  loadedContract.address = initialValues.address;
  loadedContract.type = initialValues.type;
  loadedContract.removed = false;

  loadedContract.save();

  return loadedContract;
}

export function getOrInitializeContract(entityId: string, initialValues: ContractInitialValues): GetOrCreateReturn<Contract> {
  entityId = ensureEntityIdHasCorrectPrefix(entityId);
  let loadedContract = Contract.load(entityId);

  let returnObject: GetOrCreateReturn<Contract>;

  if (loadedContract == null) {
    returnObject = new GetOrCreateReturn<Contract>(createContract(entityId, initialValues), true);
  } else {
    returnObject = new GetOrCreateReturn<Contract>(loadedContract as Contract, false);
  }

  return returnObject;
}

export function doesContractExist(entityId: string): boolean {
  entityId = ensureEntityIdHasCorrectPrefix(entityId);
  return Contract.load(entityId) != null;
}

export function getContract(entityId: string): Contract {
  entityId = ensureEntityIdHasCorrectPrefix(entityId);
  let loadedContract = Contract.load(entityId);

  if (loadedContract == null) {
      log.warning("GRAPH UNCRASHABLE WARNING: Unable to find entity of type Contract with id {}. If this entity hasn't been initialized use the 'getOrInitializeContract' and handle the case that it needs to be initialized.", [entityId])

    return getOrInitializeContractDefault(entityId);
  }

  return loadedContract as Contract;
}
export class updateContractValues {
  address: Bytes;
  type: i32;
  removed: boolean;
}

export function updateContract(entityId: string, newValues: updateContractValues): void {
  let entity = getContract(entityId);
  entity.address = newValues.address;
  entity.type = newValues.type;
  entity.removed = newValues.removed;

  entity.save();
}

export class setTypeValues {
  type: i32;
}

export function setType(entityId: string, newValues: setTypeValues): void {
  let entity = getContract(entityId);
  entity.type = newValues.type;

  entity.save();
}

export class setAddressValues {
  address: Bytes;
}

export function setAddress(entityId: string, newValues: setAddressValues): void {
  let entity = getContract(entityId);
  entity.address = newValues.address;

  entity.save();
}


function getOrInitializePlayerClassDefault(entityId: string = "UNINITIALISED - PlayerClass"): PlayerClass {
  entityId = ensureEntityIdHasCorrectPrefix(entityId);
  let loadedPlayerClass = PlayerClass.load(entityId);

  if (loadedPlayerClass == null) {
    loadedPlayerClass = new PlayerClass(entityId);
    
    loadedPlayerClass.name = null;
    loadedPlayerClass.save();

    return loadedPlayerClass;
  } else{
    return loadedPlayerClass;
  }
}
export class PlayerClassInitialValues {
  name: string;
}

export function createPlayerClass(entityId: string, initialValues: PlayerClassInitialValues): PlayerClass {
  entityId = ensureEntityIdHasCorrectPrefix(entityId);
  if (false && PlayerClass.load(entityId) != null) {
      log.warning("GRAPH UNCRASHABLE WARNING: Trying to create an entity that already exists. (entityType : PlayerClass, entitiyID: {})", [entityId]);

    return PlayerClass.load(entityId) as PlayerClass;
  }
  let loadedPlayerClass = new PlayerClass(entityId);

  loadedPlayerClass.name = initialValues.name;

  loadedPlayerClass.save();

  return loadedPlayerClass;
}

export function getOrInitializePlayerClass(entityId: string, initialValues: PlayerClassInitialValues): GetOrCreateReturn<PlayerClass> {
  entityId = ensureEntityIdHasCorrectPrefix(entityId);
  let loadedPlayerClass = PlayerClass.load(entityId);

  let returnObject: GetOrCreateReturn<PlayerClass>;

  if (loadedPlayerClass == null) {
    returnObject = new GetOrCreateReturn<PlayerClass>(createPlayerClass(entityId, initialValues), true);
  } else {
    returnObject = new GetOrCreateReturn<PlayerClass>(loadedPlayerClass as PlayerClass, false);
  }

  return returnObject;
}

export function doesPlayerClassExist(entityId: string): boolean {
  entityId = ensureEntityIdHasCorrectPrefix(entityId);
  return PlayerClass.load(entityId) != null;
}

export function getPlayerClass(entityId: string): PlayerClass {
  entityId = ensureEntityIdHasCorrectPrefix(entityId);
  let loadedPlayerClass = PlayerClass.load(entityId);

  if (loadedPlayerClass == null) {
      log.warning("GRAPH UNCRASHABLE WARNING: Unable to find entity of type PlayerClass with id {}. If this entity hasn't been initialized use the 'getOrInitializePlayerClass' and handle the case that it needs to be initialized.", [entityId])

    return getOrInitializePlayerClassDefault(entityId);
  }

  return loadedPlayerClass as PlayerClass;
}


function getOrInitializePlayerDefault(entityId: string = "UNINITIALISED - Player"): Player {
  entityId = ensureEntityIdHasCorrectPrefix(entityId);
  let loadedPlayer = Player.load(entityId);

  if (loadedPlayer == null) {
    loadedPlayer = new Player(entityId);
    
    loadedPlayer.tokenId = BigInt.zero();
    loadedPlayer.owner = "";
    loadedPlayer.playerClass = "UNINITIALISED - PlayerClass";
    loadedPlayer.pointsToSpend = 0;
    loadedPlayer.constitution = 0;
    loadedPlayer.dexterity = 0;
    loadedPlayer.strength = 0;
    loadedPlayer.wisdom = 0;
    loadedPlayer.intelligence = 0;
    loadedPlayer.charisma = 0;
    loadedPlayer.luck = 0;
    loadedPlayer.head = null;
    loadedPlayer.body = null;
    loadedPlayer.legs = null;
    loadedPlayer.feet = null;
    loadedPlayer.save();

    return loadedPlayer;
  } else{
    return loadedPlayer;
  }
}
export class PlayerInitialValues {
  tokenId: BigInt;
  owner: string;
  playerClass: string;
  pointsToSpend: i32;
  constitution: i32;
  dexterity: i32;
  strength: i32;
  wisdom: i32;
  intelligence: i32;
  charisma: i32;
  luck: i32;
  head: string;
  body: string;
  legs: string;
  feet: string;
}

export function createPlayer(entityId: string, initialValues: PlayerInitialValues): Player {
  entityId = ensureEntityIdHasCorrectPrefix(entityId);
  if (false && Player.load(entityId) != null) {
      log.warning("GRAPH UNCRASHABLE WARNING: Trying to create an entity that already exists. (entityType : Player, entitiyID: {})", [entityId]);

    return Player.load(entityId) as Player;
  }
  let loadedPlayer = new Player(entityId);

  loadedPlayer.tokenId = initialValues.tokenId;
  loadedPlayer.owner = initialValues.owner;
  loadedPlayer.playerClass = initialValues.playerClass;
  loadedPlayer.pointsToSpend = initialValues.pointsToSpend;
  loadedPlayer.constitution = initialValues.constitution;
  loadedPlayer.dexterity = initialValues.dexterity;
  loadedPlayer.strength = initialValues.strength;
  loadedPlayer.wisdom = initialValues.wisdom;
  loadedPlayer.intelligence = initialValues.intelligence;
  loadedPlayer.charisma = initialValues.charisma;
  loadedPlayer.luck = initialValues.luck;
  loadedPlayer.head = initialValues.head;
  loadedPlayer.body = initialValues.body;
  loadedPlayer.legs = initialValues.legs;
  loadedPlayer.feet = initialValues.feet;

  loadedPlayer.save();

  return loadedPlayer;
}

export function getOrInitializePlayer(entityId: string, initialValues: PlayerInitialValues): GetOrCreateReturn<Player> {
  entityId = ensureEntityIdHasCorrectPrefix(entityId);
  let loadedPlayer = Player.load(entityId);

  let returnObject: GetOrCreateReturn<Player>;

  if (loadedPlayer == null) {
    returnObject = new GetOrCreateReturn<Player>(createPlayer(entityId, initialValues), true);
  } else {
    returnObject = new GetOrCreateReturn<Player>(loadedPlayer as Player, false);
  }

  return returnObject;
}

export function doesPlayerExist(entityId: string): boolean {
  entityId = ensureEntityIdHasCorrectPrefix(entityId);
  return Player.load(entityId) != null;
}

export function getPlayer(entityId: string): Player {
  entityId = ensureEntityIdHasCorrectPrefix(entityId);
  let loadedPlayer = Player.load(entityId);

  if (loadedPlayer == null) {
      log.warning("GRAPH UNCRASHABLE WARNING: Unable to find entity of type Player with id {}. If this entity hasn't been initialized use the 'getOrInitializePlayer' and handle the case that it needs to be initialized.", [entityId])

    return getOrInitializePlayerDefault(entityId);
  }

  return loadedPlayer as Player;
}


function getOrInitializeModifierDefault(entityId: string = "UNINITIALISED - Modifier"): Modifier {
  entityId = ensureEntityIdHasCorrectPrefix(entityId);
  let loadedModifier = Modifier.load(entityId);

  if (loadedModifier == null) {
    loadedModifier = new Modifier(entityId);
    
    loadedModifier.stat = 0;
    loadedModifier.mod = 0;
    loadedModifier.save();

    return loadedModifier;
  } else{
    return loadedModifier;
  }
}
export class ModifierInitialValues {
  stat: i32;
  mod: i32;
}

export function createModifier(entityId: string, initialValues: ModifierInitialValues): Modifier {
  entityId = ensureEntityIdHasCorrectPrefix(entityId);
  if (false && Modifier.load(entityId) != null) {
      log.warning("GRAPH UNCRASHABLE WARNING: Trying to create an entity that already exists. (entityType : Modifier, entitiyID: {})", [entityId]);

    return Modifier.load(entityId) as Modifier;
  }
  let loadedModifier = new Modifier(entityId);

  loadedModifier.stat = initialValues.stat;
  loadedModifier.mod = initialValues.mod;

  loadedModifier.save();

  return loadedModifier;
}

export function getOrInitializeModifier(entityId: string, initialValues: ModifierInitialValues): GetOrCreateReturn<Modifier> {
  entityId = ensureEntityIdHasCorrectPrefix(entityId);
  let loadedModifier = Modifier.load(entityId);

  let returnObject: GetOrCreateReturn<Modifier>;

  if (loadedModifier == null) {
    returnObject = new GetOrCreateReturn<Modifier>(createModifier(entityId, initialValues), true);
  } else {
    returnObject = new GetOrCreateReturn<Modifier>(loadedModifier as Modifier, false);
  }

  return returnObject;
}

export function doesModifierExist(entityId: string): boolean {
  entityId = ensureEntityIdHasCorrectPrefix(entityId);
  return Modifier.load(entityId) != null;
}

export function getModifier(entityId: string): Modifier {
  entityId = ensureEntityIdHasCorrectPrefix(entityId);
  let loadedModifier = Modifier.load(entityId);

  if (loadedModifier == null) {
      log.warning("GRAPH UNCRASHABLE WARNING: Unable to find entity of type Modifier with id {}. If this entity hasn't been initialized use the 'getOrInitializeModifier' and handle the case that it needs to be initialized.", [entityId])

    return getOrInitializeModifierDefault(entityId);
  }

  return loadedModifier as Modifier;
}


function getOrInitializeGearTypeDefault(entityId: string = "UNINITIALISED - GearType"): GearType {
  entityId = ensureEntityIdHasCorrectPrefix(entityId);
  let loadedGearType = GearType.load(entityId);

  if (loadedGearType == null) {
    loadedGearType = new GearType(entityId);
    
    loadedGearType.modifiers = null;
    loadedGearType.slot = 0;
    loadedGearType.save();

    return loadedGearType;
  } else{
    return loadedGearType;
  }
}
export class GearTypeInitialValues {
  modifiers: Array<string>;
  slot: i32;
}

export function createGearType(entityId: string, initialValues: GearTypeInitialValues): GearType {
  entityId = ensureEntityIdHasCorrectPrefix(entityId);
  if (false && GearType.load(entityId) != null) {
      log.warning("GRAPH UNCRASHABLE WARNING: Trying to create an entity that already exists. (entityType : GearType, entitiyID: {})", [entityId]);

    return GearType.load(entityId) as GearType;
  }
  let loadedGearType = new GearType(entityId);

  loadedGearType.modifiers = (initialValues.modifiers);
  loadedGearType.slot = initialValues.slot;

  loadedGearType.save();

  return loadedGearType;
}

export function getOrInitializeGearType(entityId: string, initialValues: GearTypeInitialValues): GetOrCreateReturn<GearType> {
  entityId = ensureEntityIdHasCorrectPrefix(entityId);
  let loadedGearType = GearType.load(entityId);

  let returnObject: GetOrCreateReturn<GearType>;

  if (loadedGearType == null) {
    returnObject = new GetOrCreateReturn<GearType>(createGearType(entityId, initialValues), true);
  } else {
    returnObject = new GetOrCreateReturn<GearType>(loadedGearType as GearType, false);
  }

  return returnObject;
}

export function doesGearTypeExist(entityId: string): boolean {
  entityId = ensureEntityIdHasCorrectPrefix(entityId);
  return GearType.load(entityId) != null;
}

export function getGearType(entityId: string): GearType {
  entityId = ensureEntityIdHasCorrectPrefix(entityId);
  let loadedGearType = GearType.load(entityId);

  if (loadedGearType == null) {
      log.warning("GRAPH UNCRASHABLE WARNING: Unable to find entity of type GearType with id {}. If this entity hasn't been initialized use the 'getOrInitializeGearType' and handle the case that it needs to be initialized.", [entityId])

    return getOrInitializeGearTypeDefault(entityId);
  }

  return loadedGearType as GearType;
}


function getOrInitializeGearDefault(entityId: string = "UNINITIALISED - Gear"): Gear {
  entityId = ensureEntityIdHasCorrectPrefix(entityId);
  let loadedGear = Gear.load(entityId);

  if (loadedGear == null) {
    loadedGear = new Gear(entityId);
    
    loadedGear.gearType = "UNINITIALISED - GearType";
    loadedGear.owner = "";
    loadedGear.save();

    return loadedGear;
  } else{
    return loadedGear;
  }
}
export class GearInitialValues {
  gearType: string;
  owner: string;
}

export function createGear(entityId: string, initialValues: GearInitialValues): Gear {
  entityId = ensureEntityIdHasCorrectPrefix(entityId);
  if (false && Gear.load(entityId) != null) {
      log.warning("GRAPH UNCRASHABLE WARNING: Trying to create an entity that already exists. (entityType : Gear, entitiyID: {})", [entityId]);

    return Gear.load(entityId) as Gear;
  }
  let loadedGear = new Gear(entityId);

  loadedGear.gearType = initialValues.gearType;
  loadedGear.owner = initialValues.owner;

  loadedGear.save();

  return loadedGear;
}

export function getOrInitializeGear(entityId: string, initialValues: GearInitialValues): GetOrCreateReturn<Gear> {
  entityId = ensureEntityIdHasCorrectPrefix(entityId);
  let loadedGear = Gear.load(entityId);

  let returnObject: GetOrCreateReturn<Gear>;

  if (loadedGear == null) {
    returnObject = new GetOrCreateReturn<Gear>(createGear(entityId, initialValues), true);
  } else {
    returnObject = new GetOrCreateReturn<Gear>(loadedGear as Gear, false);
  }

  return returnObject;
}

export function doesGearExist(entityId: string): boolean {
  entityId = ensureEntityIdHasCorrectPrefix(entityId);
  return Gear.load(entityId) != null;
}

export function getGear(entityId: string): Gear {
  entityId = ensureEntityIdHasCorrectPrefix(entityId);
  let loadedGear = Gear.load(entityId);

  if (loadedGear == null) {
      log.warning("GRAPH UNCRASHABLE WARNING: Unable to find entity of type Gear with id {}. If this entity hasn't been initialized use the 'getOrInitializeGear' and handle the case that it needs to be initialized.", [entityId])

    return getOrInitializeGearDefault(entityId);
  }

  return loadedGear as Gear;
}


function getOrInitializeLootBoxDefault(entityId: string = "UNINITIALISED - LootBox"): LootBox {
  entityId = ensureEntityIdHasCorrectPrefix(entityId);
  let loadedLootBox = LootBox.load(entityId);

  if (loadedLootBox == null) {
    loadedLootBox = new LootBox(entityId);
    
    loadedLootBox.createdBy = Bytes.fromHexString("0x00") as Bytes;
    loadedLootBox.rangeMax = BigInt.zero();
    loadedLootBox.items = null;
    loadedLootBox.save();

    return loadedLootBox;
  } else{
    return loadedLootBox;
  }
}
export class LootBoxInitialValues {
  createdBy: Bytes;
  rangeMax: BigInt;
  items: Array<string>;
}

export function createLootBox(entityId: string, initialValues: LootBoxInitialValues): LootBox {
  entityId = ensureEntityIdHasCorrectPrefix(entityId);
  if (false && LootBox.load(entityId) != null) {
      log.warning("GRAPH UNCRASHABLE WARNING: Trying to create an entity that already exists. (entityType : LootBox, entitiyID: {})", [entityId]);

    return LootBox.load(entityId) as LootBox;
  }
  let loadedLootBox = new LootBox(entityId);

  loadedLootBox.createdBy = initialValues.createdBy;
  loadedLootBox.rangeMax = initialValues.rangeMax;
  loadedLootBox.items = (initialValues.items);

  loadedLootBox.save();

  return loadedLootBox;
}

export function getOrInitializeLootBox(entityId: string, initialValues: LootBoxInitialValues): GetOrCreateReturn<LootBox> {
  entityId = ensureEntityIdHasCorrectPrefix(entityId);
  let loadedLootBox = LootBox.load(entityId);

  let returnObject: GetOrCreateReturn<LootBox>;

  if (loadedLootBox == null) {
    returnObject = new GetOrCreateReturn<LootBox>(createLootBox(entityId, initialValues), true);
  } else {
    returnObject = new GetOrCreateReturn<LootBox>(loadedLootBox as LootBox, false);
  }

  return returnObject;
}

export function doesLootBoxExist(entityId: string): boolean {
  entityId = ensureEntityIdHasCorrectPrefix(entityId);
  return LootBox.load(entityId) != null;
}

export function getLootBox(entityId: string): LootBox {
  entityId = ensureEntityIdHasCorrectPrefix(entityId);
  let loadedLootBox = LootBox.load(entityId);

  if (loadedLootBox == null) {
      log.warning("GRAPH UNCRASHABLE WARNING: Unable to find entity of type LootBox with id {}. If this entity hasn't been initialized use the 'getOrInitializeLootBox' and handle the case that it needs to be initialized.", [entityId])

    return getOrInitializeLootBoxDefault(entityId);
  }

  return loadedLootBox as LootBox;
}


function getOrInitializeLootBoxItemDefault(entityId: string = "UNINITIALISED - LootBoxItem"): LootBoxItem {
  entityId = ensureEntityIdHasCorrectPrefix(entityId);
  let loadedLootBoxItem = LootBoxItem.load(entityId);

  if (loadedLootBoxItem == null) {
    loadedLootBoxItem = new LootBoxItem(entityId);
    
    loadedLootBoxItem.gearItem = "UNINITIALISED - Gear";
    loadedLootBoxItem.rangeStart = BigInt.zero();
    loadedLootBoxItem.rangeEnd = BigInt.zero();
    loadedLootBoxItem.save();

    return loadedLootBoxItem;
  } else{
    return loadedLootBoxItem;
  }
}
export class LootBoxItemInitialValues {
  gearItem: string;
  rangeStart: BigInt;
  rangeEnd: BigInt;
}

export function createLootBoxItem(entityId: string, initialValues: LootBoxItemInitialValues): LootBoxItem {
  entityId = ensureEntityIdHasCorrectPrefix(entityId);
  if (false && LootBoxItem.load(entityId) != null) {
      log.warning("GRAPH UNCRASHABLE WARNING: Trying to create an entity that already exists. (entityType : LootBoxItem, entitiyID: {})", [entityId]);

    return LootBoxItem.load(entityId) as LootBoxItem;
  }
  let loadedLootBoxItem = new LootBoxItem(entityId);

  loadedLootBoxItem.gearItem = initialValues.gearItem;
  loadedLootBoxItem.rangeStart = initialValues.rangeStart;
  loadedLootBoxItem.rangeEnd = initialValues.rangeEnd;

  loadedLootBoxItem.save();

  return loadedLootBoxItem;
}

export function getOrInitializeLootBoxItem(entityId: string, initialValues: LootBoxItemInitialValues): GetOrCreateReturn<LootBoxItem> {
  entityId = ensureEntityIdHasCorrectPrefix(entityId);
  let loadedLootBoxItem = LootBoxItem.load(entityId);

  let returnObject: GetOrCreateReturn<LootBoxItem>;

  if (loadedLootBoxItem == null) {
    returnObject = new GetOrCreateReturn<LootBoxItem>(createLootBoxItem(entityId, initialValues), true);
  } else {
    returnObject = new GetOrCreateReturn<LootBoxItem>(loadedLootBoxItem as LootBoxItem, false);
  }

  return returnObject;
}

export function doesLootBoxItemExist(entityId: string): boolean {
  entityId = ensureEntityIdHasCorrectPrefix(entityId);
  return LootBoxItem.load(entityId) != null;
}

export function getLootBoxItem(entityId: string): LootBoxItem {
  entityId = ensureEntityIdHasCorrectPrefix(entityId);
  let loadedLootBoxItem = LootBoxItem.load(entityId);

  if (loadedLootBoxItem == null) {
      log.warning("GRAPH UNCRASHABLE WARNING: Unable to find entity of type LootBoxItem with id {}. If this entity hasn't been initialized use the 'getOrInitializeLootBoxItem' and handle the case that it needs to be initialized.", [entityId])

    return getOrInitializeLootBoxItemDefault(entityId);
  }

  return loadedLootBoxItem as LootBoxItem;
}


function getOrInitializeDungeonFinalizedDefault(entityId: string = "UNINITIALISED - DungeonFinalized"): DungeonFinalized {
  entityId = ensureEntityIdHasCorrectPrefix(entityId);
  let loadedDungeonFinalized = DungeonFinalized.load(entityId);

  if (loadedDungeonFinalized == null) {
    loadedDungeonFinalized = new DungeonFinalized(entityId);
    
    loadedDungeonFinalized.dungeonId = BigInt.zero();
    loadedDungeonFinalized.won = false;
    loadedDungeonFinalized.owner = Bytes.fromHexString("0x00") as Bytes;
    loadedDungeonFinalized.save();

    return loadedDungeonFinalized;
  } else{
    return loadedDungeonFinalized;
  }
}
export class DungeonFinalizedInitialValues {
  dungeonId: BigInt;
  won: boolean;
  owner: Bytes;
}

export function createDungeonFinalized(entityId: string, initialValues: DungeonFinalizedInitialValues): DungeonFinalized {
  entityId = ensureEntityIdHasCorrectPrefix(entityId);
  if (false && DungeonFinalized.load(entityId) != null) {
      log.warning("GRAPH UNCRASHABLE WARNING: Trying to create an entity that already exists. (entityType : DungeonFinalized, entitiyID: {})", [entityId]);

    return DungeonFinalized.load(entityId) as DungeonFinalized;
  }
  let loadedDungeonFinalized = new DungeonFinalized(entityId);

  loadedDungeonFinalized.dungeonId = initialValues.dungeonId;
  loadedDungeonFinalized.won = initialValues.won;
  loadedDungeonFinalized.owner = initialValues.owner;

  loadedDungeonFinalized.save();

  return loadedDungeonFinalized;
}

export function getOrInitializeDungeonFinalized(entityId: string, initialValues: DungeonFinalizedInitialValues): GetOrCreateReturn<DungeonFinalized> {
  entityId = ensureEntityIdHasCorrectPrefix(entityId);
  let loadedDungeonFinalized = DungeonFinalized.load(entityId);

  let returnObject: GetOrCreateReturn<DungeonFinalized>;

  if (loadedDungeonFinalized == null) {
    returnObject = new GetOrCreateReturn<DungeonFinalized>(createDungeonFinalized(entityId, initialValues), true);
  } else {
    returnObject = new GetOrCreateReturn<DungeonFinalized>(loadedDungeonFinalized as DungeonFinalized, false);
  }

  return returnObject;
}

export function doesDungeonFinalizedExist(entityId: string): boolean {
  entityId = ensureEntityIdHasCorrectPrefix(entityId);
  return DungeonFinalized.load(entityId) != null;
}

export function getDungeonFinalized(entityId: string): DungeonFinalized {
  entityId = ensureEntityIdHasCorrectPrefix(entityId);
  let loadedDungeonFinalized = DungeonFinalized.load(entityId);

  if (loadedDungeonFinalized == null) {
      log.warning("GRAPH UNCRASHABLE WARNING: Unable to find entity of type DungeonFinalized with id {}. If this entity hasn't been initialized use the 'getOrInitializeDungeonFinalized' and handle the case that it needs to be initialized.", [entityId])

    return getOrInitializeDungeonFinalizedDefault(entityId);
  }

  return loadedDungeonFinalized as DungeonFinalized;
}


function getOrInitializeDungeonPlayedDefault(entityId: string = "UNINITIALISED - DungeonPlayed"): DungeonPlayed {
  entityId = ensureEntityIdHasCorrectPrefix(entityId);
  let loadedDungeonPlayed = DungeonPlayed.load(entityId);

  if (loadedDungeonPlayed == null) {
    loadedDungeonPlayed = new DungeonPlayed(entityId);
    
    loadedDungeonPlayed.dungeonId = BigInt.zero();
    loadedDungeonPlayed.owner = Bytes.fromHexString("0x00") as Bytes;
    loadedDungeonPlayed.save();

    return loadedDungeonPlayed;
  } else{
    return loadedDungeonPlayed;
  }
}
export class DungeonPlayedInitialValues {
  dungeonId: BigInt;
  owner: Bytes;
}

export function createDungeonPlayed(entityId: string, initialValues: DungeonPlayedInitialValues): DungeonPlayed {
  entityId = ensureEntityIdHasCorrectPrefix(entityId);
  if (false && DungeonPlayed.load(entityId) != null) {
      log.warning("GRAPH UNCRASHABLE WARNING: Trying to create an entity that already exists. (entityType : DungeonPlayed, entitiyID: {})", [entityId]);

    return DungeonPlayed.load(entityId) as DungeonPlayed;
  }
  let loadedDungeonPlayed = new DungeonPlayed(entityId);

  loadedDungeonPlayed.dungeonId = initialValues.dungeonId;
  loadedDungeonPlayed.owner = initialValues.owner;

  loadedDungeonPlayed.save();

  return loadedDungeonPlayed;
}

export function getOrInitializeDungeonPlayed(entityId: string, initialValues: DungeonPlayedInitialValues): GetOrCreateReturn<DungeonPlayed> {
  entityId = ensureEntityIdHasCorrectPrefix(entityId);
  let loadedDungeonPlayed = DungeonPlayed.load(entityId);

  let returnObject: GetOrCreateReturn<DungeonPlayed>;

  if (loadedDungeonPlayed == null) {
    returnObject = new GetOrCreateReturn<DungeonPlayed>(createDungeonPlayed(entityId, initialValues), true);
  } else {
    returnObject = new GetOrCreateReturn<DungeonPlayed>(loadedDungeonPlayed as DungeonPlayed, false);
  }

  return returnObject;
}

export function doesDungeonPlayedExist(entityId: string): boolean {
  entityId = ensureEntityIdHasCorrectPrefix(entityId);
  return DungeonPlayed.load(entityId) != null;
}

export function getDungeonPlayed(entityId: string): DungeonPlayed {
  entityId = ensureEntityIdHasCorrectPrefix(entityId);
  let loadedDungeonPlayed = DungeonPlayed.load(entityId);

  if (loadedDungeonPlayed == null) {
      log.warning("GRAPH UNCRASHABLE WARNING: Unable to find entity of type DungeonPlayed with id {}. If this entity hasn't been initialized use the 'getOrInitializeDungeonPlayed' and handle the case that it needs to be initialized.", [entityId])

    return getOrInitializeDungeonPlayedDefault(entityId);
  }

  return loadedDungeonPlayed as DungeonPlayed;
}

