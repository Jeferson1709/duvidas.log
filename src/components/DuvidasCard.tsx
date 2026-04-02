import type { Duvida } from '../types/duvida'

interface DuvidasCardProps {
  duvida: Duvida
  onToggle: (id: string, resolvida: boolean) => Promise<void>
  onDelete: (id: string) => Promise<void>
}

export function DuvidasCard({ duvida, onToggle, onDelete }: DuvidasCardProps) {
  const data = new Date(duvida.criadaEm).toLocaleDateString('pt-BR')

  return (
    <article
      className={`border px-4 py-3 transition-colors duration-200 ${
        duvida.resolvida
          ? 'border-stone-800 opacity-50'
          : 'border-stone-700 hover:border-stone-500'
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs text-amber-400 border border-amber-900 px-1.5 py-0.5">
              {duvida.materia}
            </span>
            <span className="text-xs text-stone-600">{data}</span>
          </div>

          <h2
            className={`text-sm font-semibold leading-snug ${
              duvida.resolvida ? 'line-through text-stone-500' : 'text-stone-100'
            }`}
          >
            {duvida.titulo}
          </h2>

          {duvida.descricao && (
            <p className="text-xs text-stone-400 mt-1 leading-relaxed line-clamp-2">
              {duvida.descricao}
            </p>
          )}
        </div>

        <div className="flex flex-col items-end gap-2 shrink-0">
          <button
            onClick={() => onToggle(duvida.id, !duvida.resolvida)}
            aria-label={duvida.resolvida ? 'Marcar como pendente' : 'Marcar como resolvida'}
            className={`text-xs px-2 py-1 border transition-colors duration-150 ${
              duvida.resolvida
                ? 'border-stone-700 text-stone-500 hover:border-stone-500 hover:text-stone-300'
                : 'border-green-800 text-green-500 hover:bg-green-900/30'
            }`}
          >
            {duvida.resolvida ? 'reabrir' : '✓ resolver'}
          </button>

          <button
            onClick={() => onDelete(duvida.id)}
            aria-label={`Deletar dúvida: ${duvida.titulo}`}
            className="text-xs text-stone-600 hover:text-red-400 transition-colors duration-150"
          >
            deletar
          </button>
        </div>
      </div>
    </article>
  )
}
