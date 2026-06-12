import folderIcon from '../assets/library-folder.png'
import { CornerArrowIcon } from './Icons.jsx'

export function LibraryCard({
  title,
  description,
  total,
  compact = false,
  tilted = false,
  accent = false,
}) {
  const classNames = ['library-card']

  if (compact) {
    classNames.push('library-card--compact')
  }

  if (tilted) {
    classNames.push('library-card--tilted')
  }

  if (accent) {
    classNames.push('library-card--accent')
  }

  return (
    <article className={classNames.join(' ')}>
      <div className="library-card__icon-wrap">
        <img className="library-card__icon" src={folderIcon} alt="" />
      </div>
      <h2 className="library-card__title">{title}</h2>
      <p className="library-card__description">{description}</p>
      <div className="library-card__divider" aria-hidden="true" />
      <p className="library-card__total">{total}</p>
      <p className="library-card__label">总计</p>
      <div className="library-card__action" aria-hidden="true">
        <CornerArrowIcon />
      </div>
    </article>
  )
}
