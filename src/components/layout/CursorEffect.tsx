import { useEffect, useState } from 'react'

export function CursorEffect() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [isPointer, setIsPointer] = useState(false)

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY })
      const target = e.target as HTMLElement
      setIsPointer(
        target?.tagName === 'A' ||
        target?.tagName === 'BUTTON' ||
        target?.closest('button') !== null ||
        target?.closest('a') !== null
      )
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  return (
    <>
      <div
        className="fixed pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        style={{
          left: pos.x - 4,
          top: pos.y - 4,
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: '#fff',
          transition: 'transform 0.1s ease-out, width 0.2s, height 0.2s',
          transform: `scale(${isPointer ? 2.5 : 1})`,
        }}
      />
      <div
        className="fixed pointer-events-none z-[9998] hidden md:block"
        style={{
          left: pos.x - 20,
          top: pos.y - 20,
          width: 40,
          height: 40,
          borderRadius: '50%',
          border: '1px solid rgba(124, 58, 237, 0.3)',
          transition: 'transform 0.3s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.2s',
          transform: `scale(${isPointer ? 1.5 : 1})`,
          opacity: isPointer ? 0.6 : 0.3,
        }}
      />
    </>
  )
}
