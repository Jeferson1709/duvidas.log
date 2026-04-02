import type { Materia } from '../types/duvida'

interface FiltroMateriaProps {
  materias: Materia[]
  selecionada: Materia | 'Todas'
  onChange: (materia: Materia | 'Todas') => void
}

export function FiltroMateria({ materias, selecionada, onChange }: FiltroMateriaProps) {
  const opcoes: (Materia | 'Todas')[] = ['Todas', ...materias]

  return (
    <nav aria-label="Filtrar por matéria">
      <ul className="flex flex-wrap gap-2">
        {opcoes.map((m) => (
          <li key={m}>
            <button
              onClick={() => onChange(m)}
              aria-pressed={selecionada === m}
              className={`text-xs px-3 py-1 border transition-colors duration-150 ${
                selecionada === m
                  ? 'border-amber-400 text-amber-400'
                  : 'border-stone-700 text-stone-500 hover:border-stone-500 hover:text-stone-300'
              }`}
            >
              {m}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
