import { useState } from 'react'
import { Lock, Star } from 'lucide-react'
import { FEELINGS, type Feeling, type WorkoutSession, type WouldRepeat } from '../../db/types'
import { saveFeedback } from '../../db/database'

export const FEELING_META: Record<Feeling, { emoji: string; label: string }> = {
  great: { emoji: '😊', label: 'Great' },
  good: { emoji: '🙂', label: 'Good' },
  okay: { emoji: '😐', label: 'Okay' },
  tough: { emoji: '😓', label: 'Tough' },
  veryTough: { emoji: '😣', label: 'Very tough' },
  tooDifficult: { emoji: '😵', label: 'Too difficult' },
}

const COMMENT_LIMIT = 500

export function FeedbackForm({ session, onDone }: { session: WorkoutSession; onDone: () => void }) {
  const [feeling, setFeeling] = useState<Feeling | null>(null)
  const [rating, setRating] = useState(0)
  const [wouldRepeat, setWouldRepeat] = useState<WouldRepeat | null>(null)
  const [comments, setComments] = useState('')
  const [saving, setSaving] = useState(false)

  const canSave = feeling !== null && rating > 0

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSave || !feeling) return
    setSaving(true)
    await saveFeedback({
      sessionId: session.id,
      feeling,
      rating,
      wouldRepeat: wouldRepeat ?? 'maybe',
      comments: comments.trim() || undefined,
    })
    onDone()
  }

  return (
    <div className="min-h-dvh bg-canvas px-4 py-10">
      <form onSubmit={submit} className="mx-auto w-full max-w-lg space-y-8">
        <div className="text-center">
          <h1 className="font-display text-3xl font-bold tracking-tight">How did it go?</h1>
          <p className="mt-1 text-muted">{session.programNameSnapshot}</p>
        </div>

        <fieldset>
          <legend className="label text-center w-full">How did you feel?</legend>
          <div className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-6">
            {FEELINGS.map((f) => {
              const active = feeling === f
              return (
                <label
                  key={f}
                  className={`flex cursor-pointer flex-col items-center gap-1 rounded-xl border-2 p-2 transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-teal-brand-soft ${
                    active ? 'border-teal-brand bg-teal-brand/10' : 'border-transparent bg-card hover:bg-card-raised'
                  }`}
                >
                  <input type="radio" name="feeling" value={f} checked={active} onChange={() => setFeeling(f)} className="sr-only" />
                  <span className="text-3xl" aria-hidden="true">
                    {FEELING_META[f].emoji}
                  </span>
                  <span className="text-center text-xs font-medium leading-tight">{FEELING_META[f].label}</span>
                </label>
              )
            })}
          </div>
        </fieldset>

        <fieldset className="text-center">
          <legend className="label w-full text-center">Rate this workout</legend>
          <div className="mt-1 inline-flex gap-1" role="radiogroup">
            {[1, 2, 3, 4, 5].map((n) => (
              <label key={n} className="cursor-pointer rounded-lg p-1 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-teal-brand-soft">
                <input type="radio" name="rating" value={n} checked={rating === n} onChange={() => setRating(n)} className="sr-only" />
                <span className="sr-only">
                  {n} star{n > 1 ? 's' : ''}
                </span>
                <Star
                  size={36}
                  aria-hidden="true"
                  className={n <= rating ? 'text-coral' : 'text-muted/50'}
                  fill={n <= rating ? 'currentColor' : 'none'}
                />
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="text-center">
          <legend className="label w-full text-center">Would you do this workout again?</legend>
          <div className="mt-1 inline-flex gap-2">
            {(['yes', 'maybe', 'no'] as const).map((o) => (
              <label
                key={o}
                className={`chip cursor-pointer has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-teal-brand-soft ${
                  wouldRepeat === o ? 'border-teal-brand bg-teal-brand text-white' : 'border-line bg-card'
                }`}
              >
                <input type="radio" name="repeat" value={o} checked={wouldRepeat === o} onChange={() => setWouldRepeat(o)} className="sr-only" />
                {o[0].toUpperCase() + o.slice(1)}
              </label>
            ))}
          </div>
        </fieldset>

        <div>
          <label htmlFor="comments" className="label">
            Any comments? <span className="font-normal text-muted">(optional)</span>
          </label>
          <textarea
            id="comments"
            rows={4}
            maxLength={COMMENT_LIMIT}
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            className="input resize-y"
            placeholder="How were the speeds and inclines? Anything to change next time?"
          />
          <p className="mt-1 text-right text-xs text-muted tabular-nums">
            {comments.length}/{COMMENT_LIMIT}
          </p>
          <p className="mt-1 flex items-center gap-1.5 text-xs text-muted">
            <Lock size={12} aria-hidden="true" /> Kept private in this browser — never sent anywhere.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <button type="submit" disabled={!canSave || saving} className="btn-primary text-base">
            Save feedback
          </button>
          {!canSave && <p className="text-center text-xs text-muted">Pick a feeling and a star rating to save.</p>}
          <button type="button" onClick={onDone} className="btn-ghost">
            Skip
          </button>
        </div>
      </form>
    </div>
  )
}
