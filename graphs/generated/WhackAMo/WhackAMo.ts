// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt,
} from "@graphprotocol/graph-ts";

export class MoWhacked extends ethereum.Event {
  get params(): MoWhacked__Params {
    return new MoWhacked__Params(this);
  }
}

export class MoWhacked__Params {
  _event: MoWhacked;

  constructor(event: MoWhacked) {
    this._event = event;
  }

  get player(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get points(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get newTotalPoints(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class WhackAMo extends ethereum.SmartContract {
  static bind(address: Address): WhackAMo {
    return new WhackAMo("WhackAMo", address);
  }

  getPoints(player: Address): BigInt {
    let result = super.call("getPoints", "getPoints(address):(uint256)", [
      ethereum.Value.fromAddress(player),
    ]);

    return result[0].toBigInt();
  }

  try_getPoints(player: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall("getPoints", "getPoints(address):(uint256)", [
      ethereum.Value.fromAddress(player),
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  playerPoints(param0: Address): BigInt {
    let result = super.call("playerPoints", "playerPoints(address):(uint256)", [
      ethereum.Value.fromAddress(param0),
    ]);

    return result[0].toBigInt();
  }

  try_playerPoints(param0: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "playerPoints",
      "playerPoints(address):(uint256)",
      [ethereum.Value.fromAddress(param0)],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }
}

export class WhackMoCall extends ethereum.Call {
  get inputs(): WhackMoCall__Inputs {
    return new WhackMoCall__Inputs(this);
  }

  get outputs(): WhackMoCall__Outputs {
    return new WhackMoCall__Outputs(this);
  }
}

export class WhackMoCall__Inputs {
  _call: WhackMoCall;

  constructor(call: WhackMoCall) {
    this._call = call;
  }
}

export class WhackMoCall__Outputs {
  _call: WhackMoCall;

  constructor(call: WhackMoCall) {
    this._call = call;
  }
}
