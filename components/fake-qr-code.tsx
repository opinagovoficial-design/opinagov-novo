"use client"

import { useMemo } from "react"

// Deterministic decorative "QR-like" pattern. This is a visual simulation only
// and does not encode or transmit any real payment data.
export function FakeQrCode({ seed }: { seed: string }) {
  const size = 25

  const cells = useMemo(() => {
    let h = 2166136261
    for (let i = 0; i < seed.length; i++) {
      h ^= seed.charCodeAt(i)
      h = Math.imul(h, 16777619)
    }
    const rand = () => {
      h += 0x6d2b79f5
      let t = h
      t = Math.imul(t ^ (t >>> 15), t | 1)
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296
    }

    const grid: boolean[] = Array.from({ length: size * size }, () => rand() > 0.45)

    // Draw three finder squares (top-left, top-right, bottom-left).
    const drawFinder = (top: number, left: number) => {
      for (let r = 0; r < 7; r++) {
        for (let c = 0; c < 7; c++) {
          const border = r === 0 || r === 6 || c === 0 || c === 6
          const center = r >= 2 && r <= 4 && c >= 2 && c <= 4
          const quietZone = r < 0 || c < 0
          grid[(top + r) * size + (left + c)] = quietZone ? false : border || center
        }
      }
      // clear the ring gap around the inner square
      for (let r = 1; r <= 5; r++) {
        for (let c = 1; c <= 5; c++) {
          const center = r >= 2 && r <= 4 && c >= 2 && c <= 4
          if (!center) grid[(top + r) * size + (left + c)] = false
        }
      }
    }

    drawFinder(0, 0)
    drawFinder(0, size - 7)
    drawFinder(size - 7, 0)

    return grid
  }, [seed])

  return (
    <div
      className="rounded-xl border border-slate-200 bg-white p-3"
      role="img"
      aria-label="Simulação de QR Code para validação"
    >
      <div
        className="grid gap-px"
        style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`, width: 200 }}
      >
        {cells.map((dark, i) => (
          <span
            key={i}
            className={dark ? "aspect-square rounded-[1px] bg-slate-900" : "aspect-square"}
          />
        ))}
      </div>
    </div>
  )
}

