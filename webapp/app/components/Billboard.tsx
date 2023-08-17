"use client";

import { useState } from "react";
import { parseAbi, useDebounce } from "@/app/utils/utils";
import { Abi } from "viem";
import {
  Address,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";

export function Billboard() {
  const [messageInput, setMessageInput] = useState('')
  const debouncedMessageInput = useDebounce(messageInput, 500)

  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as Address;
  let contractAbi;
  if (process.env.NEXT_PUBLIC_CONTRACT_ABI) {
    contractAbi = parseAbi(process.env.NEXT_PUBLIC_CONTRACT_ABI);
  }

  const { data: msg, } = useContractRead({
    address: contractAddress,
    abi: contractAbi as Abi,
    functionName: "getMessage",
    watch: true
  });
  const message = msg as string;

  const { config } = usePrepareContractWrite({
    address: contractAddress,
    abi: contractAbi,
    functionName: "setMessage",
    args: [debouncedMessageInput],
    enabled: Boolean(debouncedMessageInput)
  });
  const { data, write } = useContractWrite(config);
  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  return (
    <div className="bg-white shadow-md border border-gray-200 rounded-lg p-4 m-4">
      <p className="text-4xl font-bold tracking-tight p-4 ">
        {message}
      </p>

      <form onSubmit={(e) => {
        e.preventDefault();
        write?.();
      }}>
        <label className="block text-sm font-medium leading-6 text-gray-900">New Message:</label>
        <input
          className="block w-full my-4 rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
          id="msgInput"
          onChange={(e) => setMessageInput(e.target.value)}
          placeholder="gn"
          value={messageInput}
        />
        <button
          className="inline-flex items-center rounded-md bg-white px-6 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          disabled={!write || isLoading}
        >
          {isLoading ? "Updating..." : "Save"}
        </button>
        {isSuccess && (
          <div className="bg-green-50 border border-green-200 rounded-lg shadow-md p-4 mt-4">
            <div className="text-gray-700 font-bold">
              Successfully updated!
            </div>
            <div className="text-gray-700 italic">
              tx hash: {data?.hash.slice(0, 6)}...{data?.hash.slice(-4)}
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
