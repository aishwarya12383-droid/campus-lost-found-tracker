import express from 'express'
import cors from 'cors'
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const PORT = 4000

const DATA_DIR = join(__dirname, 'data')
const DATA_FILE = join(DATA_DIR, 'items.json')

app.use(cors())
app.use(express.json())

function readItems() {
  try {
    const raw = readFileSync(DATA_FILE, 'utf-8')
    return JSON.parse(raw)
  } catch (err) {
    console.error('Error reading items file:', err.message)
    return []
  }
}

function writeItems(items) {
  try {
    if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true })
    writeFileSync(DATA_FILE, JSON.stringify(items, null, 2), 'utf-8')
  } catch (err) {
    console.error('Error writing items file:', err.message)
  }
}

// GET /api/items
app.get('/api/items', (req, res) => {
  const items = readItems()
  res.json(items)
})

// GET /api/items/:id
app.get('/api/items/:id', (req, res) => {
  const items = readItems()
  const item = items.find((i) => i.id === req.params.id)
  if (!item) {
    return res.status(404).json({ error: 'Item not found' })
  }
  res.json(item)
})

// POST /api/items
app.post('/api/items', (req, res) => {
  const items = readItems()
  const {
    itemName,
    itemType,
    category,
    location,
    date,
    studentName,
    contactNumber,
    description,
    status,
  } = req.body

  if (!itemName || !itemType || !category || !location || !date || !studentName) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  const newItem = {
    id: String(Date.now()),
    itemName,
    itemType,
    category,
    location,
    date,
    studentName,
    contactNumber: contactNumber || '',
    description: description || '',
    status: status || 'Open',
    createdAt: new Date().toISOString(),
  }

  items.push(newItem)
  writeItems(items)
  res.status(201).json(newItem)
})

// PUT /api/items/:id
app.put('/api/items/:id', (req, res) => {
  const items = readItems()
  const index = items.findIndex((i) => i.id === req.params.id)
  if (index === -1) {
    return res.status(404).json({ error: 'Item not found' })
  }

  const updated = {
    ...items[index],
    ...req.body,
    id: items[index].id,
    createdAt: items[index].createdAt,
  }

  items[index] = updated
  writeItems(items)
  res.json(updated)
})

// DELETE /api/items/:id
app.delete('/api/items/:id', (req, res) => {
  const items = readItems()
  const index = items.findIndex((i) => i.id === req.params.id)
  if (index === -1) {
    return res.status(404).json({ error: 'Item not found' })
  }

  const deleted = items.splice(index, 1)[0]
  writeItems(items)
  res.json({ message: 'Item deleted', id: deleted.id })
})

app.listen(PORT, () => {
  console.log(`Campus Lost & Found API running on http://localhost:${PORT}`)
})
