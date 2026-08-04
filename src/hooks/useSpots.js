import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'

// HU-02, HU-03: trae los espacios del piso seleccionado junto con la
// visita activa (si el espacio está ocupado), y se mantiene sincronizado
// en tiempo real cuando hay una entrada o salida (HU-04, HU-07).
export function useSpots(floor, session) {
  const [spots, setSpots] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // No hacer nada si no hay sesión
    if (!session) {
      setSpots([])
      setLoading(false)
      return
    }

    let isMounted = true
    let subscription

    async function fetchSpots() {
      try {
        setLoading(true)
        const { data, error: fetchError } = await supabase
          .from('spots')
          .select('id, floor, spot_number, code, visits(id, plate, visitor_name, apartment, entry_time, exit_time)')
          .eq('floor', floor)
          .order('spot_number', { ascending: true })

        if (fetchError) throw fetchError

        if (isMounted) {
          const normalized = (data || []).map((spot) => {
            const activeVisit = spot.visits?.find((v) => v.exit_time === null) || null
            return { ...spot, activeVisit }
          })
          setSpots(normalized)
          setError(null)
        }
      } catch (err) {
        if (isMounted) {
          setError(err)
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    // Ejecutar fetch inicial
    fetchSpots()

    // Suscribirse a cambios en tiempo real
    subscription = supabase
      .channel(`visits-realtime-${floor}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'visits' },
        () => {
          if (isMounted) {
            fetchSpots()
          }
        }
      )
      .subscribe()

    // Cleanup
    return () => {
      isMounted = false
      supabase.removeChannel(subscription)
    }
  }, [floor, session])

  const refetch = async () => {
    setLoading(true)
    try {
      const { data, error: fetchError } = await supabase
        .from('spots')
        .select('id, floor, spot_number, code, visits(id, plate, visitor_name, apartment, entry_time, exit_time)')
        .eq('floor', floor)
        .order('spot_number', { ascending: true })

      if (fetchError) throw fetchError

      const normalized = (data || []).map((spot) => {
        const activeVisit = spot.visits?.find((v) => v.exit_time === null) || null
        return { ...spot, activeVisit }
      })
      setSpots(normalized)
      setError(null)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  return { spots, loading, error, refetch }
}
