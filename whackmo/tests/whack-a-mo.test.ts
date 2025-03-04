import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { MoWhacked } from "../generated/schema"
import { MoWhacked as MoWhackedEvent } from "../generated/WhackAMo/WhackAMo"
import { handleMoWhacked } from "../src/whack-a-mo"
import { createMoWhackedEvent } from "./whack-a-mo-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let player = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let points = BigInt.fromI32(234)
    let newTotalPoints = BigInt.fromI32(234)
    let newMoWhackedEvent = createMoWhackedEvent(player, points, newTotalPoints)
    handleMoWhacked(newMoWhackedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("MoWhacked created and stored", () => {
    assert.entityCount("MoWhacked", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "MoWhacked",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "player",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "MoWhacked",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "points",
      "234"
    )
    assert.fieldEquals(
      "MoWhacked",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "newTotalPoints",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
