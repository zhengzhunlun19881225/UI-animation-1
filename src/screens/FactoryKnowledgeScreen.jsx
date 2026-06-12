import factoryScene from '../assets/factory-scene.png'
import { factoryPreviewTags } from '../data/libraryData.js'
import { ArrowLeftIcon } from '../components/Icons.jsx'
import { LibraryCard } from '../components/LibraryCard.jsx'

export function FactoryKnowledgeScreen() {
  return (
    <section className="phone-screen phone-screen--factory" aria-label="工厂知识库页面">
      <div className="ambient ambient--top-right" aria-hidden="true" />
      <div className="ambient ambient--bottom-left" aria-hidden="true" />

      <div className="factory-preview-cards" aria-hidden="true">
        <div className="factory-preview-card factory-preview-card--left">
          <LibraryCard
            title="财务资料库"
            description="财务资料库财务资料库财务资料库财务资料库"
            total={46}
            compact
            tilted
          />
        </div>
        <div className="factory-preview-card factory-preview-card--right">
          <LibraryCard
            title="节能资料库"
            description="财务资料库财务资料库财务资料库财务资料库"
            total={46}
            compact
            tilted
          />
        </div>
      </div>

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

        <div className="bottom-indicator" aria-hidden="true" />
      </main>
    </section>
  )
}
