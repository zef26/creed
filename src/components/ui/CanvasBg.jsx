// CanvasBg.jsx — decorative canvas background animations for each section
// variants: "neural" | "radar" | "matrix" | "signal" | "orbit"
import { useEffect, useRef } from "react"

// ─── Shared utils ──────────────────────────────────────────────
const lerp   = (a, b, t) => a + (b - a) * t
const rand   = (a, b)    => a + Math.random() * (b - a)
const ACCENT = "#0EA5E9"
const GREEN  = "#4ade80"
const PINK   = "#f472b6"
const PURPLE = "#a78bfa"

// ══════════════════════════════════════════════════════════════
//  NEURAL — floating nodes connected by glowing lines
// ══════════════════════════════════════════════════════════════
function runNeural(canvas, ctx) {
  let W, H, nodes, rafId

  const NODE_COUNT = 28
  const MAX_DIST   = 160

  function init() {
    W = canvas.width  = canvas.offsetWidth
    H = canvas.height = canvas.offsetHeight
    nodes = Array.from({ length: NODE_COUNT }, () => ({
      x:  rand(0, W), y:  rand(0, H),
      vx: rand(-0.25, 0.25), vy: rand(-0.25, 0.25),
      r:  rand(1.5, 3),
      pulse: rand(0, Math.PI * 2),
    }))
  }

  function draw(t) {
    ctx.clearRect(0, 0, W, H)

    // connections
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j]
        const d = Math.hypot(a.x - b.x, a.y - b.y)
        if (d > MAX_DIST) continue
        const alpha = (1 - d / MAX_DIST) * 0.18
        ctx.beginPath()
        ctx.moveTo(a.x, a.y)
        ctx.lineTo(b.x, b.y)
        ctx.strokeStyle = `rgba(14,165,233,${alpha})`
        ctx.lineWidth = 1
        ctx.stroke()
      }
    }

    // nodes
    nodes.forEach(n => {
      n.pulse += 0.018
      const glow = 0.4 + Math.sin(n.pulse) * 0.25
      ctx.save()
      ctx.shadowBlur  = 8
      ctx.shadowColor = ACCENT
      ctx.beginPath()
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(14,165,233,${glow})`
      ctx.fill()
      ctx.restore()

      // move & bounce
      n.x += n.vx; n.y += n.vy
      if (n.x < 0 || n.x > W) n.vx *= -1
      if (n.y < 0 || n.y > H) n.vy *= -1
    })

    rafId = requestAnimationFrame(draw)
  }

  init()
  rafId = requestAnimationFrame(draw)
  return () => cancelAnimationFrame(rafId)
}

// ══════════════════════════════════════════════════════════════
//  RADAR — concentric sonar rings + sweeping beam
// ══════════════════════════════════════════════════════════════
function runRadar(canvas, ctx) {
  let W, H, rafId

  function init() {
    W = canvas.width  = canvas.offsetWidth
    H = canvas.height = canvas.offsetHeight
  }

  let angle = 0

  function draw() {
    ctx.clearRect(0, 0, W, H)

    const cx = W * 0.72, cy = H * 0.5
    const maxR = Math.min(W, H) * 0.42

    // rings
    for (let i = 1; i <= 4; i++) {
      const r = (i / 4) * maxR
      ctx.beginPath()
      ctx.arc(cx, cy, r, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(14,165,233,${0.07 - i * 0.01})`
      ctx.lineWidth = 1
      ctx.stroke()
    }

    // cross hairs
    ctx.strokeStyle = "rgba(14,165,233,0.06)"
    ctx.lineWidth = 1
    ctx.beginPath(); ctx.moveTo(cx - maxR, cy); ctx.lineTo(cx + maxR, cy); ctx.stroke()
    ctx.beginPath(); ctx.moveTo(cx, cy - maxR); ctx.lineTo(cx, cy + maxR); ctx.stroke()

    // sweep gradient
    const sweep = ctx.createConicalGradient
      ? null // not universally supported
      : null

    // manual sweep arc
    const sweepLen = Math.PI * 0.55
    for (let s = 0; s < 32; s++) {
      const a = angle - (s / 32) * sweepLen
      const alpha = ((32 - s) / 32) * 0.12
      ctx.beginPath()
      ctx.moveTo(cx, cy)
      ctx.arc(cx, cy, maxR, a, a + sweepLen / 32)
      ctx.closePath()
      ctx.fillStyle = `rgba(14,165,233,${alpha})`
      ctx.fill()
    }

    // sweep tip dot
    ctx.save()
    ctx.shadowBlur  = 16
    ctx.shadowColor = ACCENT
    ctx.beginPath()
    ctx.arc(
      cx + Math.cos(angle) * maxR,
      cy + Math.sin(angle) * maxR,
      3, 0, Math.PI * 2
    )
    ctx.fillStyle = ACCENT
    ctx.fill()
    ctx.restore()

    // random blips
    if (Math.random() < 0.008) {
      const br = rand(maxR * 0.2, maxR * 0.85)
      const ba = rand(0, Math.PI * 2)
      ctx.save()
      ctx.shadowBlur  = 12
      ctx.shadowColor = GREEN
      ctx.beginPath()
      ctx.arc(cx + Math.cos(ba) * br, cy + Math.sin(ba) * br, 2.5, 0, Math.PI * 2)
      ctx.fillStyle = GREEN
      ctx.fill()
      ctx.restore()
    }

    angle += 0.012
    rafId = requestAnimationFrame(draw)
  }

  init()
  rafId = requestAnimationFrame(draw)
  return () => cancelAnimationFrame(rafId)
}

// ══════════════════════════════════════════════════════════════
//  MATRIX — falling katakana / code chars
// ══════════════════════════════════════════════════════════════
function runMatrix(canvas, ctx) {
  let W, H, cols, drops, rafId

  const CHARS  = "01アイウエオカキクケコサシスセソタチツテトナニヌネノ{}[]()<>/\\|=+-*&^%$#@!?"
  const FSIZE  = 14

  function init() {
    W = canvas.width  = canvas.offsetWidth
    H = canvas.height = canvas.offsetHeight
    cols  = Math.floor(W / FSIZE)
    drops = Array.from({ length: cols }, () => rand(-H / FSIZE, 0))
  }

  function draw() {
    ctx.fillStyle = "rgba(7,12,20,0.12)"
    ctx.fillRect(0, 0, W, H)

    ctx.font = `${FSIZE}px monospace`

    drops.forEach((y, i) => {
      const char  = CHARS[Math.floor(Math.random() * CHARS.length)]
      const alpha = rand(0.04, 0.13)
      // leading char slightly brighter
      ctx.fillStyle = `rgba(14,165,233,${alpha * 2.5})`
      ctx.fillText(char, i * FSIZE, y * FSIZE)

      drops[i] += 1
      if (drops[i] * FSIZE > H && Math.random() > 0.975) drops[i] = 0
    })

    rafId = requestAnimationFrame(draw)
  }

  init()
  rafId = requestAnimationFrame(draw)
  return () => cancelAnimationFrame(rafId)
}

// ══════════════════════════════════════════════════════════════
//  SIGNAL — sine wave radio pulses
// ══════════════════════════════════════════════════════════════
function runSignal(canvas, ctx) {
  let W, H, rafId

  function init() {
    W = canvas.width  = canvas.offsetWidth
    H = canvas.height = canvas.offsetHeight
  }

  const waves = [
    { amp: 28, freq: 0.018, speed: 0.022, color: ACCENT,  alpha: 0.25, yOff: 0    },
    { amp: 18, freq: 0.028, speed: 0.035, color: GREEN,   alpha: 0.15, yOff: 30   },
    { amp: 22, freq: 0.013, speed: 0.016, color: PURPLE,  alpha: 0.12, yOff: -25  },
    { amp: 12, freq: 0.038, speed: 0.048, color: PINK,    alpha: 0.10, yOff: 15   },
  ]
  let t = 0

  function draw() {
    ctx.clearRect(0, 0, W, H)
    const cy = H * 0.5

    waves.forEach(w => {
      ctx.beginPath()
      for (let x = 0; x <= W; x += 2) {
        const y = cy + w.yOff + Math.sin(x * w.freq + t * w.speed) * w.amp
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
      }
      ctx.strokeStyle = w.color + Math.round(w.alpha * 255).toString(16).padStart(2, "0")
      ctx.lineWidth = 1.5
      ctx.shadowBlur  = 10
      ctx.shadowColor = w.color
      ctx.stroke()
    })

    // expanding pulse rings from left
    const pulseR = (t * 1.2) % (H * 0.9)
    const pulseAlpha = Math.max(0, 0.12 - pulseR / (H * 8))
    ctx.beginPath()
    ctx.arc(0, cy, pulseR, -Math.PI / 2, Math.PI / 2)
    ctx.strokeStyle = `rgba(14,165,233,${pulseAlpha})`
    ctx.lineWidth = 1
    ctx.stroke()

    t++
    rafId = requestAnimationFrame(draw)
  }

  init()
  rafId = requestAnimationFrame(draw)
  return () => cancelAnimationFrame(rafId)
}

// ══════════════════════════════════════════════════════════════
//  ORBIT — particles orbiting invisible centres
// ══════════════════════════════════════════════════════════════
function runOrbit(canvas, ctx) {
  let W, H, systems, rafId

  function init() {
    W = canvas.width  = canvas.offsetWidth
    H = canvas.height = canvas.offsetHeight

    systems = Array.from({ length: 4 }, (_, i) => ({
      cx:     W * (0.18 + i * 0.22),
      cy:     H * rand(0.3, 0.7),
      rings:  Array.from({ length: 2 + Math.floor(Math.random() * 2) }, (__, r) => ({
        radius: 30 + r * rand(25, 45),
        speed:  rand(0.003, 0.009) * (r % 2 === 0 ? 1 : -1),
        count:  2 + r,
        color:  [ACCENT, GREEN, PINK, PURPLE][Math.floor(Math.random() * 4)],
        phase:  rand(0, Math.PI * 2),
      })),
    }))
  }

  let t = 0

  function draw() {
    ctx.clearRect(0, 0, W, H)

    systems.forEach(sys => {
      sys.rings.forEach(ring => {
        // orbit path
        ctx.beginPath()
        ctx.arc(sys.cx, sys.cy, ring.radius, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(14,165,233,0.05)`
        ctx.lineWidth = 1
        ctx.stroke()

        // particles on orbit
        for (let p = 0; p < ring.count; p++) {
          const a = ring.phase + t * ring.speed + (p / ring.count) * Math.PI * 2
          const px = sys.cx + Math.cos(a) * ring.radius
          const py = sys.cy + Math.sin(a) * ring.radius

          ctx.save()
          ctx.shadowBlur  = 10
          ctx.shadowColor = ring.color
          ctx.beginPath()
          ctx.arc(px, py, 2.5, 0, Math.PI * 2)
          ctx.fillStyle = ring.color + "99"
          ctx.fill()
          ctx.restore()
        }
      })

      // core dot
      ctx.save()
      ctx.shadowBlur  = 15
      ctx.shadowColor = ACCENT
      ctx.beginPath()
      ctx.arc(sys.cx, sys.cy, 3, 0, Math.PI * 2)
      ctx.fillStyle = "rgba(14,165,233,0.4)"
      ctx.fill()
      ctx.restore()
    })

    t++
    rafId = requestAnimationFrame(draw)
  }

  init()
  rafId = requestAnimationFrame(draw)
  return () => cancelAnimationFrame(rafId)
}

// ══════════════════════════════════════════════════════════════
//  SERVICES BG — floating code tokens drifting upward
// ══════════════════════════════════════════════════════════════
function runCode(canvas, ctx) {
  let W, H, tokens, rafId

  const SNIPPETS = [
    "const", "=>", "async", "await", "return", "export",
    "import", "class", "function", "useEffect", "useState",
    ".map()", ".filter()", "API", "REST", "SQL", "GET", "POST",
    "{}","[]","</>","==","!==","&&","||","++","--",
    "React", "Flutter", "Python", "Node", "1C", "SQL",
  ]

  function init() {
    W = canvas.width  = canvas.offsetWidth
    H = canvas.height = canvas.offsetHeight
    tokens = Array.from({ length: 22 }, () => makeToken())
  }

  function makeToken() {
    return {
      x:     rand(0, W),
      y:     rand(0, H),
      text:  SNIPPETS[Math.floor(Math.random() * SNIPPETS.length)],
      speed: rand(0.15, 0.45),
      alpha: rand(0.04, 0.11),
      size:  Math.floor(rand(10, 16)),
      color: [ACCENT, GREEN, PURPLE, PINK][Math.floor(Math.random() * 4)],
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H)

    tokens.forEach(tok => {
      ctx.save()
      ctx.globalAlpha = tok.alpha
      ctx.font        = `${tok.size}px monospace`
      ctx.fillStyle   = tok.color
      ctx.fillText(tok.text, tok.x, tok.y)
      ctx.restore()

      tok.y -= tok.speed
      if (tok.y < -20) { tok.y = H + 10; tok.x = rand(0, W) }
    })

    rafId = requestAnimationFrame(draw)
  }

  init()
  rafId = requestAnimationFrame(draw)
  return () => cancelAnimationFrame(rafId)
}

// ══════════════════════════════════════════════════════════════
//  PORTFOLIO BG — slow diagonal scan lines + glitch dots
// ══════════════════════════════════════════════════════════════
function runScan(canvas, ctx) {
  let W, H, rafId
  let scanY = 0

  function init() {
    W = canvas.width  = canvas.offsetWidth
    H = canvas.height = canvas.offsetHeight
  }

  function draw() {
    ctx.clearRect(0, 0, W, H)

    // horizontal scan beam
    const grad = ctx.createLinearGradient(0, scanY - 60, 0, scanY + 60)
    grad.addColorStop(0,   "rgba(14,165,233,0)")
    grad.addColorStop(0.5, "rgba(14,165,233,0.06)")
    grad.addColorStop(1,   "rgba(14,165,233,0)")
    ctx.fillStyle = grad
    ctx.fillRect(0, scanY - 60, W, 120)

    // thin bright line
    ctx.beginPath()
    ctx.moveTo(0, scanY)
    ctx.lineTo(W, scanY)
    ctx.strokeStyle = "rgba(14,165,233,0.15)"
    ctx.lineWidth = 1
    ctx.stroke()

    // random glitch dots along scan line
    if (Math.random() < 0.3) {
      for (let g = 0; g < 3; g++) {
        const gx = rand(0, W)
        ctx.beginPath()
        ctx.arc(gx, scanY + rand(-4, 4), rand(1, 3), 0, Math.PI * 2)
        ctx.fillStyle = `rgba(14,165,233,${rand(0.2, 0.5)})`
        ctx.fill()
      }
    }

    // corner brackets decoration
    const bSize = 18, bOff = 12
    ctx.strokeStyle = "rgba(14,165,233,0.08)"
    ctx.lineWidth = 1.5
    const corners = [[bOff, bOff], [W - bOff, bOff], [bOff, H - bOff], [W - bOff, H - bOff]]
    corners.forEach(([cx, cy]) => {
      const sx = cx === bOff ? 1 : -1
      const sy = cy === bOff ? 1 : -1
      ctx.beginPath()
      ctx.moveTo(cx, cy + sy * bSize)
      ctx.lineTo(cx, cy)
      ctx.lineTo(cx + sx * bSize, cy)
      ctx.stroke()
    })

    scanY += 0.6
    if (scanY > H + 60) scanY = -60

    rafId = requestAnimationFrame(draw)
  }

  init()
  rafId = requestAnimationFrame(draw)
  return () => cancelAnimationFrame(rafId)
}

// ══════════════════════════════════════════════════════════════
//  RUNNER MAP
// ══════════════════════════════════════════════════════════════
const RUNNERS = {
  neural:  runNeural,
  radar:   runRadar,
  matrix:  runMatrix,
  signal:  runSignal,
  orbit:   runOrbit,
  code:    runCode,
  scan:    runScan,
}

// ══════════════════════════════════════════════════════════════
//  COMPONENT
// ══════════════════════════════════════════════════════════════
export default function CanvasBg({ variant = "neural", opacity = 1, className = "" }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx    = canvas.getContext("2d")
    const runner = RUNNERS[variant]
    if (!runner) return

    let cleanup = runner(canvas, ctx)

    const ro = new ResizeObserver(() => {
      cleanup?.()
      cleanup = runner(canvas, ctx)
    })
    ro.observe(canvas)

    return () => {
      cleanup?.()
      ro.disconnect()
    }
  }, [variant])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ opacity }}
    />
  )
}
