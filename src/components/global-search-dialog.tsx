import { useState, useMemo, useEffect, useRef } from 'react'
import { useNavigate } from '@tanstack/react-router'
import {
  RiSearchLine,
  RiCornerDownLeftLine,
  RiCloseLine,
  RiTerminalBoxLine,
} from '@remixicon/react'
import {
  getAllSearchableSkills,
  type SearchableSkill,
} from '@/data/all-skills-search'
import { Badge } from '@/components/ui/badge'
import { getLocale } from '@/paraglide/runtime.js'

interface GlobalSearchDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function GlobalSearchDialog({
  open,
  onOpenChange,
}: GlobalSearchDialogProps) {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const isEn = getLocale() === 'en'

  const allSkills = useMemo(() => getAllSearchableSkills(), [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return allSkills
    return allSkills.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.collectionName.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q),
    )
  }, [allSkills, query])

  useEffect(() => {
    setSelectedIndex(0)
  }, [query])

  useEffect(() => {
    if (open) {
      setQuery('')
      setSelectedIndex(0)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open])

  // Scroll selected into view
  useEffect(() => {
    if (!listRef.current) return
    const items = listRef.current.querySelectorAll('[data-search-item]')
    const activeItem = items[selectedIndex] as HTMLElement
    if (activeItem) {
      activeItem.scrollIntoView({ block: 'nearest' })
    }
  }, [selectedIndex])

  const handleSelect = (item: SearchableSkill) => {
    onOpenChange(false)
    navigate({ to: item.href as any })
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex(
        (prev) => (prev - 1 + filtered.length) % (filtered.length || 1),
      )
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (filtered[selectedIndex]) {
        handleSelect(filtered[selectedIndex])
      }
    } else if (e.key === 'Escape') {
      e.preventDefault()
      onOpenChange(false)
    }
  }

  if (!open) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={isEn ? 'Search skills' : 'Cari skill'}
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => onOpenChange(false)}
      />

      {/* Modal Box */}
      <div className="relative w-full max-w-2xl bg-card border border-border/80 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh] z-10 animate-in fade-in-0 zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3 border-b border-border/60 gap-3">
          <RiSearchLine className="w-5 h-5 text-muted-foreground shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              isEn
                ? 'Search all 100+ skills across 6 creators... (e.g. tdd, radius, cpr)'
                : 'Cari 100+ skill lintas 6 kreator... (contoh: tdd, radius, cpr)'
            }
            className="flex-1 bg-transparent text-sm sm:text-base outline-none placeholder:text-muted-foreground text-foreground"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-muted-foreground hover:text-foreground text-xs p-1"
            >
              <RiCloseLine className="w-4 h-4" />
            </button>
          )}
          <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 border border-border rounded bg-muted text-muted-foreground hidden sm:inline">
            ESC
          </span>
        </div>

        {/* Results List */}
        <div
          ref={listRef}
          className="flex-1 overflow-y-auto p-2 divide-y divide-border/20"
        >
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-sm text-muted-foreground">
              {isEn
                ? 'No matching skills found.'
                : 'Tidak ada skill yang cocok ditemukan.'}
            </div>
          ) : (
            filtered.map((item, idx) => {
              const isSelected = idx === selectedIndex
              return (
                <div
                  key={item.id}
                  data-search-item
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-accent text-accent-foreground'
                      : 'hover:bg-muted/50 text-foreground'
                  }`}
                >
                  <div className="mt-0.5 p-1.5 rounded-md bg-background border border-border/60 text-muted-foreground shrink-0">
                    <RiTerminalBoxLine className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="font-mono font-semibold text-sm">
                        /{item.name}
                      </span>
                      <Badge
                        variant="secondary"
                        className="text-[10px] py-0 px-1.5"
                      >
                        {item.collectionName}
                      </Badge>
                      <span className="text-xs text-muted-foreground font-mono">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  {isSelected && (
                    <div className="hidden sm:flex items-center text-xs text-muted-foreground shrink-0 mt-1">
                      <RiCornerDownLeftLine className="w-3.5 h-3.5 mr-1" />
                      <span className="text-[10px]">Select</span>
                    </div>
                  )}
                </div>
              )
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2 bg-muted/40 border-t border-border/60 text-[11px] text-muted-foreground flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span>
              <kbd className="font-mono bg-background px-1 py-0.5 rounded border border-border text-[10px]">
                ↑
              </kbd>{' '}
              <kbd className="font-mono bg-background px-1 py-0.5 rounded border border-border text-[10px]">
                ↓
              </kbd>{' '}
              {isEn ? 'Navigate' : 'Navigasi'}
            </span>
            <span>
              <kbd className="font-mono bg-background px-1 py-0.5 rounded border border-border text-[10px]">
                ↵
              </kbd>{' '}
              {isEn ? 'Open' : 'Buka'}
            </span>
          </div>
          <span>
            {filtered.length} {isEn ? 'skills available' : 'skill tersedia'}
          </span>
        </div>
      </div>
    </div>
  )
}
