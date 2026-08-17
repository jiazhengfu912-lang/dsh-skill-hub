/**
 * Skill-hub control: a button beside the composer's + that opens a skill
 * picker, plus the highlighted chip that records the current selection.
 */

import { useCallback, useState } from 'react'
import type { ConnectionHandle } from '@deepseek-ai/dsh-api-remotes/client'
import css from './styles.module.css'

interface SkillEntry {
  name: string
  description: string
}

type ListSkills = (payload: { sessionId: string }) => Promise<{
  result: { ok: boolean; value?: { skills?: Array<{ name: string; description: string }> } }
}>

export function SkillHub({ sessionId, connection }: { sessionId: string; connection: ConnectionHandle | undefined }): React.ReactNode {
  const [open, setOpen] = useState(false)
  const [skills, setSkills] = useState<SkillEntry[]>([])
  const [selected, setSelected] = useState<string | null>(null)
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')

  const load = useCallback(async () => {
    if (connection === undefined) { setStatus('error'); return }
    setStatus('loading')
    try {
      const listSkills = connection.api.skills.list as unknown as ListSkills
      const res = await listSkills({ sessionId })
      if (res.result.ok && res.result.value !== undefined) {
        setSkills((res.result.value.skills ?? []).map(s => ({ name: s.name, description: s.description })))
        setStatus('idle')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }, [connection, sessionId])

  const toggle = () => {
    if (!open && skills.length === 0) void load()
    setOpen(!open)
  }
  const pick = (name: string) => { setSelected(name); setOpen(false) }

  return (
    <div className={css.wrap}>
      {selected !== null && (
        <span className={css.chip} title="已选中 skill，点击取消" onClick={() => { setSelected(null) }}>{selected}</span>
      )}
      <button type="button" className={css.btn} onClick={toggle} title="Skill-hub">Skill-hub</button>
      {open && (
        <div className={css.menu}>
          {status === 'loading'
            ? <div className={css.item}>加载中…</div>
            : status === 'error'
              ? <div className={css.item}>加载失败</div>
              : skills.length === 0
                ? <div className={css.item}>暂无 skill</div>
                : skills.map(s => (
                    <button key={s.name} type="button" className={css.item} title={s.description || s.name} onClick={() => { pick(s.name) }}>
                      {s.name}
                    </button>
                  ))}
        </div>
      )}
    </div>
  )
}
