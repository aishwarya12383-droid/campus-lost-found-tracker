import { useState, useEffect } from 'react'
import { fetchItem, createItem, updateItem } from '../api'
import { useToast } from '../Toast'
import './AddItem.css'

const CATEGORIES = ['ID Card', 'Electronics', 'Books', 'Bag', 'Keys', 'Wallet', 'Other']
const STATUSES = ['Open', 'Matched', 'Returned']

const EMPTY_FORM = {
  itemName: '',
  itemType: 'Lost',
  category: 'Electronics',
  location: '',
  date: '',
  studentName: '',
  contactNumber: '',
  description: '',
  status: 'Open',
}

export default function AddItem({ editId, onNavigate }) {
  const { showToast } = useToast()
  const isEdit = !!editId

  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [loading, setLoading] = useState(isEdit)

  useEffect(() => {
    if (!editId) {
      setForm(EMPTY_FORM)
      setLoading(false)
      return
    }
    let active = true
    ;(async () => {
      try {
        setLoading(true)
        const item = await fetchItem(editId)
        if (!active) return
        setForm({
          itemName: item.itemName || '',
          itemType: item.itemType || 'Lost',
          category: item.category || 'Electronics',
          location: item.location || '',
          date: item.date || '',
          studentName: item.studentName || '',
          contactNumber: item.contactNumber || '',
          description: item.description || '',
          status: item.status || 'Open',
        })
      } catch (err) {
        showToast(err.message, 'error')
      } finally {
        if (active) setLoading(false)
      }
    })()
    return () => {
      active = false
    }
  }, [editId, showToast])

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }))
    }
  }

  const validate = () => {
    const e = {}
    if (!form.itemName.trim()) e.itemName = 'Item name is required'
    if (!form.location.trim()) e.location = 'Location is required'
    if (!form.date) e.date = 'Date is required'
    if (!form.studentName.trim()) e.studentName = 'Student name is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) {
      showToast('Please fill in all required fields', 'error')
      return
    }
    try {
      setSubmitting(true)
      if (isEdit) {
        await updateItem(editId, form)
        showToast(`"${form.itemName}" has been updated`, 'success')
      } else {
        await createItem(form)
        showToast(`"${form.itemName}" has been added`, 'success')
      }
      onNavigate('items')
    } catch (err) {
      showToast(err.message, 'error')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return <div className="page-container"><div className="loading-state">Loading form...</div></div>
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>{isEdit ? 'Edit Item' : 'Add Item'}</h1>
        <p>{isEdit ? 'Update the details of this report' : 'Report a lost or found item on campus'}</p>
      </div>

      <form className="form-card" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>Item Name <span className="req">*</span></label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. Black Laptop Bag"
              value={form.itemName}
              onChange={(e) => handleChange('itemName', e.target.value)}
            />
            {errors.itemName && <span className="field-error">{errors.itemName}</span>}
          </div>
          <div className="form-group">
            <label>Item Type <span className="req">*</span></label>
            <div className="type-toggle">
              <button
                type="button"
                className={`type-btn ${form.itemType === 'Lost' ? 'active lost' : ''}`}
                onClick={() => handleChange('itemType', 'Lost')}
              >
                🔍 Lost
              </button>
              <button
                type="button"
                className={`type-btn ${form.itemType === 'Found' ? 'active found' : ''}`}
                onClick={() => handleChange('itemType', 'Found')}
              >
                ✅ Found
              </button>
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Category <span className="req">*</span></label>
            <select
              className="form-control"
              value={form.category}
              onChange={(e) => handleChange('category', e.target.value)}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Status <span className="req">*</span></label>
            <select
              className="form-control"
              value={form.status}
              onChange={(e) => handleChange('status', e.target.value)}
            >
              {STATUSES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Location <span className="req">*</span></label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. Library - 2nd Floor"
              value={form.location}
              onChange={(e) => handleChange('location', e.target.value)}
            />
            {errors.location && <span className="field-error">{errors.location}</span>}
          </div>
          <div className="form-group">
            <label>Date <span className="req">*</span></label>
            <input
              type="date"
              className="form-control"
              value={form.date}
              onChange={(e) => handleChange('date', e.target.value)}
            />
            {errors.date && <span className="field-error">{errors.date}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Student Name <span className="req">*</span></label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. John Doe"
              value={form.studentName}
              onChange={(e) => handleChange('studentName', e.target.value)}
            />
            {errors.studentName && <span className="field-error">{errors.studentName}</span>}
          </div>
          <div className="form-group">
            <label>Contact Number</label>
            <input
              type="tel"
              className="form-control"
              placeholder="e.g. 9876543210"
              value={form.contactNumber}
              onChange={(e) => handleChange('contactNumber', e.target.value)}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            className="form-control"
            placeholder="Add any additional details about the item..."
            value={form.description}
            onChange={(e) => handleChange('description', e.target.value)}
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={submitting}>
            {submitting ? 'Saving...' : isEdit ? 'Update Item' : '➕ Add Item'}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => onNavigate('items')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
