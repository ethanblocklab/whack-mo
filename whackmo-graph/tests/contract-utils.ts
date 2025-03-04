import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import { MoWhacked } from "../generated/Contract/Contract"

export function createMoWhackedEvent(
  player: Address,
  points: BigInt,
  newTotalPoints: BigInt
): MoWhacked {
  let moWhackedEvent = changetype<MoWhacked>(newMockEvent())

  moWhackedEvent.parameters = new Array()

  moWhackedEvent.parameters.push(
    new ethereum.EventParam("player", ethereum.Value.fromAddress(player))
  )
  moWhackedEvent.parameters.push(
    new ethereum.EventParam("points", ethereum.Value.fromUnsignedBigInt(points))
  )
  moWhackedEvent.parameters.push(
    new ethereum.EventParam(
      "newTotalPoints",
      ethereum.Value.fromUnsignedBigInt(newTotalPoints)
    )
  )

  return moWhackedEvent
}
