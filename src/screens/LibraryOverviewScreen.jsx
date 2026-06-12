import { libraryCards } from '../data/libraryData.js'
import { LibraryCard } from '../components/LibraryCard.jsx'

export function LibraryOverviewScreen() {
  return (
    <section className="phone-screen phone-screen--library" aria-label="资料库页面">
      <div className="ambient ambient--top-right" aria-hidden="true" />
      <div className="ambient ambient--bottom-left" aria-hidden="true" />

      <main className="library-grid">
        {libraryCards.map((card) => (
          <LibraryCard
            key={card.id}
            title={card.title}
            description={card.description}
            total={card.total}
          />
        ))}
      </main>
    </section>
  )
}
