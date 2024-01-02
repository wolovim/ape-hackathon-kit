import { useEffect, useState } from 'react'
import { Abi } from "viem";


export function parseAbi(abiJsonString: string) {
    try {
        return JSON.parse(abiJsonString) as Abi;
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
