import { useState } from 'react'
import type { NovaDuvida, Materia } from '../types/duvida'

const MATERIAS: Materia[] = ['JavaScript', 'TypeScript', 'React', 'CSS', 'Node.js', 'Outro']

interface DuvidasFormProps {
  onCreate: (data: NovaDuvida) => Promise<void>
}

export function DuvidasForm({ onCreate }: DuvidasFormProps) {
  const [titulo, setTitulo] = useState('')
  const [descricao, setDescricao] = useState('')
  const [materia, setMateria] = useState<Materia>('JavaScript')
  const [enviando, setEnviando] = useState(false)
  const [erro, setErro] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!titulo.trim()) {
      setErro('O título é obrigatório.')
      return
    }
    setErro(null)
    setEnviando(true)
    try {
      await onCreate({ titulo: titulo.trim(), descricao, materia, resolvida: false })
      setTitulo('')
      setDescricao('')
    } catch {
      setErro('Não foi possível salvar. Verifique se a API está rodando.')
    } finally {
      setEnviando(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="border border-stone-700 px-4 py-4 space-y-4"
      aria-label="Formulário para registrar nova dúvida"
    >
      {erro && (
        <p role="alert" className="text-xs text-red-400">
          ⚠ {erro}
        </p>
      )}

      <div className="space-y-1">
        <label htmlFor="titulo" className="text-xs text-stone-400 block">
          título{' '}
          <span aria-hidden="true" className="text-red-500">
            *
          </span>
        </label>
        <input
          id="titulo"
          type="text"
          value={titulo}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitulo(e.target.value)}
          placeholder="Qual é a sua dúvida?"
          required
          aria-required="true"
          className="w-full bg-transparent border border-stone-700 focus:border-amber-400 outline-none px-3 py-2 text-sm text-stone-100 placeholder:text-stone-600 transition-colors duration-150"
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="descricao" className="text-xs text-stone-400 block">
          detalhes{' '}
          <span className="text-stone-600">(opcional)</span>
        </label>
        <textarea
          id="descricao"
          value={descricao}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescricao(e.target.value)}
          placeholder="O que você já tentou? Em que contexto surgiu?"
          rows={3}
          className="w-full bg-transparent border border-stone-700 focus:border-amber-400 outline-none px-3 py-2 text-sm text-stone-100 placeholder:text-stone-600 transition-colors duration-150 resize-none"
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="materia" className="text-xs text-stone-400 block">
          matéria
        </label>
        <select
          id="materia"
          value={materia}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setMateria(e.target.value as Materia)
          }
          className="w-full bg-stone-900 border border-stone-700 focus:border-amber-400 outline-none px-3 py-2 text-sm text-stone-100 transition-colors duration-150"
        >
          {MATERIAS.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={enviando}
        className="text-sm px-4 py-2 bg-amber-400 text-stone-950 font-semibold hover:bg-amber-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
      >
        {enviando ? 'salvando...' : 'registrar dúvida'}
      </button>
    </form>
  )
}
