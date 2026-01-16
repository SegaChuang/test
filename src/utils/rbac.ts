export type Role = 'admin' | 'manager' | 'user'

export const canEditMember = (currentRoles: Role[]) => {
  return currentRoles.includes('admin') || currentRoles.includes('manager')
}

export const canDeleteMember = (currentRoles: Role[]) => {
  return currentRoles.includes('admin')
}