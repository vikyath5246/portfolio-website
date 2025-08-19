import { useState, useEffect } from 'react'

interface MousePosition {
  x: number
  y: number
}

export const useMouseGlow = () => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (isMobile) return
    
    let rafId: number
    let lastX = 0
    let lastY = 0
    
    const handleMouseMove = (event: MouseEvent) => {
      // Throttle updates for smoother performance
      if (Math.abs(event.clientX - lastX) < 2 && Math.abs(event.clientY - lastY) < 2) {
        return
      }
      
      lastX = event.clientX
      lastY = event.clientY
      
      // Use requestAnimationFrame for optimal performance
      rafId = requestAnimationFrame(() => {
        setMousePosition({
          x: event.clientX,
          y: event.clientY
        })
      })
    }
    
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (rafId) {
        cancelAnimationFrame(rafId)
      }
    }
  }, [isMobile])

  return { mousePosition, isMobile }
} 