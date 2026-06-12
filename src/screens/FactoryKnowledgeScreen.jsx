import { useState } from 'react'
import factoryBackground from '../assets/factory-background.png'
import factoryScene from '../assets/factory-scene.png'
import { factoryCarouselCards, factoryPreviewTags } from '../data/libraryData.js'
import { ArrowLeftIcon } from '../components/Icons.jsx'
import { CardCarousel } from '../components/CardCarousel.jsx'

export function FactoryKnowledgeScreen({ onOpenLibrary }) {
  const [activeHotspot, setActiveHotspot] = useState(null)

  return (
    <section className="phone-screen phone-screen--factory" aria-label="工厂知识库页面">
      <img className="factory-screen__background" src={factoryBackground} alt="" />
      <div className="factory-screen__background-glow" aria-hidden="true" />

      <header className="screen-header">
        <button className="back-link" type="button" aria-label="返回">
          <ArrowLeftIcon />
          <span>知识库</span>
        </button>
      </header>

      <main className="factory-screen__content">
        <h2 className="factory-screen__title">工厂知识库</h2>

        <div
          className={`factory-hero${activeHotspot ? ' is-focused' : ''}`}
          onPointerLeave={() => setActiveHotspot(null)}
        >
          <img
            className={`factory-hero__image${activeHotspot ? ' has-target' : ''}`}
            src={factoryScene}
            alt=""
          />
          {factoryPreviewTags.map((tag) => (
            <div
              key={`${tag.id}-highlight`}
              className={`factory-hero__building-highlight factory-hero__building-highlight--${tag.id}${activeHotspot === tag.id ? ' is-active' : ''}${activeHotspot && activeHotspot !== tag.id ? ' is-dimmed' : ''}`}
              aria-hidden="true"
            />
          ))}
          <div className="factory-hero__roof-glow" aria-hidden="true" />
          <div className="factory-hero__smoke factory-hero__smoke--one" aria-hidden="true" />
          <div className="factory-hero__smoke factory-hero__smoke--two" aria-hidden="true" />
          <div className="factory-hero__smoke factory-hero__smoke--three" aria-hidden="true" />
          {factoryPreviewTags.map((tag) => (
            <button
              key={tag.id}
              className={`${tag.className}${activeHotspot === tag.id ? ' is-active' : ''}${activeHotspot && activeHotspot !== tag.id ? ' is-dimmed' : ''}`}
              type="button"
              onPointerEnter={() => setActiveHotspot(tag.id)}
              onFocus={() => setActiveHotspot(tag.id)}
              onBlur={() => setActiveHotspot(null)}
              onClick={() => setActiveHotspot(tag.id)}
            >
              {tag.label}
            </button>
          ))}
          {factoryPreviewTags.map((tag) => (
            <button
              key={`${tag.id}-hotspot`}
              type="button"
              className={`factory-hero__hotspot factory-hero__hotspot--${tag.id}${activeHotspot === tag.id ? ' is-active' : ''}${activeHotspot && activeHotspot !== tag.id ? ' is-dimmed' : ''}`}
              aria-label={`${tag.label} 建筑区域`}
              onPointerEnter={() => setActiveHotspot(tag.id)}
              onFocus={() => setActiveHotspot(tag.id)}
              onBlur={() => setActiveHotspot(null)}
              onClick={() => setActiveHotspot(tag.id)}
            />
          ))}
        </div>

        <div className="factory-carousel-section">
          <CardCarousel
            items={factoryCarouselCards}
            initialIndex={1}
            onCardClick={onOpenLibrary}
          />
        </div>
      </main>
    </section>
  )
}
