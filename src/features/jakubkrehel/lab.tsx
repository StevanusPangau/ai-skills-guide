import { useState } from 'react'
import { m } from '@/paraglide/messages.js'

export function JakubLab() {
  const [padding, setPadding] = useState(16)
  const [outerRadius, setOuterRadius] = useState(24)
  const [opticalFix, setOpticalFix] = useState(true)

  // better-ui rule: outer radius = inner radius + padding, so inner = outer - padding
  // (upstream: past 24px of padding, treat the layers as separate surfaces).
  const correctInnerRadius = Math.max(0, outerRadius - padding)
  const brokenInnerRadius = outerRadius // Common bug: applying same radius to both!

  return (
    <section id="lab" className="scroll-mt-20 space-y-6">
      <div>
        <h2 className="font-heading text-2xl font-bold tracking-tight">
          {m.jakub_lab_title()}
        </h2>
        <p className="mt-1 text-muted-foreground text-sm">
          {m.jakub_lab_description()}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Experiment 1: Concentric Radius Calculator */}
        <div className="rounded-xl border border-border bg-card p-5 space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-base font-mono">{m.jakub_lab_radius_title()}</h3>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-primary/10 text-primary font-bold">
              {m.jakub_lab_radius_rule()}
            </span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {m.jakub_lab_radius_body()}
          </p>

          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span>{m.jakub_lab_outer_radius()}: {outerRadius}px</span>
              <input
                type="range"
                min="12"
                max="48"
                value={outerRadius}
                onChange={(e) => setOuterRadius(Number(e.target.value))}
                className="w-32"
              />
            </div>
            <div className="flex items-center justify-between text-xs font-mono">
              <span>{m.jakub_lab_padding()}: {padding}px</span>
              <input
                type="range"
                min="4"
                max="32"
                value={padding}
                onChange={(e) => setPadding(Number(e.target.value))}
                className="w-32"
              />
            </div>
            {padding > 24 ? (
              <p className="text-[11px] text-muted-foreground">{m.jakub_lab_past_24()}</p>
            ) : null}
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2">
            {/* Broken (naive AI generated) */}
            <div className="text-center space-y-2">
              <span className="text-[10px] font-mono text-destructive font-semibold">{m.jakub_lab_wrong()}</span>
              <div
                className="mx-auto flex items-center justify-center bg-muted/60 border border-border"
                style={{
                  width: '130px',
                  height: '110px',
                  borderRadius: `${outerRadius}px`,
                  padding: `${padding}px`,
                }}
              >
                <div
                  className="size-full bg-destructive/20 border border-destructive/40 flex items-center justify-center text-[10px] font-mono text-destructive"
                  style={{ borderRadius: `${brokenInnerRadius}px` }}
                >
                  {m.jakub_lab_wrong_box()}
                </div>
              </div>
            </div>

            {/* Correct (Jakub rule) */}
            <div className="text-center space-y-2">
              <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">{m.jakub_lab_right({ radius: String(correctInnerRadius) })}</span>
              <div
                className="mx-auto flex items-center justify-center bg-muted/60 border border-border"
                style={{
                  width: '130px',
                  height: '110px',
                  borderRadius: `${outerRadius}px`,
                  padding: `${padding}px`,
                }}
              >
                <div
                  className="size-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-[10px] font-mono text-emerald-700 dark:text-emerald-400"
                  style={{ borderRadius: `${correctInnerRadius}px` }}
                >
                  {m.jakub_lab_right_box()}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Experiment 2: Optical Centering on Play Button */}
        <div className="rounded-xl border border-border bg-card p-5 space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-base font-mono">{m.jakub_lab_optical_title()}</h3>
            <button
              type="button"
              onClick={() => setOpticalFix(!opticalFix)}
              className="text-xs font-mono px-2.5 py-1 rounded-md border border-border bg-muted hover:bg-muted/80 text-foreground font-semibold"
            >
              {m.jakub_lab_mode({
                mode: opticalFix ? m.jakub_lab_mode_optical() : m.jakub_lab_mode_geometric(),
              })}
            </button>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {m.jakub_lab_optical_body()}
          </p>

          <div className="flex flex-col items-center justify-center py-6">
            <div className="relative size-20 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg transition-transform active:scale-95">
              {/* Vertical center guideline */}
              <div className="absolute top-0 bottom-0 left-1/2 w-px -translate-x-1/2 bg-primary-foreground/30" />
              {/* Horizontal center guideline */}
              <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-primary-foreground/30" />

              {/* Triangle Play Icon */}
              <div
                className="transition-transform duration-200"
                style={{
                  transform: opticalFix ? 'translateX(2px)' : 'translateX(0)',
                }}
              >
                <svg className="size-8 fill-current" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>

            <div className="mt-4 text-center">
              <span className={`inline-block font-mono text-xs font-semibold px-2.5 py-1 rounded-full ${
                opticalFix
                  ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30'
                  : 'bg-destructive/15 text-destructive border border-destructive/30'
              }`}>
                {opticalFix ? m.jakub_lab_optical_ok() : m.jakub_lab_optical_bad()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
