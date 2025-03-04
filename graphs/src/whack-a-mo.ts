import { MoWhacked as MoWhackedEvent } from '../generated/WhackAMo/WhackAMo'
import { MoWhacked, Leaderboard } from '../generated/schema'

export function handleMoWhacked(event: MoWhackedEvent): void {
  let entity = new MoWhacked(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.player = event.params.player
  entity.points = event.params.points
  entity.newTotalPoints = event.params.newTotalPoints

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleLeaderboardUpdate(event: MoWhackedEvent): void {
  let entity = Leaderboard.load(event.params.player)
  if (!entity) {
    entity = new Leaderboard(event.params.player)
    entity.points = event.params.newTotalPoints
  } else {
    entity.points = event.params.newTotalPoints
  }

  entity.save()
}
