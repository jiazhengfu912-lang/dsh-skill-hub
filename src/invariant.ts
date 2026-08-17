/** Package-owned invariant companion. @module @deepseek-ai/dsh-skill-hub/invariant */

const PACKAGE_NAME = '@deepseek-ai/dsh-skill-hub'

export const name = 'skill-hub-invariant'
export const inject = ['invariants']

export function apply(ctx: { invariants: { register: (packageName: string, install: () => void) => () => void } }): void {
  ctx.invariants.register(PACKAGE_NAME, () => {})
}
