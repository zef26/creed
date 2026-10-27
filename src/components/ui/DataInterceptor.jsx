// DataInterceptor.jsx — cyberpunk tentacle creature that intercepts incoming data packets
import { useEffect, useRef } from "react"
import { useLanguage } from "../../context/LanguageContext"

const COLORS = ["#0EA5E9", "#38BDF8", "#4ade80", "#f472b6", "#fb923c", "#a78bfa"]

function dist(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y)
}

// ─── Particle burst on eat ────────────────────────────────────
class Particle {
  constructor(x, y, color) {
    this.x = x
    this.y = y
    this.color = color
    this.vx = (Math.random() - 0.5) * 8
    this.vy = (Math.random() - 0.5) * 8
    this.r  = 2 + Math.random() * 4
    this.life  = 1
    this.decay = 0.03 + Math.random() * 0.04
  }
  update() {
    this.x   += this.vx
    this.y   += this.vy
    this.vx  *= 0.93
    this.vy  *= 0.93
    this.life -= this.decay
  }
  draw(ctx) {
    ctx.save()
    ctx.globalAlpha = Math.max(0, this.life)
    ctx.shadowBlur  = 12
    ctx.shadowColor = this.color
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
    ctx.fillStyle = this.color
    ctx.fill()
    ctx.restore()
  }
}

// ─── Incoming data packet ─────────────────────────────────────
class Packet {
  constructor(W, H, delayed = false) {
    this.W     = W
    this.H     = H
    this.x     = W + 30 + (delayed ? Math.random() * W * 0.6 : 0)
    this.baseY = H * 0.18 + Math.random() * H * 0.64
    this.y     = this.baseY
    this.speed = 1.4 + Math.random() * 2.2
    this.r     = 7 + Math.random() * 9
    this.phase = Math.random() * Math.PI * 2
    this.amp   = 28 + Math.random() * 65
    this.freq  = 0.013 + Math.random() * 0.022
    this.color = COLORS[Math.floor(Math.random() * COLORS.length)]
    this.alive      = true
    this.beingHunted = false
    this.eaten      = false
    this.t          = 0
    // trail
    this.trail = []
  }
  update() {
    this.t++
    this.trail.push({ x: this.x, y: this.y })
    if (this.trail.length > 12) this.trail.shift()
    this.x -= this.speed
    this.y  = this.baseY + Math.sin(this.phase + this.t * this.freq) * this.amp
  }
  draw(ctx) {
    // trail
    for (let i = 0; i < this.trail.length; i++) {
      const a = (i / this.trail.length) * 0.35
      ctx.beginPath()
      ctx.arc(this.trail[i].x, this.trail[i].y, this.r * (i / this.trail.length) * 0.7, 0, Math.PI * 2)
      ctx.fillStyle = this.color + Math.floor(a * 255).toString(16).padStart(2, "0")
      ctx.fill()
    }
    // glow halo
    ctx.save()
    ctx.shadowBlur  = 22
    ctx.shadowColor = this.color
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
    ctx.fillStyle = this.color + "33"
    ctx.fill()
    // core
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.r * 0.55, 0, Math.PI * 2)
    ctx.fillStyle = this.color
    ctx.fill()
    ctx.restore()
  }
}

// ─── Tentacle arm ─────────────────────────────────────────────
class Tentacle {
  constructor(ax, ay, rx, ry, idx) {
    this.anchor = { x: ax, y: ay }
    this.rest   = { x: rx, y: ry }
    this.tip    = { x: rx, y: ry }
    this.target = null
    this.eating = false
    this.eatProg = 0
    this.idx    = idx
    this.phase  = idx * 0.82
    this.color  = COLORS[idx % COLORS.length]
    this.eatCallback = null   // set by owner to spawn particles
  }

  hunt(packets) {
    if (this.target || this.eating) return
    // prioritise closest packet that is coming fast (lowest x wins among unhunted)
    let best = null
    let minD = 9999
    for (const p of packets) {
      if (!p.alive || p.beingHunted) continue
      const d = dist(this.anchor, p)
      if (d < 520 && d < minD) { minD = d; best = p }
    }
    if (best) { this.target = best; best.beingHunted = true }
  }

  update(t) {
    const wave = Math.sin(t * 0.0012 + this.phase)
    let tx, ty

    if (this.target && this.target.alive) {
      // lead the target slightly based on its speed so tip arrives ahead
      tx = this.target.x - this.target.speed * 4
      ty = this.target.y
      if (dist(this.tip, this.target) < this.target.r + 14) {
        this.target.eaten = true
        this.target.alive = false
        if (this.eatCallback) this.eatCallback(this.target.x, this.target.y, this.target.color)
        this.target = null
        this.eating  = true
        this.eatProg = 0
      }
    } else {
      if (this.target) this.target = null
      tx = this.rest.x + wave * 28
      ty = this.rest.y + Math.cos(t * 0.0014 + this.phase) * 22
    }

    // faster strike speed so tentacle actually reaches in time
    const spd = this.eating ? 0.22 : this.target ? 0.16 : 0.05
    this.tip.x += (tx - this.tip.x) * spd
    this.tip.y += (ty - this.tip.y) * spd

    if (this.eating) {
      this.eatProg += 0.055
      if (this.eatProg >= 1) this.eating = false
    }
  }

  draw(ctx, t) {
    const wave = Math.sin(t * 0.0012 + this.phase)
    const dx   = this.tip.x - this.anchor.x
    const dy   = this.tip.y - this.anchor.y

    const cp1 = {
      x: this.anchor.x + dx * 0.28 + wave * 22,
      y: this.anchor.y + dy * 0.08 + Math.cos(t * 0.0016 + this.phase) * 30,
    }
    const cp2 = {
      x: this.tip.x - Math.abs(dx) * 0.18,
      y: this.tip.y  + wave * 14,
    }

    const grad = ctx.createLinearGradient(this.anchor.x, this.anchor.y, this.tip.x, this.tip.y)
    grad.addColorStop(0, this.color + "CC")
    grad.addColorStop(0.6, this.color + "77")
    grad.addColorStop(1,   this.color + "33")

    // glow stroke
    ctx.save()
    ctx.shadowBlur  = 18
    ctx.shadowColor = this.color
    ctx.beginPath()
    ctx.moveTo(this.anchor.x, this.anchor.y)
    ctx.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, this.tip.x, this.tip.y)
    ctx.strokeStyle = grad
    ctx.lineWidth   = this.eating ? 5 - this.eatProg * 2 : 2.5
    ctx.lineCap     = "round"
    ctx.stroke()

    // tip orb
    const tipR = this.eating ? 10 * (1 - this.eatProg * 0.6) : 5
    ctx.shadowBlur  = 24
    ctx.shadowColor = this.color
    ctx.beginPath()
    ctx.arc(this.tip.x, this.tip.y, tipR, 0, Math.PI * 2)
    ctx.fillStyle = this.color
    ctx.fill()
    ctx.restore()
  }
}

// ─── Draw creature body (circuit hub) ────────────────────────
function drawBody(ctx, bx, by, t) {
  const pulse  = 1 + Math.sin(t * 0.003) * 0.12
  const numRays = 10

  // outer rings
  for (let i = 3; i >= 1; i--) {
    const alpha = 0.04 / i
    ctx.beginPath()
    ctx.arc(bx, by, 40 * pulse * i * 0.45, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(14,165,233,${alpha})`
    ctx.fill()
  }

  // circuit rays
  for (let i = 0; i < numRays; i++) {
    const angle = (i / numRays) * Math.PI * 2 + t * 0.0006
    const inner = 20
    const outer = inner + 14 + Math.sin(t * 0.002 + i * 1.1) * 6
    const alpha = 0.25 + Math.sin(t * 0.003 + i) * 0.15
    ctx.beginPath()
    ctx.moveTo(bx + Math.cos(angle) * inner, by + Math.sin(angle) * inner)
    ctx.lineTo(bx + Math.cos(angle) * outer, by + Math.sin(angle) * outer)
    ctx.strokeStyle = `rgba(14,165,233,${alpha})`
    ctx.lineWidth   = 1.2
    ctx.stroke()
    // dot at ray end
    ctx.beginPath()
    ctx.arc(bx + Math.cos(angle) * (outer + 2), by + Math.sin(angle) * (outer + 2), 1.5, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(125,211,248,${alpha})`
    ctx.fill()
  }

  // rotating ring
  ctx.save()
  ctx.shadowBlur  = 15
  ctx.shadowColor = "#0EA5E9"
  ctx.translate(bx, by)
  ctx.rotate(t * 0.008)
  ctx.beginPath()
  ctx.arc(0, 0, 22 * pulse, 0, Math.PI * 1.6)
  ctx.strokeStyle = "rgba(14,165,233,0.45)"
  ctx.lineWidth   = 1.5
  ctx.stroke()
  ctx.restore()

  // core glow
  ctx.save()
  ctx.shadowBlur  = 35
  ctx.shadowColor = "#0EA5E9"
  ctx.beginPath()
  ctx.arc(bx, by, 17 * pulse, 0, Math.PI * 2)
  const cGrad = ctx.createRadialGradient(bx, by, 0, bx, by, 17 * pulse)
  cGrad.addColorStop(0,   "#BAE6FD")
  cGrad.addColorStop(0.45, "#0EA5E9")
  cGrad.addColorStop(1,   "#0369A1")
  ctx.fillStyle = cGrad
  ctx.fill()
  ctx.restore()

  // inner white dot
  ctx.beginPath()
  ctx.arc(bx, by, 5, 0, Math.PI * 2)
  ctx.fillStyle = "#F0F9FF"
  ctx.fill()
}

// ─── Subtle grid ──────────────────────────────────────────────
function drawGrid(ctx, W, H) {
  ctx.save()
  ctx.strokeStyle = "rgba(14,165,233,0.04)"
  ctx.lineWidth   = 1
  const s = 38
  for (let x = 0; x < W; x += s) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke() }
  for (let y = 0; y < H; y += s) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke() }
  ctx.restore()
}

// ─── Score counter ────────────────────────────────────────────
function drawScore(ctx, count, scoreLabel) {
  ctx.save()
  ctx.font         = "13px 'Inter', monospace"
  ctx.fillStyle    = "rgba(125,211,248,0.5)"
  ctx.textAlign    = "right"
  ctx.shadowBlur   = 8
  ctx.shadowColor  = "#0EA5E9"
  ctx.fillText(`${scoreLabel}: ${count}`, ctx.canvas.width - 16, 28)
  ctx.restore()
}

// ─── Main component ───────────────────────────────────────────
export default function DataInterceptor() {
  const canvasRef  = useRef(null)
  const { t } = useLanguage()
  const i18n = t.interceptor
  const scoreLabelRef = useRef(i18n.score)
  scoreLabelRef.current = i18n.score  // always up to date without re-running effect

  useEffect(() => {
    const canvas  = canvasRef.current
    const ctx     = canvas.getContext("2d")

    let W = canvas.offsetWidth
    let H = canvas.offsetHeight
    canvas.width  = W
    canvas.height = H

    const BX = () => W * 0.13
    const BY = () => H * 0.5

    const makeTentacles = () => {
      const bx = BX(), by = BY()
      return [
        new Tentacle(bx, by, bx + 95,  by - 140, 0),
        new Tentacle(bx, by, bx + 115, by - 60,  1),
        new Tentacle(bx, by, bx + 120, by,        2),
        new Tentacle(bx, by, bx + 115, by + 60,  3),
        new Tentacle(bx, by, bx + 95,  by + 140, 4),
      ]
    }

    let tentacles = makeTentacles()
    let packets   = []
    let particles = []
    let t         = 0
    let spawn     = 0
    let score     = 0
    let rafId

    const onEat = (x, y, color) => {
      score++
      for (let i = 0; i < 12; i++) particles.push(new Particle(x, y, color))
    }
    tentacles.forEach(ten => { ten.eatCallback = onEat })

    // seed initial packets across the screen
    for (let i = 0; i < 5; i++) packets.push(new Packet(W, H, true))

    function barrierCatch() {
      // any packet that slips past the tentacle reach gets absorbed by the node body itself
      const bx = BX(), by = BY()
      const barrier = bx + 55
      packets.forEach(p => {
        if (!p.alive) return
        if (p.x > barrier) return
        // caught by the node — burst + score
        onEat(p.x, p.y, p.color)
        p.alive = false
      })
    }

    function animate() {
      rafId = requestAnimationFrame(animate)
      t++

      ctx.clearRect(0, 0, W, H)
      drawGrid(ctx, W, H)

      // spawn — slightly slower so tentacles can keep up
      spawn++
      if (spawn > 70) { packets.push(new Packet(W, H)); spawn = 0 }

      // hunt
      tentacles.forEach(ten => ten.hunt(packets))

      // barrier: absorb anything that slipped past tentacles
      barrierCatch()

      // update & draw packets
      packets.forEach(p => { if (p.alive) p.update(); p.draw(ctx) })
      packets = packets.filter(p => p.alive)

      // particles
      particles.forEach(p => { p.update(); p.draw(ctx) })
      particles = particles.filter(p => p.life > 0)

      // tentacles
      tentacles.forEach(ten => { ten.update(t); ten.draw(ctx, t) })

      // body
      drawBody(ctx, BX(), BY(), t)

      // score
      drawScore(ctx, score, scoreLabelRef.current)
    }

    animate()

    // resize
    const ro = new ResizeObserver(() => {
      W = canvas.offsetWidth
      H = canvas.offsetHeight
      canvas.width  = W
      canvas.height = H
      tentacles = makeTentacles()
      tentacles.forEach(ten => { ten.eatCallback = onEat })
    })
    ro.observe(canvas)

    return () => {
      cancelAnimationFrame(rafId)
      ro.disconnect()
    }
  }, [])

  return (
    <section
      className="relative py-16 sm:py-20 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, transparent 0%, rgba(14,165,233,0.02) 50%, transparent 100%)",
      }}
    >
      {/* Section header */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 flex items-end justify-between">
        <div>
          <span className="section-label">{i18n.label}</span>
          <h2
            className="mt-2 font-bold tracking-tight"
            style={{ fontSize: "clamp(1.6rem, 3.2vw, 2.6rem)" }}
          >
            {i18n.title}
          </h2>
          <p className="mt-2 text-sm text-[var(--color-muted)] max-w-sm">
            {i18n.description}
          </p>
        </div>

        {/* Live badge */}
        <div
          className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono"
          style={{
            background: "rgba(74,222,128,0.08)",
            border: "1px solid rgba(74,222,128,0.18)",
            color: "rgba(74,222,128,0.85)",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"
            style={{ boxShadow: "0 0 5px #4ade80" }}
          />
          {i18n.badge}
        </div>
      </div>

      {/* Canvas */}
      <div
        className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        style={{
          borderRadius: "1.25rem",
          overflow: "hidden",
          border: "1px solid rgba(14,165,233,0.1)",
          background: "linear-gradient(155deg, #0A1828 0%, #070C14 60%)",
          boxShadow: "0 0 0 1px rgba(255,255,255,0.02), 0 32px 64px rgba(0,0,0,0.5)",
        }}
      >
        {/* top bar — terminal style */}
        <div
          className="flex items-center gap-2 px-4 py-2.5 border-b"
          style={{ borderColor: "rgba(14,165,233,0.1)", background: "rgba(14,165,233,0.04)" }}
        >
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
          </div>
          <span className="ml-2 text-[11px] font-mono text-[var(--color-muted)]">
            {i18n.terminal}
          </span>
        </div>

        <canvas
          ref={canvasRef}
          className="block w-full"
          style={{ height: "clamp(260px, 38vw, 420px)", display: "block" }}
        />
      </div>
    </section>
  )
}
