export default function HistoryPanel({ onClose }) {
  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-slate-950/75 px-4 py-6 backdrop-blur-sm" onClick={() => {}}>
      <div className="w-full max-w-4xl rounded-2xl border border-slate-800 bg-slate-900/95 p-5 shadow-2xl shadow-slate-950/70" onClick={() => {}}>
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-sky-400">Bitácora</p>
            <h2 className="mt-1 text-xl font-semibold text-slate-100">Historial de registros</h2>
          </div>
          <button type="button" className="rounded-xl px-3 py-2 text-sm text-slate-400 transition hover:text-slate-100" onClick={onClose}>Cerrar</button>
        </div>

        <form className="mb-4 grid gap-2 md:grid-cols-[1.2fr_1fr_1fr_1fr_auto]" onSubmit={() => {}}>
          <input
            placeholder="Placa"
            onChange={() => {}}
          />
          <input
            placeholder="Apartamento"
            type="number"
            onChange={() => {}}
          />
          <input
            type="date"
            onChange={() => {}}
          />
          <input
            type="date"
            onChange={() => {}}
          />
          <button type="submit" className="rounded-xl bg-sky-500 px-3 py-2 text-sm font-semibold text-slate-950 transition hover:bg-sky-400">Filtrar</button>
        </form>

        <div className="max-h-[50vh] overflow-y-auto rounded-xl border border-slate-800">
            <table className="min-w-full border-collapse text-sm">
              <thead className="bg-slate-800/80 text-left text-[11px] uppercase tracking-[0.24em] text-slate-500">
                <tr>
                  <th className="px-3 py-2">Espacio</th>
                  <th className="px-3 py-2">Placa</th>
                  <th className="px-3 py-2">Visitante</th>
                  <th className="px-3 py-2">Apto.</th>
                  <th className="px-3 py-2">Entrada</th>
                  <th className="px-3 py-2">Salida</th>
                </tr>
              </thead>
              <tbody>
                  <tr key="dateplaceholder" className="border-t border-slate-800/80 text-slate-300">
                    <td className="px-3 py-2 font-mono text-slate-100">P1-01</td>
                    <td className="px-3 py-2 font-mono text-slate-100">ABC123</td>
                    <td className="px-3 py-2">Franklin Ramirez</td>
                    <td className="px-3 py-2">1</td>
                    <td className="px-3 py-2 font-mono text-slate-100">8/9/26 13:00</td>
                    <td className="px-3 py-2 font-mono text-slate-100">8/9/26 15:00</td>
                  </tr>
              </tbody>
            </table>
        </div>
      </div>
    </div>
  )
}
