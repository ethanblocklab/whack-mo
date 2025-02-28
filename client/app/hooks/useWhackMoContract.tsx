import { useWriteContract } from 'wagmi'

const ABI = [
  {
    type: 'function',
    name: 'whackMo',
    inputs: [],
    outputs: [],
    stateMutability: 'nonpayable',
  },
]

// Custom hook for contract interaction
export default function useWhackMoleContract() {
  const { writeContract, isPending, isSuccess, isError, error, data } =
    useWriteContract()

  const whackMoleOnChain = () => {
    console.log('whackMoleOnChain')
    writeContract({
      address: '0x6f147867b9c56CbE5E95ccCA966493319b6c21e3',
      abi: ABI,
      functionName: 'whackMo',
      args: [],
    })
  }

  return { whackMoleOnChain, isPending, isSuccess, isError, error, data }
}
