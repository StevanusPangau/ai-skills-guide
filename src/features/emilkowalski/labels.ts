import type {
  EmilCategory,
  EmilInvocation,
  EmilMode,
} from '@/data/emilkowalski-skills'
import { m } from '@/paraglide/messages.js'

export function emilCategoryLabel(category: EmilCategory): string {
  return {
    foundations: m.emil_category_foundations(),
    language: m.emil_category_language(),
    discovery: m.emil_category_discovery(),
    review: m.emil_category_review(),
    audit: m.emil_category_audit(),
  }[category]
}

export function emilInvocationLabel(invocation: EmilInvocation): string {
  return invocation === 'manual'
    ? m.emil_invocation_manual()
    : m.emil_invocation_model()
}

export function emilModeLabel(mode: EmilMode): string {
  return {
    'build-review': m.emil_mode_build_review(),
    'name-only': m.emil_mode_name_only(),
    'read-only-discovery': m.emil_mode_read_only_discovery(),
    'read-only-review': m.emil_mode_read_only_review(),
    'read-only-planning': m.emil_mode_read_only_planning(),
  }[mode]
}
