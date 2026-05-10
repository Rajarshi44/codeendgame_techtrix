'use client'

import { useState, useEffect } from 'react'
import { CountdownValues } from '@/types'

export function useCountdown(targetDate: Date): CountdownValues {
  const [values, setValues] = useState<CountdownValues>({
    days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: false,
  })

  useEffect(() => {
    function compute() {
      const diff = targetDate.getTime() - Date.now()
      if (diff <= 0) {
        setValues({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true })
        return
      }
      const totalSeconds = Math.floor(diff / 1000)
      setValues({
        days:     Math.floor(totalSeconds / 86400),
        hours:    Math.floor((totalSeconds % 86400) / 3600),
        minutes:  Math.floor((totalSeconds % 3600) / 60),
        seconds:  totalSeconds % 60,
        isExpired: false,
      })
    }

    compute()
    const id = setInterval(compute, 1000)
    return () => clearInterval(id)
  }, [targetDate])

  return values
}
