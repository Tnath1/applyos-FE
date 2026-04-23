import { useEffect } from 'react'

let lockCount = 0
let previousOverflow = ''

export function useBodyScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) {
      return
    }

    const { body } = document

    if (lockCount === 0) {
      previousOverflow = body.style.overflow
      body.style.overflow = 'hidden'
    }

    lockCount += 1

    return () => {
      lockCount = Math.max(0, lockCount - 1)

      if (lockCount === 0) {
        body.style.overflow = previousOverflow
      }
    }
  }, [active])
}
