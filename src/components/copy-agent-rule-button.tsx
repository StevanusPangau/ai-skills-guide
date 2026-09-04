import { useState } from 'react'
import { RiCheckLine, RiRobotLine } from '@remixicon/react'
import { Button } from '@/components/ui/button'
import { getLocale } from '@/paraglide/runtime.js'

interface CopyAgentRuleButtonProps {
  skillName: string
  description: string
  useWhen?: string[]
  coreRules?: string[]
  howItWorks?: string[]
  className?: string
}

export function CopyAgentRuleButton({
  skillName,
  description,
  useWhen = [],
  coreRules = [],
  howItWorks = [],
  className = '',
}: CopyAgentRuleButtonProps) {
  const [copied, setCopied] = useState(false)
  const isEn = getLocale() === 'en'

  const generateDirectiveText = () => {
    const lines: string[] = []
    lines.push(`## Agent Directive: /${skillName}`)
    lines.push('')
    lines.push(description)
    lines.push('')

    if (useWhen.length > 0) {
      lines.push(isEn ? '### When to Apply:' : '### Kapan Diterapkan:')
      for (const item of useWhen) {
        lines.push(`- ${item}`)
      }
      lines.push('')
    }

    if (coreRules.length > 0) {
      lines.push(isEn ? '### Core Invariants & Rules:' : '### Aturan Inti & Invariant:')
      for (const item of coreRules) {
        lines.push(`- ${item}`)
      }
      lines.push('')
    }

    if (howItWorks.length > 0) {
      lines.push(isEn ? '### Execution Workflow:' : '### Alur Kerja Eksekusi:')
      howItWorks.forEach((item, idx) => {
        lines.push(`${idx + 1}. ${item}`)
      })
      lines.push('')
    }

    lines.push('---')
    lines.push(`Source: https://skills.stevanuspangau.cloud (skill: /${skillName})`)

    return lines.join('\n')
  }

  const handleCopy = async () => {
    try {
      const text = generateDirectiveText()
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback
      const text = generateDirectiveText()
      const textarea = document.createElement('textarea')
      textarea.value = text
      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'
      document.body.appendChild(textarea)
      textarea.focus()
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleCopy}
      className={`gap-1.5 font-mono text-xs ${className}`}
      title={
        isEn
          ? 'Copy as System Prompt / Rule for Claude Code, Cursor, Windsurf, or Hermes'
          : 'Salin sebagai System Prompt / Aturan Agent untuk Claude Code, Cursor, Windsurf, atau Hermes'
      }
    >
      {copied ? (
        <>
          <RiCheckLine className="w-3.5 h-3.5 text-green-500 shrink-0" />
          <span className="text-green-500 font-medium">
            {isEn ? 'Rule Copied!' : 'Aturan Disalin!'}
          </span>
        </>
      ) : (
        <>
          <RiRobotLine className="w-3.5 h-3.5 text-primary shrink-0" />
          <span>{isEn ? 'Copy as Agent Prompt' : 'Salin Aturan Agent'}</span>
        </>
      )}
    </Button>
  )
}
