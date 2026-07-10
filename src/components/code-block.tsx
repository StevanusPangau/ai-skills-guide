import { CopyButton } from '@/components/copy-button'
import { cn } from '@/lib/utils'

type CodeBlockProps = {
  code: string
  /** When true, prefix non-comment lines with `$ ` (shell style). */
  shell?: boolean
  className?: string
}

export function CodeBlock({ code, shell = false, className }: CodeBlockProps) {
  const lines = code.replace(/^\n+|\n+$/g, '').split('\n')

  return (
    <div className={cn('relative rounded-md bg-muted', className)}>
      <CopyButton
        text={code.replace(/^\n+|\n+$/g, '')}
        className="absolute top-2 right-2 z-10 text-muted-foreground hover:text-foreground"
      />
      <div className="overflow-x-auto p-3 pr-12 font-mono text-xs leading-relaxed whitespace-pre">
        {shell
          ? lines.map((line, i) => (
              <div
                key={i}
                className={line.startsWith('#') ? 'text-muted-foreground' : undefined}
              >
                {line.startsWith('#') ? (
                  line
                ) : (
                  <>
                    <span className="select-none text-muted-foreground">$ </span>
                    {line}
                  </>
                )}
              </div>
            ))
          : lines.map((line, i) => (
              <div
                key={i}
                className={line.startsWith('#') ? 'text-muted-foreground' : undefined}
              >
                {line}
              </div>
            ))}
      </div>
    </div>
  )
}
