import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { LibraryCard } from './LibraryCard.jsx'

const CARD_WIDTH = 170
const CARD_GAP = 16
const CARD_PITCH = CARD_WIDTH + CARD_GAP
const OVERSCAN_PX = CARD_PITCH * 2
const SNAP_PROJECTION_MS = 220
const EDGE_DAMPING = 0.35

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

function applyEdgeDamping(rawPosition, maxIndex) {
  if (rawPosition < 0) {
    return rawPosition * EDGE_DAMPING
  }

  if (rawPosition > maxIndex) {
    return maxIndex + (rawPosition - maxIndex) * EDGE_DAMPING
  }

  return rawPosition
}

function togglePageScrollLock(locked) {
  document.body.classList.toggle('carousel-page-lock', locked)
  document.documentElement.classList.toggle('carousel-page-lock', locked)
}

export function CardCarousel({ items, initialIndex = 0, onCardClick }) {
  const viewportRef = useRef(null)
  const dragStateRef = useRef(null)
  const positionRef = useRef(initialIndex)
  const [position, setPosition] = useState(initialIndex)
  const [viewportWidth, setViewportWidth] = useState(375)
  const [isDragging, setIsDragging] = useState(false)

  const maxIndex = items.length - 1

  useEffect(() => {
    positionRef.current = position
  }, [position])

  useEffect(() => {
    const viewport = viewportRef.current

    if (!viewport) {
      return undefined
    }

    const updateViewportWidth = () => {
      setViewportWidth(viewport.clientWidth || 375)
    }

    updateViewportWidth()

    const resizeObserver = new ResizeObserver(updateViewportWidth)
    resizeObserver.observe(viewport)
    window.addEventListener('resize', updateViewportWidth)

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('resize', updateViewportWidth)
    }
  }, [])

  useEffect(
    () => () => {
      togglePageScrollLock(false)
    },
    [],
  )

  const centerOffset = viewportWidth / 2 - CARD_WIDTH / 2
  const trackOffset = centerOffset - position * CARD_PITCH
  const activeIndex = clamp(Math.round(position), 0, maxIndex)

  const visibleRange = useMemo(() => {
    const start = clamp(
      Math.floor((-trackOffset - CARD_WIDTH - OVERSCAN_PX) / CARD_PITCH),
      0,
      maxIndex,
    )
    const end = clamp(
      Math.ceil((viewportWidth - trackOffset + OVERSCAN_PX) / CARD_PITCH),
      0,
      maxIndex,
    )

    return { start, end }
  }, [maxIndex, trackOffset, viewportWidth])

  const snapToIndex = useCallback(
    (nextIndex) => {
      const clampedIndex = clamp(nextIndex, 0, maxIndex)
      positionRef.current = clampedIndex
      setPosition(clampedIndex)
    },
    [maxIndex],
  )

  const handlePointerDown = useCallback((event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) {
      return
    }

    if (event.target instanceof Element && event.target.closest('.library-card__action')) {
      return
    }

    event.preventDefault()
    event.currentTarget.setPointerCapture?.(event.pointerId)

    const now = performance.now()

    dragStateRef.current = {
      lastRawPosition: positionRef.current,
      pointerId: event.pointerId,
      samples: [{ time: now, x: event.clientX }],
      startPosition: positionRef.current,
      startX: event.clientX,
      target: event.currentTarget,
    }

    setIsDragging(true)
    togglePageScrollLock(true)
  }, [])

  const handlePointerMove = useCallback(
    (event) => {
      const dragState = dragStateRef.current

      if (!dragState || dragState.pointerId !== event.pointerId) {
        return
      }

      event.preventDefault()

      const deltaX = event.clientX - dragState.startX
      const rawPosition = dragState.startPosition - deltaX / CARD_PITCH
      const dampedPosition = applyEdgeDamping(rawPosition, maxIndex)
      const now = performance.now()

      dragState.lastRawPosition = rawPosition
      dragState.samples.push({ time: now, x: event.clientX })
      dragState.samples = dragState.samples.filter((sample) => now - sample.time <= 120)

      positionRef.current = dampedPosition
      setPosition(dampedPosition)
    },
    [maxIndex],
  )

  const endDrag = useCallback(
    (pointerId) => {
      const dragState = dragStateRef.current

      if (!dragState || (pointerId !== undefined && dragState.pointerId !== pointerId)) {
        return
      }

      const samples = dragState.samples
      let velocityPxPerMs = 0

      if (samples.length > 1) {
        const firstSample = samples[0]
        const lastSample = samples[samples.length - 1]
        const deltaTime = Math.max(lastSample.time - firstSample.time, 1)

        velocityPxPerMs = (lastSample.x - firstSample.x) / deltaTime
      }

      const projectedPosition = dragState.lastRawPosition - (velocityPxPerMs * SNAP_PROJECTION_MS) / CARD_PITCH
      const targetIndex = Math.round(clamp(projectedPosition, 0, maxIndex))

      dragState.target.releasePointerCapture?.(dragState.pointerId)
      dragStateRef.current = null

      setIsDragging(false)
      togglePageScrollLock(false)
      snapToIndex(targetIndex)
    },
    [maxIndex, snapToIndex],
  )

  const handlePointerUp = useCallback(
    (event) => {
      endDrag(event.pointerId)
    },
    [endDrag],
  )

  const handlePointerCancel = useCallback(
    (event) => {
      endDrag(event.pointerId)
    },
    [endDrag],
  )

  const visibleItems = []

  for (let index = visibleRange.start; index <= visibleRange.end; index += 1) {
    const item = items[index]
    const distance = Math.abs(index - position)
    const direction = index < position ? -1 : 1
    const translateX = trackOffset + index * CARD_PITCH
    const scale = Math.max(0.88, 1 - Math.min(distance, 1.6) * 0.08)
    const opacity = Math.max(0.34, 1 - Math.min(distance, 2.4) * 0.28)
    const rotate = distance < 0.12 ? 0 : direction * Math.min(distance, 1.1) * 7
    const lift = Math.min(distance, 1.5) * 10

    visibleItems.push(
      <div
        key={item.id}
        className="card-carousel__item"
        data-active={index === activeIndex}
        style={{
          opacity,
          transform: `translate3d(${translateX}px, ${lift}px, 0) scale(${scale}) rotate(${rotate}deg)`,
          transition: isDragging
            ? 'none'
            : 'transform 200ms ease-out, opacity 200ms ease-out',
          zIndex: 1000 - Math.round(distance * 100),
        }}
      >
        <LibraryCard
          compact
          title={item.title}
          description={item.description}
          total={item.total}
          onClick={onCardClick ? () => onCardClick(item) : undefined}
        />
      </div>,
    )
  }

  return (
    <section className="card-carousel" aria-label="资料库卡片轮播">
      <div
        ref={viewportRef}
        className="card-carousel__viewport"
        role="group"
        aria-roledescription="carousel"
        onPointerCancel={handlePointerCancel}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        <div
          className="card-carousel__track"
          style={{ width: centerOffset * 2 + CARD_WIDTH + maxIndex * CARD_PITCH }}
        >
          {visibleItems}
        </div>
      </div>
    </section>
  )
}
