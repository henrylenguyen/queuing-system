import { useEffect, useState } from 'react'

const useDebounce = (value: any, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

export const useSearch = (initialValue: string, delay: number) => {
  const [input, setInput] = useState(initialValue)
  const debouncedInput = useDebounce(input.trim(), delay)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  return [debouncedInput, handleSearch] as const
}
