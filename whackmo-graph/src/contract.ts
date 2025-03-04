import { MoWhacked as MoWhackedEvent } from "../generated/Contract/Contract"
import { MoWhacked } from "../generated/schema"

export function handleMoWhacked(event: MoWhackedEvent): void {
  let entity = new MoWhacked(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.player = event.params.player
  entity.points = event.params.points
  entity.newTotalPoints = event.params.newTotalPoints

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
