'use client'

import { useWriteContract } from 'wagmi'

const ABI = [
  {
    inputs: [],
    name: 'increment',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]

export default function IncreaseCounterButton() {
  const { data, writeContract, isPending, isSuccess, isError, error } =
    useWriteContract()

  const handleClick = () => {
    writeContract({
      address: '0x07A262a2181E12a7CB781f900dD4645174eb792B',
      abi: ABI,
      functionName: 'increment',
      args: [],
    })
  }

  return (
    <div>
      <p>Increase counter</p>
      <button disabled={!writeContract || isPending} onClick={handleClick}>
        {isPending ? 'Increasing...' : 'Increase'}
      </button>
      {isSuccess && (
        <div>
          Successfully increased counter!
          <div>
            <a href={`https://testnet.monadexplorer.com/tx/${data}`}>
              monadexplorer
            </a>
          </div>
        </div>
      )}
      {isError && (
        <div>
          <p>Error: {error?.message}</p>
        </div>
      )}
    </div>
  )
}
