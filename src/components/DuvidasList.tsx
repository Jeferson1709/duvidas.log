import type { Duvida } from '../types/duvida'
import { DuvidasCard } from './DuvidasCard'

interface DuvidasListProps {
  duvidas: Duvida[]
  loading: boolean
  error: string | null
  onToggle: (id: string, resolvida: boolean) => Promise<void>
  onDelete: (id: string) => Promise<void>
}

export function DuvidasList({ duvidas, loading, error, onToggle, onDelete }: DuvidasListProps) {
  if (loading) {
    return (
      <div role="status" aria-live="polite" className="text-center text-stone-500 py-16 text-sm">
        carregando dúvidas...
      </div>
    )
  }

  if (error) {
    return (
      <div
        role="alert"
        className="border border-red-800 bg-red-950/30 px-4 py-3 text-sm text-red-400"
      >
        ⚠ {error}
      </div>
    )
  }

  if (duvidas.length === 0) {
    return (
      <p className="text-center text-stone-600 py-16 text-sm">
        nenhuma dúvida registrada ainda.
      </p>
    )
  }

  return (
    <section aria-label="Lista de dúvidas">
      <ul className="space-y-3">
        {duvidas.map((duvida) => (
          <li key={duvida.id}>
            <DuvidasCard duvida={duvida} onToggle={onToggle} onDelete={onDelete} />
          </li>
        ))}
      </ul>
    </section>
  )
}
