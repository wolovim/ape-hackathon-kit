import { useEffect, useState } from 'react'
import { Abi } from "viem";


export function parseAbi(abiJsonString: string) {
    try {
        // Contract output from ape is not valid JSON but replacing a few things can make it so
        return JSON.parse(abiJsonString.replace(/'/g, '"').replace(/True/g, 'true').replace(/False/g, 'false')) as Abi;
    } catch (e) {
        console.log(e);
        return [] as Abi;
    }
}

export function useDebounce<T>(value: T, delay?: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value)

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(value), delay || 500)

        return () => {
            clearTimeout(timer)
        }
    }, [value, delay])

    return debouncedValue
}
