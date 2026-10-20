export const PROJECT_SLUGS = ['quick-so', 'prp-v2', 'supply-chain-workbench', 'quoting-assistants'] as const

export type ProjectSlug = (typeof PROJECT_SLUGS)[number]

export const projectIllustrations = {
  'quick-so': 'orders',
  'prp-v2': 'portal',
  'supply-chain-workbench': 'supply',
  'quoting-assistants': 'assistant',
} as const satisfies Record<ProjectSlug, 'orders' | 'portal' | 'supply' | 'assistant'>
