import { rest } from 'msw'
import { v4 as uuid } from 'uuid'

let members = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'user' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'manager' }
]

export const handlers = [
  rest.get('/api/members', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(members))
  }),

  rest.post('/api/members', async (req, res, ctx) => {
    const body = await req.json()
    const item = { id: uuid(), ...body }
    members.push(item)
    return res(ctx.status(201), ctx.json(item))
  }),

  rest.put('/api/members/:id', async (req, res, ctx) => {
    const { id } = req.params as any
    const body = await req.json()
    members = members.map(m => (m.id === id ? { ...m, ...body } : m))
    const found = members.find(m => m.id === id)
    return res(ctx.status(200), ctx.json(found))
  }),

  rest.delete('/api/members/:id', (req, res, ctx) => {
    const { id } = req.params as any
    members = members.filter(m => m.id !== id)
    return res(ctx.status(200), ctx.json({ ok: true }))
  })
]