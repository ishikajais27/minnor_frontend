'use client'
import { useEffect, useRef } from 'react'

export default function FluidBg() {
  const iframeRef = useRef(null)

  useEffect(() => {
    const iframe = iframeRef.current
    if (!iframe) return

    function forward(e) {
      if (!iframe.contentWindow) return
      const rect = iframe.getBoundingClientRect()
      iframe.contentWindow.dispatchEvent(
        new MouseEvent(e.type, {
          bubbles: true,
          clientX: e.clientX - rect.left,
          clientY: e.clientY - rect.top,
          movementX: e.movementX,
          movementY: e.movementY,
        }),
      )
    }

    window.addEventListener('mousemove', forward)
    window.addEventListener('mousedown', forward)
    window.addEventListener('mouseup', forward)

    return () => {
      window.removeEventListener('mousemove', forward)
      window.removeEventListener('mousedown', forward)
      window.removeEventListener('mouseup', forward)
    }
  }, [])

  return <iframe ref={iframeRef} className="fluid-bg" src="/fluid.html" />
}
