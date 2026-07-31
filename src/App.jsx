import { useMemo, useState } from 'react'
import { useSpots } from './hooks/useSpots'
import { useAuth } from './hooks/useAuth'
import Login from './components/Login'
import Header from './components/Header'
import SpotTile from './components/SpotTile'

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
      <Header onSignOut={signOut} />

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-5 sm:px-6 lg:grid lg:grid-cols-[1fr_130px] lg:px-8 lg:py-8">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {[1,2,3,4,5,6,7,8,9,10].map((spot) => (
                <SpotTile key={spot.id}/>
              ))}
        </div>
        <aside className="rounded-2xl border border-slate-800 bg-slate-900/70 p-3 shadow-sm shadow-slate-950/40 lg:sticky lg:top-24 lg:self-start">
          <p className="mb-3 text-center text-[10px] font-semibold uppercase tracking-[0.28em] text-slate-500">Piso</p>
          <div className="flex flex-wrap justify-center gap-2 lg:flex-col lg:gap-3">
            {[1,2,3].map((floor) => {
              return (
                <button
                  key={floor}
                  className={`flex mx-auto h-16 w-16 flex-col items-center justify-center rounded-full border text-sm transition 'border-sky-400 bg-sky-500/10 text-slate-100 shadow-[0_0_0_1px_rgba(56,189,248,0.15)]`}
                >
                  <span className="font-mono text-lg font-semibold">{floor}</span>
                  <span className="text-[10px] text-slate-500">10 libres</span>
                </button>
              )
            })}
          </div>
        </aside>
      </main>
    </div>
  )
}
