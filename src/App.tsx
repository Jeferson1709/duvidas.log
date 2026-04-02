import { useState } from 'react'
import { useDuvidas } from './hooks/useDuvidas'
import { DuvidasList } from './components/DuvidasList'
import { DuvidasForm } from './components/DuvidasForm'
import { FiltroMateria } from './components/FiltroMateria'

export default function App() {
  const [formAberto, setFormAberto] = useState(false)
  const {
    duvidas,
    loading,
    error,
    filtroMateria,
    setFiltroMateria,
    materias,
    onCreate,
    onToggle,
    onDelete,
  } = useDuvidas()

  const pendentes = duvidas.filter((d) => !d.resolvida).length

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 font-mono">
      <header className="border-b border-stone-800 px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold tracking-tight">dúvidas.log</h1>
            {!loading && !error && (
              <p className="text-xs text-stone-500 mt-0.5">
                {pendentes} pendente{pendentes !== 1 ? 's' : ''}
              </p>
            )}
          </div>
          <button
            onClick={() => setFormAberto((v) => !v)}
            aria-label={formAberto ? 'Fechar formulário' : 'Registrar nova dúvida'}
            className="text-sm border border-stone-700 hover:border-amber-400 hover:text-amber-400 px-4 py-1.5 transition-colors duration-150"
          >
            {formAberto ? '— cancelar' : '+ nova dúvida'}
          </button>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-8 space-y-6">
        {formAberto && (
          <DuvidasForm
            onCreate={async (data) => {
              await onCreate(data)
              setFormAberto(false)
            }}
          />
        )}

        {!loading && !error && materias.length > 0 && (
          <FiltroMateria
            materias={materias}
            selecionada={filtroMateria}
            onChange={setFiltroMateria}
          />
        )}

        <DuvidasList
          duvidas={duvidas}
          loading={loading}
          error={error}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      </main>
    </div>
  )
}
