import type { BackgroundStyle } from '../db/types'

/** Tiny inline SVG motifs, tiled via CSS background — no network requests. */
const MOTIFS: Record<Exclude<BackgroundStyle, 'none'>, string> = {
  dots: '<circle cx="12" cy="12" r="5"/>',
  waves:
    '<path d="M2 9c3-3 6-3 9 0s6 3 9 0M2 16c3-3 6-3 9 0s6 3 9 0" fill="none" stroke="black" stroke-width="2" stroke-linecap="round"/>',
  sparkle: '<path d="M12 2l2.2 7.8L22 12l-7.8 2.2L12 22l-2.2-7.8L2 12l7.8-2.2z"/>',
  clouds: '<path d="M7 18a5 5 0 0 1-.6-10A6 6 0 0 1 18 9a4.5 4.5 0 0 1-.5 9z"/>',
  spiral:
    '<path d="M12 12a1.5 1.5 0 1 1 1.5 1.5A3 3 0 1 1 15 9a4.5 4.5 0 1 1-6 6 6 6 0 1 1 9.5-6.5" fill="none" stroke="black" stroke-width="2" stroke-linecap="round"/>',
}

export const BACKGROUND_LABELS: Record<BackgroundStyle, string> = {
  none: 'None',
  dots: 'Dots',
  waves: 'Waves',
  sparkle: 'Sparkle',
  clouds: 'Clouds',
  spiral: 'Spiral',
}

function maskUrl(style: Exclude<BackgroundStyle, 'none'>, preview: boolean) {
  // Two motifs per tile, offset and rotated, to echo the iOS staggered layout.
  // Previews pack the motifs tighter so several fit in a small swatch.
  const motif = MOTIFS[style]
  const [tile, a, b] = preview ? [64, 4, 36] : [128, 20, 84]
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${tile}" height="${tile}" viewBox="0 0 ${tile} ${tile}"><g transform="translate(${a} ${a}) rotate(17 12 12)">${motif}</g><g transform="translate(${b} ${b}) rotate(-34 12 12)">${motif}</g></svg>`
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`
}

export function BackgroundPattern({
  style,
  preview = false,
  className = '',
}: {
  style: BackgroundStyle
  preview?: boolean
  className?: string
}) {
  if (style === 'none') return null
  const url = maskUrl(style, preview)
  // Previews use a denser tile and a stronger colour so the motif is recognisable in a small swatch.
  const size = preview ? '44px 44px' : '128px 128px'
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none ${className}`}
      style={{
        backgroundColor: preview ? 'var(--tf-pattern-preview)' : 'var(--tf-pattern)',
        WebkitMaskImage: url,
        maskImage: url,
        WebkitMaskSize: size,
        maskSize: size,
      }}
    />
  )
}
