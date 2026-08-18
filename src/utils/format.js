// Formato de fecha/hora extraído de DetailModal y HistoryPanel (HU-07).

function pad(n) {
  return String(n).padStart(2, '0')
}

/** Formatea una fecha ISO como dd/mm/yy, hh:mm en formato de 24 horas. */
export function formatearHora(isoString) {
  if (!isoString) return '—'
  const date = new Date(isoString)
  const day = pad(date.getDate())
  const month = pad(date.getMonth() + 1) // getMonth() devuelve 0-11
  const year = date.getFullYear().toString().slice(-2)
  const hours = pad(date.getHours())
  const minutes = pad(date.getMinutes())
  return `${day}/${month}/${year}, ${hours}:${minutes}`
}
