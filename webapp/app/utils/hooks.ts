import { Abi } from "viem";
import { Address, useContractRead, useContractReads } from "wagmi";
import { parseAbi } from "@/app/utils/utils";

// useWorkshopFunction hook to call a contract method
// useful for calling a contract view function in an event handler such as onClick
// 
export function useWorkshopFunction(address: Address, functionName: string) {
    let eventAbi: Abi = [];
    if (process.env.NEXT_PUBLIC_EVENT_ABI) {
      eventAbi = parseAbi(process.env.NEXT_PUBLIC_EVENT_ABI);
    }

    // Refetch function that calls the contract method with functionName
    const { refetch } = useContractRead({
      address,
      abi: eventAbi,
      functionName,
      enabled: false, // Don't call the function on render
    });

    return refetch;
}

// useWorkshopMetadata hook to fetch metadata about a workshop
// call the desired view functions and return all results in an object
export function useWorkshopMetadata(address: Address, functionNames: string[]) {
    let eventAbi: Abi = [];
    if (process.env.NEXT_PUBLIC_EVENT_ABI) {
      eventAbi = parseAbi(process.env.NEXT_PUBLIC_EVENT_ABI);
    }

    const contracts = functionNames.map((fn) => ({
        address,
        abi: eventAbi,
        functionName: fn,
    }));

    const { data } = useContractReads({
        contracts,
        onError: (e) => {
            // Failed to read from contract
            console.log(e);
        }
    });

    const workshop: { [key: string]: string | string[] | {} } = {};
    // Results for each contract method are pushed to an array in order
    data?.map((response, i) => {
        if (response.error) {
            console.log(response.error);
        }

        workshop[functionNames[i]] = response.result ? response.result : "";
    });

    return workshop;
}