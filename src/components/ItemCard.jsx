import './ItemCard.css'

export default function ItemCard({ item, onView, onEdit, onDelete }) {
  const statusClass = item.status
    ? `badge-status-${item.status.toLowerCase()}`
    : 'badge-status-open'

  return (
    <div className="item-card">
      <div className="item-card-top">
        <span className={`badge ${item.itemType === 'Lost' ? 'badge-lost' : 'badge-found'}`}>
          {item.itemType}
        </span>
        <span className={`badge ${statusClass}`}>{item.status}</span>
      </div>
      <h3 className="item-card-title">{item.itemName}</h3>
      <div className="item-card-meta">
        <div className="meta-row">
          <span className="meta-label">Category</span>
          <span className="badge badge-category">{item.category}</span>
        </div>
        <div className="meta-row">
          <span className="meta-label">Location</span>
          <span className="meta-value">📍 {item.location}</span>
        </div>
        <div className="meta-row">
          <span className="meta-label">Date</span>
          <span className="meta-value">📅 {formatDate(item.date)}</span>
        </div>
      </div>
      <div className="item-card-actions">
        <button className="btn btn-outline btn-sm" onClick={() => onView(item)}>
          View
        </button>
        <button className="btn btn-secondary btn-sm" onClick={() => onEdit(item)}>
          Edit
        </button>
        <button className="btn btn-danger btn-sm" onClick={() => onDelete(item)}>
          Delete
        </button>
      </div>
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
