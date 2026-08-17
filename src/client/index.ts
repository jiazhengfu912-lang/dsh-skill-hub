/**
 * Skill-hub — browser half: a composer tool-row control that lists the
 * session's available skills and pins the selected name as a highlighted chip.
 * @module @deepseek-ai/dsh-skill-hub/client
 */

import type { ClientContext } from '@deepseek-ai/dsh-client-runtime/client'
import type {} from '@deepseek-ai/dsh-client-ui-slots'
import type {} from '@deepseek-ai/dsh-client-ui-conversation/client'
import type { ConnectionHandle } from '@deepseek-ai/dsh-api-remotes/client'
import * as React from 'react'
import { SkillHub } from './SkillHub.tsx'

export const inject = ['slots', 'connection']

export function apply(ctx: ClientContext): void {
  const slots = ctx.get('slots')
  if (slots === undefined) return
  const connection = ctx.get('connection') as ConnectionHandle | undefined
  slots.inject('conversation.input.left', () => slots.register(
    { name: 'conversation.input.left', id: 'skill-hub', order: 0 },
    (props: { sessionId: string }) => React.createElement(SkillHub, { sessionId: props.sessionId, connection }),
  ))
}
