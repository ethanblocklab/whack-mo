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

// Custom hook for contract interaction
export default function useWhackMoleContract() {
  const { writeContract, isPending, isSuccess, isError, error, data } =
    useWriteContract()

  const whackMoleOnChain = () => {
    writeContract({
      address: '0x07A262a2181E12a7CB781f900dD4645174eb792B', // Same contract address
      abi: ABI,
      functionName: 'increment',
      args: [],
    })
  }

  return { whackMoleOnChain, isPending, isSuccess, isError, error, data }
}
