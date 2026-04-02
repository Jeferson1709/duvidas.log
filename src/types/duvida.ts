export type Materia =
  | 'JavaScript'
  | 'TypeScript'
  | 'React'
  | 'CSS'
  | 'Node.js'
  | 'Outro'

export interface Duvida {
  id: string
  titulo: string
  descricao: string
  materia: Materia
  resolvida: boolean
  criadaEm: string
}

// Omit<> utilizado: id e criadaEm são gerados automaticamente, não inseridos pelo usuário
export type NovaDuvida = Omit<Duvida, 'id' | 'criadaEm'>
