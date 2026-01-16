import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { ThemeProvider } from './contexts/ThemeContext'
import Header from './components/Header'
import MemberList from './components/MemberList'
import ProtectedRoute from './components/ProtectedRoute'
import { useTranslation } from 'react-i18next'
import 'antd/dist/reset.css'

function AdminOnlyPage() {
  const { t } = useTranslation()
  return <div style={{ padding: 16 }}>{t('admin_only')}</div>
}

export default function App() {
  const { t } = useTranslation()

  return (
    <AuthProvider>
      <ThemeProvider>
        <div className="app-container">
          <Header />
          <nav style={{ marginBottom: 12 }}>
            <Link to="/" style={{ marginRight: 12 }}>{t('members')}</Link>
            <Link to="/admin">{t('admin_only')}</Link>
          </nav>

          <Routes>
            <Route path="/" element={<MemberList />} />
            <Route path="/admin" element={<ProtectedRoute required="admin"><AdminOnlyPage /></ProtectedRoute>} />
            <Route path="*" element={<div>404</div>} />
          </Routes>
        </div>
      </ThemeProvider>
    </AuthProvider>
  )
}