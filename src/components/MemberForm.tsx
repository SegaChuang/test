import React, { useEffect } from 'react'
import { Modal, Form, Input, Select } from 'antd'
import type { Member } from '../services/members'

type Props = {
  open: boolean
  initial?: Partial<Member>
  onCancel: () => void
  onSave: (payload: Omit<Member, 'id'>) => void
}

export default function MemberForm({ open, initial, onCancel, onSave }: Props) {
  const [form] = Form.useForm()

  useEffect(() => {
    form.resetFields()
    if (initial) form.setFieldsValue(initial)
  }, [initial, form])

  return (
    <Modal open={open} onCancel={onCancel} onOk={() => form.submit()} okText="Save">
      <Form form={form} onFinish={values => onSave(values)} layout="vertical">
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="role" label="Role" rules={[{ required: true }]}>
          <Select>
            <Select.Option value="admin">admin</Select.Option>
            <Select.Option value="manager">manager</Select.Option>
            <Select.Option value="user">user</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  )
}