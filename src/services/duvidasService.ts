import type { Duvida, NovaDuvida } from '../types/duvida'

const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'

export async function getDuvidas(): Promise<Duvida[]> {
  const res = await fetch(`${BASE_URL}/duvidas?_sort=criadaEm&_order=desc`)
  if (!res.ok) throw new Error('Erro ao buscar dúvidas')
  return res.json()
}

export async function createDuvida(data: NovaDuvida): Promise<Duvida> {
  const res = await fetch(`${BASE_URL}/duvidas`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...data, criadaEm: new Date().toISOString() }),
  })
  if (!res.ok) throw new Error('Erro ao criar dúvida')
  return res.json()
}

export async function toggleResolvida(id: string, resolvida: boolean): Promise<Duvida> {
  const res = await fetch(`${BASE_URL}/duvidas/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ resolvida }),
  })
  if (!res.ok) throw new Error('Erro ao atualizar dúvida')
  return res.json()
}

export async function deleteDuvida(id: string): Promise<void> {
  const res = await fetch(`${BASE_URL}/duvidas/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Erro ao deletar dúvida')
}
