'use client'

import React, { useEffect, useRef, useState } from 'react'

interface AnimatedCounterProps {
  target: number
  duration?: number
  className?: string
}

export default function AnimatedCounter({ target, duration = 1200, className = '' }: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const nodeRef = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const node = nodeRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true
            const startTime = performance.now()

            const animate = (currentTime: number) => {
              const elapsed = currentTime - startTime
              const progress = Math.min(elapsed / duration, 1)
              // Ease out quart
              const easeProgress = 1 - Math.pow(1 - progress, 4)
              const currentVal = Math.round(easeProgress * target)
              setCount(currentVal)

              if (progress < 1) {
                requestAnimationFrame(animate)
              } else {
                setCount(target)
              }
            }

            requestAnimationFrame(animate)
            observer.unobserve(node)
          }
        })
      },
      { threshold: 0.15 }
    )

    observer.observe(node)

    // Fallback if already in view or observer delayed
    const timer = setTimeout(() => {
      if (!hasAnimated.current && node) {
        const rect = node.getBoundingClientRect()
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          hasAnimated.current = true
          setCount(target)
        }
      }
    }, 400)

    return () => {
      observer.disconnect()
      clearTimeout(timer)
    }
  }, [target, duration])

  return (
    <div ref={nodeRef} className={className}>
      {count}
    </div>
  )
}
