import { useEffect, useRef } from 'react'

export function useParallax(speed = 0.1) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const handleMouse = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      const x = (clientX / innerWidth - 0.5) * speed * 100
      const y = (clientY / innerHeight - 0.5) * speed * 100
      node.style.transform = `translate(${x}px, ${y}px)`
    }

    window.addEventListener('mousemove', handleMouse)
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [speed])

  return ref
}
