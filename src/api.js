const API_URL = '/api/items'

export async function fetchItems() {
  const res = await fetch(API_URL)
  if (!res.ok) throw new Error('Failed to fetch items')
  return res.json()
}

export async function fetchItem(id) {
  const res = await fetch(`${API_URL}/${id}`)
  if (!res.ok) throw new Error('Failed to fetch item')
  return res.json()
}

export async function createItem(data) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error || 'Failed to create item')
  }
  return res.json()
}

export async function updateItem(id, data) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error || 'Failed to update item')
  }
  return res.json()
}

export async function deleteItem(id) {
  const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error || 'Failed to delete item')
  }
  return res.json()
}
