import { useState } from 'react'
import { RiCheckLine, RiFileCopyLine } from '@remixicon/react'
import { Button } from '@/components/ui/button'
import { m } from '@/paraglide/messages.js'

type CopyButtonProps = {
  text: string
  className?: string
}

export function CopyButton({ text, className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      // Fallback for restricted clipboard contexts
      const ta = document.createElement('textarea')
      ta.value = text
      ta.style.position = 'fixed'
      ta.style.left = '-9999px'
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    }
  }

  const label = copied ? m.copy_done() : m.copy_to_clipboard()

  return (
    <>
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        onClick={onCopy}
        className={className}
        aria-label={label}
        title={label}
      >
        {copied ? (
          <RiCheckLine className="size-4 text-emerald-600" aria-hidden="true" />
        ) : (
          <RiFileCopyLine className="size-4" aria-hidden="true" />
        )}
      </Button>
      <span className="sr-only" aria-live="polite">
        {copied ? m.copy_done() : ''}
      </span>
    </>
  )
}
