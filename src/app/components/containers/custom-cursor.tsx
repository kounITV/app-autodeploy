"use client"

import { useEffect, useState } from "react"

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isPointer, setIsPointer] = useState(false)
  const [isClicking, setIsClicking] = useState(false)

  useEffect(() => {
    const updateCursorPosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    const updateCursorType = () => {
      const hoveredElement = document.elementFromPoint(position.x, position.y)
      const computedStyle = hoveredElement ? window.getComputedStyle(hoveredElement).cursor : "auto"
      setIsPointer(computedStyle === "pointer")
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    window.addEventListener("mousemove", updateCursorPosition)
    window.addEventListener("mousemove", updateCursorType)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)

    return () => {
      window.removeEventListener("mousemove", updateCursorPosition)
      window.removeEventListener("mousemove", updateCursorType)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [position.x, position.y])

  return (
    <div
      className={`fixed pointer-events-none z-50 transition-transform duration-100 ${
        isClicking ? "scale-90" : "scale-100"
      }`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: "translate(-50%, -50%)",
      }}
    >
      <img
        src="/cursor.png"
        alt=""
        className={`w-4 h-4 transition-all ${isPointer ? "opacity-100 scale-110" : "opacity-90"}`}
        style={{
            transform: `rotate(${isPointer ? 0 : +20}deg) top: 50%; left: 50%;`,
          }}
      />
    </div>
  )
}

