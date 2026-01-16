import { api } from './api'

export type Member = { id: string; name: string; email: string; role: string }

export const getMembers = async () => {
  const res = await api.get<Member[]>('/members')
  return res.data
}
export const createMember = async (p: Omit<Member, 'id'>) => {
  const res = await api.post<Member>('/members', p)
  return res.data
}
export const updateMember = async (id: string, p: Partial<Member>) => {
  const res = await api.put<Member>(`/members/${id}`, p)
  return res.data
}
export const deleteMember = async (id: string) => {
  const res = await api.delete(`/members/${id}`)
  return res.data
}