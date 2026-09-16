import { useState, useEffect, useCallback } from 'react'
import { fetchItems, deleteItem } from '../api'
import { useToast } from '../Toast'
import ItemCard from '../components/ItemCard'
import ConfirmDialog from '../components/ConfirmDialog'
import './AllItems.css'

export default function AllItems({ onNavigate, onSelectItem, refreshKey }) {
  const { showToast } = useToast()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  const [deleteTarget, setDeleteTarget] = useState(null)
  const [deleting, setDeleting] = useState(false)

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
  }, [load, refreshKey])

  const filtered = items.filter((item) => {
    const matchSearch =
      !search ||
      item.itemName.toLowerCase().includes(search.toLowerCase())
    const matchType = !typeFilter || item.itemType === typeFilter
    const matchCategory = !categoryFilter || item.category === categoryFilter
    const matchStatus = !statusFilter || item.status === statusFilter
    return matchSearch && matchType && matchCategory && matchStatus
  })

  const handleDelete = async () => {
    if (!deleteTarget) return
    try {
      setDeleting(true)
      await deleteItem(deleteTarget.id)
      setItems((prev) => prev.filter((i) => i.id !== deleteTarget.id))
      showToast(`"${deleteTarget.itemName}" has been deleted`, 'success')
      setDeleteTarget(null)
    } catch (err) {
      showToast(err.message, 'error')
    } finally {
      setDeleting(false)
    }
  }

  const clearFilters = () => {
    setSearch('')
    setTypeFilter('')
    setCategoryFilter('')
    setStatusFilter('')
  }

  const hasFilters = search || typeFilter || categoryFilter || statusFilter

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>All Items</h1>
        <p>Browse, search, and manage all lost and found reports</p>
      </div>

      <div className="filters-bar">
        <div className="filter-search">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="form-control"
            placeholder="Search by item name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          className="form-control filter-select"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option value="">All Types</option>
          <option value="Lost">Lost</option>
          <option value="Found">Found</option>
        </select>
        <select
          className="form-control filter-select"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="ID Card">ID Card</option>
          <option value="Electronics">Electronics</option>
          <option value="Books">Books</option>
          <option value="Bag">Bag</option>
          <option value="Keys">Keys</option>
          <option value="Wallet">Wallet</option>
          <option value="Other">Other</option>
        </select>
        <select
          className="form-control filter-select"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="Open">Open</option>
          <option value="Matched">Matched</option>
          <option value="Returned">Returned</option>
        </select>
        {hasFilters && (
          <button className="btn btn-outline btn-sm" onClick={clearFilters}>
            Clear
          </button>
        )}
      </div>

      <div className="results-count">
        Showing {filtered.length} of {items.length} items
      </div>

      {error && <div className="form-error">{error}</div>}

      {loading ? (
        <div className="loading-state">Loading items...</div>
      ) : filtered.length === 0 ? (
        <div className="empty-state">
          <h3>No items found</h3>
          <p>{hasFilters ? 'Try adjusting your filters.' : 'No reports have been added yet.'}</p>
        </div>
      ) : (
        <div className="items-grid">
          {filtered.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              onView={onSelectItem}
              onEdit={(it) => onNavigate('edit:' + it.id)}
              onDelete={setDeleteTarget}
            />
          ))}
        </div>
      )}

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete this item?"
        message={`Are you sure you want to delete "${deleteTarget?.itemName}"? This action cannot be undone.`}
        confirmLabel={deleting ? 'Deleting...' : 'Delete'}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  )
}
