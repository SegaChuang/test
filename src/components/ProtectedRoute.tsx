import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import type { Role } from '../utils/rbac'

export default function ProtectedRoute({ children, required }: { children: JSX.Element; required?: Role | Role[] }) {
  const { user, hasRole } = useAuth()
  if (!user) return <Navigate to="/" replace />
  if (required && !hasRole(required)) return <div style={{ padding: 16 }}>Access denied</div>
  return children
}