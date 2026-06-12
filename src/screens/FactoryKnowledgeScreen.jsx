import factoryBackground from '../assets/factory-background.png'
import factoryScene from '../assets/factory-scene.png'
import { factoryCarouselCards, factoryPreviewTags } from '../data/libraryData.js'
import { ArrowLeftIcon } from '../components/Icons.jsx'
import { CardCarousel } from '../components/CardCarousel.jsx'

export function FactoryKnowledgeScreen({ onOpenLibrary }) {
  return (
    <section className="phone-screen phone-screen--factory" aria-label="工厂知识库页面">
      <img className="factory-screen__background" src={factoryBackground} alt="" />

      <header className="screen-header">
        <button className="back-link" type="button" aria-label="返回">
          <ArrowLeftIcon />
          <span>知识库</span>
        </button>
      </header>

      <main className="factory-screen__content">
        <h2 className="factory-screen__title">工厂知识库</h2>

        <div className="factory-hero">
          <img className="factory-hero__image" src={factoryScene} alt="" />
          {factoryPreviewTags.map((tag) => (
            <span key={tag.id} className={tag.className}>
              {tag.label}
            </span>
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
