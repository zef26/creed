// Cursor.jsx — Custom smooth cursor (desktop only)
import { useEffect, useRef, useState } from "react"

// Detect touch/coarse pointer — don't show custom cursor on mobile
const isCoarsePointer =
  typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches

export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const pos = useRef({ x: -100, y: -100 })
  const ringPos = useRef({ x: -100, y: -100 })
  const rafId = useRef(null)
  const [state, setState] = useState({ hidden: true, hovering: false, clicking: false })

  useEffect(() => {
    if (isCoarsePointer) return

    // Hide native cursor
    document.body.style.cursor = "none"

    const lerp = (a, b, t) => a + (b - a) * t

    const animate = () => {
      if (dotRef.current && ringRef.current) {
        // Ring follows with lag (lerp factor 0.11 = smooth but not too slow)
        ringPos.current.x = lerp(ringPos.current.x, pos.current.x, 0.11)
        ringPos.current.y = lerp(ringPos.current.y, pos.current.y, 0.11)

        dotRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`
        ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px) translate(-50%, -50%)`
      }
      rafId.current = requestAnimationFrame(animate)
    }

    rafId.current = requestAnimationFrame(animate)

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
      setState((s) => ({ ...s, hidden: false }))
    }
    const onLeave = () => setState((s) => ({ ...s, hidden: true }))
    const onEnter = () => setState((s) => ({ ...s, hidden: false }))
    const onDown = () => setState((s) => ({ ...s, clicking: true }))
    const onUp = () => setState((s) => ({ ...s, clicking: false }))

    const onOver = (e) => {
      if (e.target.closest("button, a, input, textarea, [data-cursor-hover]")) {
        setState((s) => ({ ...s, hovering: true }))
      }
    }
    const onOut = (e) => {
      if (e.target.closest("button, a, input, textarea, [data-cursor-hover]")) {
        setState((s) => ({ ...s, hovering: false }))
      }
    }

    document.addEventListener("mousemove", onMove, { passive: true })
    document.addEventListener("mouseleave", onLeave)
    document.addEventListener("mouseenter", onEnter)
    document.addEventListener("mousedown", onDown)
    document.addEventListener("mouseup", onUp)
    document.addEventListener("mouseover", onOver)
    document.addEventListener("mouseout", onOut)

    return () => {
      document.body.style.cursor = ""
      cancelAnimationFrame(rafId.current)
      document.removeEventListener("mousemove", onMove)
      document.removeEventListener("mouseleave", onLeave)
      document.removeEventListener("mouseenter", onEnter)
      document.removeEventListener("mousedown", onDown)
      document.removeEventListener("mouseup", onUp)
      document.removeEventListener("mouseover", onOver)
      document.removeEventListener("mouseout", onOut)
    }
  }, [])

  if (isCoarsePointer) return null

  const { hidden, hovering, clicking } = state
  const dotSize = clicking ? 5 : 7
  const ringSize = hovering ? 46 : clicking ? 26 : 34

  return (
    <>
      {/* Fast dot — snaps to cursor */}
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{
          width: dotSize,
          height: dotSize,
          background: "#0EA5E9",
          opacity: hidden ? 0 : 1,
          transition: "opacity 0.25s, width 0.12s, height 0.12s",
          boxShadow: "0 0 8px rgba(14,165,233,0.8)",
        }}
      />

      {/* Lagged ring */}
      <div
        ref={ringRef}
        className="cursor-ring"
        style={{
          width: ringSize,
          height: ringSize,
          border: `1px solid rgba(14,165,233,${hovering ? 0.7 : 0.35})`,
          background: hovering ? "rgba(14,165,233,0.07)" : "transparent",
          opacity: hidden ? 0 : 1,
          backdropFilter: hovering ? "blur(2px)" : "none",
          transition: "opacity 0.25s, width 0.35s cubic-bezier(0.16,1,0.3,1), height 0.35s cubic-bezier(0.16,1,0.3,1), border-color 0.3s, background 0.3s",
        }}
      />
    </>
  )
}
