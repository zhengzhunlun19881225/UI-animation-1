import { libraryFiles } from '../data/libraryData.js'
import { ArrowLeftIcon } from '../components/Icons.jsx'

function SearchIcon() {
  return (
    <svg className="library-detail__search-icon" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="11" cy="11" r="7.5" stroke="currentColor" strokeWidth="2.25" fill="none" />
      <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" />
    </svg>
  )
}

function FilterIcon() {
  return (
    <svg className="library-detail__filter-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M3.75 5.25H20.25L14.25 12.02V19.5L9.75 17.1V12.02L3.75 5.25Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M18 9.75H20.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M17.5 14H20.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function DotsIcon() {
  return (
    <span className="library-detail__dots" aria-hidden="true">
      <span />
      <span />
      <span />
    </span>
  )
}

function FileTypeIcon({ type }) {
  return <span className={`file-type-icon file-type-icon--${type}`} aria-hidden="true" />
}

export function LibraryDetailScreen({ onBack }) {
  return (
    <section className="phone-screen phone-screen--detail" aria-label="知识库二级页面">
      <div className="library-detail">
        <header className="library-detail__status">
          <span>9:41</span>
          <div className="library-detail__status-icons" aria-hidden="true">
            <span className="signal-bars">
              <span />
              <span />
              <span />
              <span />
            </span>
            <span className="wifi-icon" />
            <span className="battery-icon">
              <span />
            </span>
          </div>
        </header>

        <button className="library-detail__back" type="button" onClick={onBack} aria-label="返回首页">
          <ArrowLeftIcon />
        </button>

        <section className="library-detail__hero">
          <h2 className="library-detail__title">最新</h2>
          <div className="library-detail__search-row">
            <div className="library-detail__search">
              <SearchIcon />
              <span>输入相关关键词</span>
            </div>
            <button className="library-detail__filter-button" type="button" aria-label="筛选">
              <FilterIcon />
            </button>
          </div>
        </section>

        <p className="library-detail__section-label">最近打开记录</p>

        <main className="library-detail__list">
          {libraryFiles.map((file) => (
            <article key={file.id} className="library-detail__item">
              <div className="library-detail__file-leading">
                <FileTypeIcon type={file.type} />
              </div>
              <div className="library-detail__file-content">
                <h3 className="library-detail__file-title">{file.title}</h3>
                <p className="library-detail__file-meta">
                  <span>{file.size}</span>
                  <span className="library-detail__meta-divider">|</span>
                  <span>{file.updatedAt}</span>
                </p>
              </div>
              <button className="library-detail__more" type="button" aria-label={`${file.title} 更多`}>
                <DotsIcon />
              </button>
            </article>
          ))}
        </main>
      </div>
    </section>
  )
}
