import './About.css'

export default function About() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>About This Project</h1>
        <p>Learn how the Campus Lost & Found Tracker works</p>
      </div>

      <div className="about-card">
        <section className="about-section">
          <div className="about-icon">🎓</div>
          <div>
            <h2>Project Description</h2>
            <p>
              The Campus Lost & Found Tracker is a college web application designed to help students
              report and track lost and found items. Whether a student has misplaced their ID card,
              lost a textbook, or found someone else's wallet on campus, this platform makes it easy
              to log the item, search for matches, and coordinate returns — all in one place.
            </p>
          </div>
        </section>

        <section className="about-section">
          <div className="about-icon">⚙️</div>
          <div>
            <h2>Tech Stack</h2>
            <ul className="about-list">
              <li><strong>Frontend:</strong> React + Vite, JavaScript, CSS</li>
              <li><strong>Backend:</strong> Node.js + Express</li>
              <li><strong>Storage:</strong> JSON file (no database required)</li>
            </ul>
          </div>
        </section>

        <section className="about-section">
          <div className="about-icon">✨</div>
          <div>
            <h2>Features</h2>
            <ul className="about-list">
              <li>Dashboard with live statistics (total, lost, found, returned)</li>
              <li>Add new lost or found reports with a simple form</li>
              <li>Search items by name and filter by type, category, and status</li>
              <li>View full details of any item</li>
              <li>Edit existing reports</li>
              <li>Delete reports with a confirmation dialog</li>
              <li>Toast notifications for every action</li>
              <li>Responsive design that works on mobile and desktop</li>
            </ul>
          </div>
        </section>

        <section className="about-section">
          <div className="about-icon">🔄</div>
          <div>
            <h2>CRUD Operations Explained</h2>
            <div className="crud-grid">
              <div className="crud-item crud-create">
                <h3>Create</h3>
                <p>Students can add a new lost or found item by filling out the Add Item form. The report is saved to the backend and instantly appears in the list.</p>
              </div>
              <div className="crud-item crud-read">
                <h3>Read</h3>
                <p>All items are displayed as cards on the All Items page. Each card shows the item name, type badge, category, location, date, and status. Clicking View opens full details.</p>
              </div>
              <div className="crud-item crud-update">
                <h3>Update</h3>
                <p>Any existing report can be edited. The Edit form is pre-filled with the current values, and changes are saved back to the server.</p>
              </div>
              <div className="crud-item crud-delete">
                <h3>Delete</h3>
                <p>Reports can be removed with a confirmation popup to prevent accidental deletion. Once confirmed, the item is permanently removed.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="about-section">
          <div className="about-icon">🔌</div>
          <div>
            <h2>Backend API</h2>
            <p>The Express server exposes the following REST endpoints:</p>
            <ul className="about-list api-list">
              <li><code>GET /api/items</code> — Fetch all items</li>
              <li><code>GET /api/items/:id</code> — Fetch a single item</li>
              <li><code>POST /api/items</code> — Create a new item</li>
              <li><code>PUT /api/items/:id</code> — Update an existing item</li>
              <li><code>DELETE /api/items/:id</code> — Delete an item</li>
            </ul>
            <p>Data is stored in <code>backend/data/items.json</code>.</p>
          </div>
        </section>
      </div>
    </div>
  )
}
