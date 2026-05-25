import { UserData } from '@/api/server-data';
import { useAppStore } from '@/stores/useAppStore';
import { Button } from 'antd'
import React from 'react'

const Login = () => {
        const appStore = useAppStore();

  return (
    <div><Button onClick={() => appStore.login("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlVTMDAxIiwidXNlck5hbWUiOiJzdXBlcmFkbWluIiwicGFzc3dvcmRIYXNoIjoic3RyaW5nIiwiZmlyc3ROYW1lIjoiQWRtaW4iLCJsYXN0TmFtZSI6IlVzZXIiLCJhdmF0YXJVcmwiOiIiLCJlbWFpbCI6InN1cGVyYWRtaW5AZ21haWwuY29tIiwicGhvbmUiOiIrODQxMjM0NTY3ODkiLCJiaXJ0aGRheSI6IjE5OTAtMDEtMDEiLCJhZGRyZXNzIjoiMTIzIE1haW4gU3QiLCJzdGF0dXMiOjEsInJvbGUiOjEsImlzQWN0aXZlIjp0cnVlLCJmYXZvcml0ZUxvY2F0aW9uc0lkIjoic3RyaW5nIiwidHJpcHNJZCI6InN0cmluZyIsImlhdCI6MTUxNjIzOTAyMn0.U2OZ_MbDobbY7ie06GU1fhg2zloU90mlClFwQ_pMS9A"
        , UserData)}>Login</Button></div>
  )
}

export default Login