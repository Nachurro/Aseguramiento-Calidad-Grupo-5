import { useMemo, useState } from 'react'
import { useAuth } from './hooks/useAuth'
import Login from './components/Login'



export default function App() {
  const { session, loading: authLoading, signOut } = useAuth()
 

  if (authLoading) {
    return <div className="flex min-h-screen items-center justify-center bg-slate-950 text-sm text-slate-400">Cargando…</div>
  }

  if (!session) {
    return <Login />
  }


  return (
    <div className="min-h-screen text-slate-100">
      
    </div>
  )
}
