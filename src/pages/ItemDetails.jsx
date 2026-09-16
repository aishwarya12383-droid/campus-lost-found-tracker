import { useState, useEffect } from 'react'
import { fetchItem, deleteItem } from '../api'
import { useToast } from '../Toast'
import ConfirmDialog from '../components/ConfirmDialog'
import './ItemDetails.css'

export default function ItemDetails({ itemId, onNavigate }) {
  const { showToast } = useToast()
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showConfirm, setShowConfirm] = useState(false)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    let active = true
    ;(async () => {
      try {
        setLoading(true)
        const res = await fetchItem(itemId)
        if (!active) return
        setItem(res)
        setError('')
      } catch (err) {
        if (active) setError(err.message)
      } finally {
        if (active) setLoading(false)
      }
    })()
    return () => {
      active = false
    }
  }, [itemId])

  const handleDelete = async () => {
    try {
      setDeleting(true)
      await deleteItem(itemId)
      showToast(`"${item.itemName}" has been deleted`, 'success')
      onNavigate('items')
    } catch (err) {
      showToast(err.message, 'error')
    } finally {
      setDeleting(false)
    }
  }

  if (loading) {
    return <div className="page-container"><div className="loading-state">Loading item details...</div></div>
  }

  if (error || !item) {
    return (
      <div className="page-container">
        <div className="empty-state">
          <h3>Item not found</h3>
          <p>{error || 'The item you are looking for does not exist.'}</p>
          <button className="btn btn-primary" style={{ marginTop: 16 }} onClick={() => onNavigate('items')}>
            ← Back to All Items
          </button>
        </div>
      </div>
    )
  }

  const statusClass = `badge-status-${item.status.toLowerCase()}`

  return (
    <div className="page-container">
      <div className="page-header">
        <button className="back-link" onClick={() => onNavigate('items')}>
          ← Back to All Items
        </button>
        <h1>{item.itemName}</h1>
        <div className="detail-badges">
          <span className={`badge ${item.itemType === 'Lost' ? 'badge-lost' : 'badge-found'}`}>
            {item.itemType}
          </span>
          <span className={`badge ${statusClass}`}>{item.status}</span>
        </div>
      </div>

      <div className="detail-card">
        <div className="detail-grid">
          <div className="detail-field">
            <span className="detail-label">Category</span>
            <span className="detail-value"><span className="badge badge-category">{item.category}</span></span>
          </div>
          <div className="detail-field">
            <span className="detail-label">Location</span>
            <span className="detail-value">📍 {item.location}</span>
          </div>
          <div className="detail-field">
            <span className="detail-label">Date</span>
            <span className="detail-value">📅 {formatDate(item.date)}</span>
          </div>
          <div className="detail-field">
            <span className="detail-label">Status</span>
            <span className="detail-value"><span className={`badge ${statusClass}`}>{item.status}</span></span>
          </div>
          <div className="detail-field">
            <span className="detail-label">Reported By</span>
            <span className="detail-value">👤 {item.studentName}</span>
          </div>
          <div className="detail-field">
            <span className="detail-label">Contact Number</span>
            <span className="detail-value">📞 {item.contactNumber || '—'}</span>
          </div>
        </div>

        <div className="detail-description">
          <h3>Description</h3>
          <p>{item.description || 'No description provided.'}</p>
        </div>

        <div className="detail-meta">
          <span>Reported on {formatDate(item.date)}</span>
        </div>

        <div className="detail-actions">
          <button className="btn btn-primary" onClick={() => onNavigate('edit:' + item.id)}>
            ✏️ Edit Item
          </button>
          <button className="btn btn-danger" onClick={() => setShowConfirm(true)}>
            🗑️ Delete
          </button>
          <button className="btn btn-secondary" onClick={() => onNavigate('items')}>
            ← Back
          </button>
        </div>
      </div>

      <ConfirmDialog
        open={showConfirm}
        title="Delete this item?"
        message={`Are you sure you want to delete "${item.itemName}"? This action cannot be undone.`}
        confirmLabel={deleting ? 'Deleting...' : 'Delete'}
        onConfirm={handleDelete}
        onCancel={() => setShowConfirm(false)}
      />
    </div>
  )
}

function formatDate(dateStr) {
  if (!dateStr) return '—'
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}
