import { useState } from 'react'
import { FactoryKnowledgeScreen } from './screens/FactoryKnowledgeScreen.jsx'
import { LibraryOverviewScreen } from './screens/LibraryOverviewScreen.jsx'
import './App.css'

const views = [
  { id: 'factory', label: '工厂知识库', component: FactoryKnowledgeScreen },
  { id: 'library', label: '资料库', component: LibraryOverviewScreen },
]

function App() {
  const [activeView, setActiveView] = useState('factory')
  const ActiveScreen =
    views.find((view) => view.id === activeView)?.component ?? FactoryKnowledgeScreen

  return (
    <div className="app-shell">
      <header className="demo-toolbar" aria-label="页面切换">
        <div className="demo-toolbar__copy">
          <p className="demo-toolbar__eyebrow">UI Animation Demo</p>
          <h1 className="demo-toolbar__title">Figma Frontend Demo</h1>
        </div>
        <div className="demo-toolbar__tabs" role="tablist" aria-label="Demo views">
          {views.map((view) => (
            <button
              key={view.id}
              type="button"
              role="tab"
              aria-selected={activeView === view.id}
              className={`demo-tab${activeView === view.id ? ' is-active' : ''}`}
              onClick={() => setActiveView(view.id)}
            >
              {view.label}
            </button>
          ))}
        </div>
      </header>

      <main className="demo-stage">
        <ActiveScreen />
      </main>
    </div>
  )
}

export default App
