import { useEffect, useState, type InputHTMLAttributes } from 'react'

interface NumberFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'type'> {
  value: number
  onValueChange: (n: number) => void
  /** Decimal places shown when not focused. */
  decimals?: number
}

/**
 * Number input that keeps the raw text while typing (so "7." or an empty
 * field doesn't snap back), and commits parsed numbers as you type.
 */
export function NumberField({ value, onValueChange, decimals = 0, className = '', onBlur, ...rest }: NumberFieldProps) {
  const format = (n: number) => (Number.isFinite(n) ? (decimals > 0 ? n.toFixed(decimals) : String(Math.round(n))) : '')
  const [text, setText] = useState(() => format(value))
  const [focused, setFocused] = useState(false)

  useEffect(() => {
    if (!focused) setText(format(value))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, focused, decimals])

  return (
    <input
      {...rest}
      type="text"
      inputMode={decimals > 0 ? 'decimal' : 'numeric'}
      value={text}
      onFocus={(e) => {
        setFocused(true)
        e.target.select()
      }}
      onChange={(e) => {
        const raw = e.target.value.replace(',', '.')
        if (!/^\d*\.?\d*$/.test(raw)) return
        setText(raw)
        const n = parseFloat(raw)
        if (Number.isFinite(n)) onValueChange(n)
      }}
      onBlur={(e) => {
        setFocused(false)
        if (text.trim() === '' || !Number.isFinite(parseFloat(text))) onValueChange(0)
        onBlur?.(e)
      }}
      className={`input tabular-nums ${className}`}
    />
  )
}
