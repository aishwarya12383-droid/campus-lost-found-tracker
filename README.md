# Campus Lost & Found Tracker

A college web application where students can report lost items and found items, search through reports, and coordinate returns — all in one place.

## Project Description

The Campus Lost & Found Tracker helps students log items they've lost or found on campus. Every report goes into a shared list that can be searched and filtered, making it easy to match lost items with found ones and track them through to return.

## Tech Stack

- **Frontend:** React + Vite, JavaScript, CSS
- **Backend:** Node.js + Express
- **Storage:** JSON file (`backend/data/items.json`) — no database required

## Features

- **Dashboard** with live statistics (total reports, lost items, found items, returned items)
- **Add Item** form to create lost or found reports with all required fields
- **All Items** page with search by name and filters by type, category, and status
- **Item Details** page showing full information for a selected report
- **Edit** existing reports with a pre-filled form
- **Delete** reports with a confirmation popup to prevent accidental deletion
- **Toast notifications** for every create, update, and delete action
- **Responsive design** that works on mobile, tablet, and desktop
- **Clean blue-and-white college theme** with green for Found and orange/red for Lost

## CRUD Explanation

| Operation | What It Does |
|-----------|-------------|
| **Create** | Students fill out the Add Item form with item name, type (Lost/Found), category, location, date, student name, contact, description, and status. The report is saved to the backend and appears in the list. |
| **Read** | All items are displayed as cards on the All Items page. Each card shows the name, Lost/Found badge, category, location, date, and status. Clicking "View" opens the full details page. |
| **Update** | Any report can be edited via the Edit button. The form is pre-filled with current values, and changes are saved back to the server. |
| **Delete** | Reports can be removed using the Delete button. A confirmation dialog appears before the item is permanently deleted. |

## Backend API

The Express server runs on port `4000` and exposes these endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/items` | Fetch all items |
| GET | `/api/items/:id` | Fetch a single item by ID |
| POST | `/api/items` | Create a new item |
| PUT | `/api/items/:id` | Update an existing item |
| DELETE | `/api/items/:id` | Delete an item |

Data is stored in `backend/data/items.json`. The file ships with 10 sample records.

## Item Fields

- **Item Name** — name of the lost or found item
- **Item Type** — Lost or Found
- **Category** — ID Card, Electronics, Books, Bag, Keys, Wallet, Other
- **Location** — where the item was lost or found
- **Date** — when the item was lost or found
- **Student Name** — person reporting the item
- **Contact Number** — phone number to reach the reporter
- **Description** — additional details
- **Status** — Open, Matched, or Returned

## Installation

```bash
npm install
```

## Running the Application

Start the backend and frontend in separate terminal windows:

**Backend:**
```bash
npm run server
```

**Frontend:**
```bash
npm run dev
```

The frontend runs on Vite's default port (usually `5173`) and proxies `/api` requests to the Express server on port `4000`. Open the URL shown in the terminal in your browser to use the app.
