import React, { createContext, useContext, useState, ReactNode } from 'react'

export type Role = 'admin' | 'manager' | 'user'

export type User = {
  id: string
  name: string
  email: string
  roles: Role[]
}

export type AuthContextType = {
  user: User | null
  login: (payload: User) => void
  logout: () => void
  hasRole: (required: Role | Role[]) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)

  const login = (payload: User) => {
    setUser(payload)
  }
  const logout = () => setUser(null)

  const hasRole = (required: Role | Role[]) => {
    if (!user) return false
    const requiredArr = Array.isArray(required) ? required : [required]
    return requiredArr.some(r => user.roles.includes(r))
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, hasRole }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}