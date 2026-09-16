import { useState, useEffect, useCallback } from 'react'
import { fetchItems } from '../api'
import StatCard from '../components/StatCard'
import ItemCard from '../components/ItemCard'
import './Dashboard.css'

export default function Dashboard({ onNavigate, onSelectItem }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = useCallback(async () => {
    try {
      setLoading(true)
      const data = await fetchItems()
      setItems(data)
      setError('')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const total = items.length
  const lost = items.filter((i) => i.itemType === 'Lost').length
  const found = items.filter((i) => i.itemType === 'Found').length
  const returned = items.filter((i) => i.status === 'Returned').length

  const recent = [...items]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 4)

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Dashboard</h1>
        <p>Overview of all lost and found reports on campus</p>
      </div>

      {error && <div className="form-error">{error}</div>}

      {loading ? (
        <div className="loading-state">Loading dashboard...</div>
      ) : (
        <>
          <div className="stats-grid">
            <StatCard label="Total Reports" value={total} icon="📋" color="blue" />
            <StatCard label="Lost Items" value={lost} icon="🔍" color="orange" />
            <StatCard label="Found Items" value={found} icon="✅" color="green" />
            <StatCard label="Returned Items" value={returned} icon="🎉" color="purple" />
          </div>

          <div className="dashboard-recent">
            <div className="section-header">
              <h2>Recent Reports</h2>
              <button className="btn btn-primary btn-sm" onClick={() => onNavigate('items')}>
                View All →
              </button>
            </div>
            {recent.length === 0 ? (
              <div className="empty-state">
                <h3>No reports yet</h3>
                <p>Start by adding a lost or found item.</p>
              </div>
            ) : (
              <div className="items-grid">
                {recent.map((item) => (
                  <ItemCard
                    key={item.id}
                    item={item}
                    onView={onSelectItem}
                    onEdit={(it) => onNavigate('edit:' + it.id)}
                    onDelete={() => onNavigate('items')}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="dashboard-cta">
            <div className="cta-content">
              <h3>Report an Item</h3>
              <p>Lost something or found someone's belongings? Add a report to help reunite items with their owners.</p>
            </div>
            <button className="btn btn-primary" onClick={() => onNavigate('add')}>
              ➕ Add New Report
            </button>
          </div>
        </>
      )}
    </div>
  )
}
