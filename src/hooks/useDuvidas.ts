import { useState, useEffect, useCallback, useMemo } from 'react'
import type { Duvida, NovaDuvida, Materia } from '../types/duvida'
import * as service from '../services/duvidasService'

export function useDuvidas() {
  const [duvidas, setDuvidas] = useState<Duvida[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filtroMateria, setFiltroMateria] = useState<Materia | 'Todas'>('Todas')

  // useCallback: garante referência estável para não recriar no useEffect
  const fetchDuvidas = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await service.getDuvidas()
      setDuvidas(data)
    } catch {
      setError('Não foi possível conectar à API. Verifique se o json-server está rodando.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchDuvidas()
  }, [fetchDuvidas])

  // useMemo: filtragem só recalcula quando duvidas ou filtroMateria mudam
  const duvidosFiltradas = useMemo(() => {
    if (filtroMateria === 'Todas') return duvidas
    return duvidas.filter((d) => d.materia === filtroMateria)
  }, [duvidas, filtroMateria])

  // useMemo: lista de matérias únicas presente nas dúvidas
  const materias = useMemo<Materia[]>(() => {
    const set = new Set(duvidas.map((d) => d.materia))
    return Array.from(set)
  }, [duvidas])

  const handleCreate = useCallback(async (data: NovaDuvida) => {
    const nova = await service.createDuvida(data)
    setDuvidas((prev) => [nova, ...prev])
  }, [])

  const handleToggle = useCallback(async (id: string, resolvida: boolean) => {
    const atualizada = await service.toggleResolvida(id, resolvida)
    setDuvidas((prev) => prev.map((d) => (d.id === id ? atualizada : d)))
  }, [])

  const handleDelete = useCallback(async (id: string) => {
    const confirmado = window.confirm('Tem certeza? Essa ação não pode ser desfeita.')
    if (!confirmado) return
    await service.deleteDuvida(id)
    setDuvidas((prev) => prev.filter((d) => d.id !== id))
  }, [])

  return {
    duvidas: duvidosFiltradas,
    loading,
    error,
    filtroMateria,
    setFiltroMateria,
    materias,
    onCreate: handleCreate,
    onToggle: handleToggle,
    onDelete: handleDelete,
  }
}
