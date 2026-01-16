import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useTheme } from '../contexts/ThemeContext'
import { useTranslation } from 'react-i18next'
import { Button, Select, Space, Typography } from 'antd'

const { Option } = Select
const { Text } = Typography

export default function Header() {
  const { user, login, logout } = useAuth()
  const { theme, toggle } = useTheme()
  const { t, i18n } = useTranslation()

  const doFakeLogin = (role: 'admin' | 'manager' | 'user') => {
    login({
      id: '1',
      name: role === 'admin' ? 'Alice Admin' : role === 'manager' ? 'Maggie Manager' : 'Ursula User',
      email: `${role}@example.com`,
      roles: [role]
    })
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
      <div>
        <Text strong>{t('title')}</Text>
      </div>
      <Space>
        <Select value={i18n.language} onChange={val => i18n.changeLanguage(val)} style={{ width: 120 }}>
          <Option value="zh-TW">中文</Option>
          <Option value="en">English</Option>
        </Select>

        <Button onClick={toggle}>{t('theme')}: {theme}</Button>

        {user ? (
          <> 
            <Text>{user.name}</Text>
            <Button onClick={() => logout()}>{t('logout')}</Button>
          </>
        ) : (
          <> 
            <Button onClick={() => doFakeLogin('admin')}>demo admin</Button>
            <Button onClick={() => doFakeLogin('manager')}>demo manager</Button>
            <Button onClick={() => doFakeLogin('user')}>demo user</Button>
          </>
        )}
      </Space>
    </div>
  )
}