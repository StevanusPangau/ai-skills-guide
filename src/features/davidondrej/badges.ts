import type {
  DavidBundleStatus,
  DavidCompatibility,
  DavidInvocation,
  DavidRisk,
} from '@/data/davidondrej-skills'
import { m } from '@/paraglide/messages.js'

// Localized labels resolved through Paraglide. Message keys use underscores
// (Paraglide compiles keys into JS function names, so hyphens are invalid).
export function compatibilityLabel(c: DavidCompatibility): string {
  const map: Record<DavidCompatibility, () => string> = {
    portable: m.david_compat_portable,
    adapt: m.david_compat_adapt,
    'agent-specific': m.david_compat_agent_specific,
    'vendor-specific': m.david_compat_vendor_specific,
    duplicate: m.david_compat_duplicate,
    draft: m.david_compat_draft,
  }
  return map[c]()
}

export function bundleLabel(b: DavidBundleStatus): string {
  const map: Record<DavidBundleStatus, () => string> = {
    'first-wave': m.david_bundle_first_wave,
    optional: m.david_bundle_optional,
    'catalog-only': m.david_bundle_catalog_only,
    'reuse-existing': m.david_bundle_reuse_existing,
  }
  return map[b]()
}

export function riskLabel(r: DavidRisk): string {
  const map: Record<DavidRisk, () => string> = {
    low: m.david_risk_low,
    medium: m.david_risk_medium,
    high: m.david_risk_high,
  }
  return map[r]()
}

export function invocationLabel(i: DavidInvocation): string {
  return i === 'model' ? m.david_invocation_model() : m.david_invocation_manual()
}

// Tailwind class fragments — kept as static strings so the JIT compiler keeps
// them. Compatibility drives the left border accent on cards/detail.
export function compatibilityBorder(c: DavidCompatibility): string {
  const map: Record<DavidCompatibility, string> = {
    portable: 'border-l-emerald-600',
    adapt: 'border-l-orange-600',
    'agent-specific': 'border-l-sky-600',
    'vendor-specific': 'border-l-violet-600',
    duplicate: 'border-l-amber-600',
    draft: 'border-l-zinc-500',
  }
  return map[c]
}

export function riskBadgeClass(r: DavidRisk): string {
  const map: Record<DavidRisk, string> = {
    low: 'text-emerald-700 dark:text-emerald-400',
    medium: 'text-amber-700 dark:text-amber-400',
    high: 'text-red-700 dark:text-red-400',
  }
  return map[r]
}
