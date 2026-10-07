/** Tiny Web Audio cue player — generated tones, no audio files or network. */

let ctx: AudioContext | null = null

function getContext(): AudioContext | null {
  if (typeof window === 'undefined') return null
  const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
  if (!Ctor) return null
  if (!ctx) ctx = new Ctor()
  if (ctx.state === 'suspended') void ctx.resume()
  return ctx
}

/** Call from a user gesture (e.g. tapping Start/Resume) so later cues are allowed to play. */
export function unlockAudio() {
  getContext()
}

function tone(freq: number, startOffset: number, duration: number, volume = 0.18) {
  const c = getContext()
  if (!c) return
  const t = c.currentTime + startOffset
  const osc = c.createOscillator()
  const gain = c.createGain()
  osc.type = 'sine'
  osc.frequency.value = freq
  gain.gain.setValueAtTime(0, t)
  gain.gain.linearRampToValueAtTime(volume, t + 0.01)
  gain.gain.exponentialRampToValueAtTime(0.0001, t + duration)
  osc.connect(gain).connect(c.destination)
  osc.start(t)
  osc.stop(t + duration + 0.05)
}

export const cues = {
  /** "Change coming up" — two-note chime. */
  upcoming() {
    tone(660, 0, 0.18)
    tone(880, 0.2, 0.25)
  },
  /** Final-seconds tick. */
  tick() {
    tone(880, 0, 0.08, 0.12)
  },
  /** Interval has changed. */
  change() {
    tone(1175, 0, 0.35, 0.22)
  },
  /** Workout complete. */
  complete() {
    tone(784, 0, 0.18)
    tone(988, 0.18, 0.18)
    tone(1319, 0.36, 0.45)
  },
}

export function vibrate(pattern: number | number[]) {
  if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
    try {
      navigator.vibrate(pattern)
    } catch {
      /* unsupported */
    }
  }
}
