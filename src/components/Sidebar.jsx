import { useState } from 'react'
import './Sidebar.css'

const NAV_ITEMS = [
  { key: 'dashboard', label: 'Dashboard', icon: '📊' },
  { key: 'items', label: 'All Items', icon: '📋' },
  { key: 'add', label: 'Add Item', icon: '➕' },
  { key: 'about', label: 'About', icon: 'ℹ️' },
]

export default function Sidebar({ current, onNavigate }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleNav = (key) => {
    onNavigate(key)
    setMobileOpen(false)
  }

  return (
    <>
      <button
        className="sidebar-toggle"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
      >
        {mobileOpen ? '✕' : '☰'}
      </button>
      <aside className={`sidebar ${mobileOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <span className="sidebar-logo">🎓</span>
          <div className="sidebar-title">
            <h2>Lost & Found</h2>
            <span>Campus Tracker</span>
          </div>
        </div>
        <nav className="sidebar-nav">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.key}
              className={`nav-item ${current === item.key ? 'active' : ''}`}
              onClick={() => handleNav(item.key)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="sidebar-footer">
          <p>Helping students reunite</p>
          <p>with their belongings</p>
        </div>
      </aside>
      {mobileOpen && (
        <div className="sidebar-overlay" onClick={() => setMobileOpen(false)} />
      )}
    </>
  )
}
