# Member Management (Vite + React + TypeScript + Ant Design)

This project is a starter template that includes:
- RBAC (admin / manager / user) via AuthContext
- Theme switching (light/dark) via ThemeContext
- Internationalization (zh-TW / en) via react-i18next
- UI built with Ant Design
- Mock backend using MSW (Mock Service Worker) for /api/members

Quick start:
1. Install dependencies
   npm install

2. Run in development (MSW starts automatically in dev):
   npm run dev

Notes:
- Demo login buttons in the header let you simulate different roles to test RBAC.
- MSW handlers are in src/mocks. They intercept /api/* calls in the browser during dev.
- To connect a real backend, remove MSW worker start and point axios baseURL to your API.
