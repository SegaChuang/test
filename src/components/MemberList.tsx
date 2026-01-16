import React, { useEffect, useState } from 'react'
import { Table, Button, Space, Popconfirm, message } from 'antd'
import { getMembers, deleteMember, createMember } from '../services/members'
import { useAuth } from '../contexts/AuthContext'
import { canDeleteMember, canEditMember } from '../utils/rbac'
import MemberForm from './MemberForm'
import type { Member } from '../services/members'
import { useTranslation } from 'react-i18next'

export default function MemberList() {
  const [data, setData] = useState<Member[]>([])
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const { user } = useAuth()
  const { t } = useTranslation()

  const load = async () => {
    setLoading(true)
    try {
      const res = await getMembers()
      setData(res)
    } finally { setLoading(false) }
  }

  useEffect(() => { load() }, [])

  const onDelete = async (id: string) => {
    if (!user || !canDeleteMember(user.roles as any)) { message.error('沒有權限'); return }
    await deleteMember(id)
    message.success('Deleted')
    load()
  }

  const onAdd = async (payload: Omit<Member,'id'>) => {
    await createMember(payload)
    setOpen(false)
    load()
  }

  const columns = [
    { title: t('name'), dataIndex: 'name', key: 'name' },
    { title: t('email'), dataIndex: 'email', key: 'email' },
    { title: t('role'), dataIndex: 'role', key: 'role' },
    { title: t('actions'), key: 'actions', render: (_: any, record: Member) => (
      <Space>
        {user && canEditMember(user.roles as any) && <Button onClick={() => message.info('Edit modal not implemented')}>{t('edit_member')}</Button>}
        {user && canDeleteMember(user.roles as any) && (
          <Popconfirm title="Sure to delete?" onConfirm={() => onDelete(record.id)}>
            <Button danger>{t('delete')}</Button>
          </Popconfirm>
        )}
      </Space>
    ) }
  ]

  return (
    <div>
      <Space style={{ marginBottom: 12 }}>
        <Button type="primary" onClick={() => setOpen(true)}>{t('add_member')}</Button>
      </Space>

      <Table rowKey="id" dataSource={data} columns={columns} loading={loading} />

      <MemberForm open={open} onCancel={() => setOpen(false)} onSave={onAdd} />
    </div>
  )
}