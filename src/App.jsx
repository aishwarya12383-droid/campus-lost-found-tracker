import { useState } from 'react'
import { ToastProvider } from './Toast'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import AllItems from './pages/AllItems'
import AddItem from './pages/AddItem'
import ItemDetails from './pages/ItemDetails'
import About from './pages/About'

function App() {
  // Simple state-based routing: "dashboard", "items", "add", "about",
  // "edit:<id>", "view:<id>"
  const [route, setRoute] = useState('dashboard')
  const [itemsRefreshKey, setItemsRefreshKey] = useState(0)

  const navigate = (target) => {
    setRoute(target)
    if (target === 'items') {
      setItemsRefreshKey((k) => k + 1)
    }
    window.scrollTo(0, 0)
  }

  const handleSelectItem = (item) => {
    navigate('view:' + item.id)
  }

  let page
  if (route === 'dashboard') {
    page = <Dashboard onNavigate={navigate} onSelectItem={handleSelectItem} />
  } else if (route === 'items') {
    page = <AllItems onNavigate={navigate} onSelectItem={handleSelectItem} refreshKey={itemsRefreshKey} />
  } else if (route === 'add') {
    page = <AddItem editId={null} onNavigate={navigate} />
  } else if (route === 'about') {
    page = <About />
  } else if (route.startsWith('edit:')) {
    const id = route.split(':')[1]
    page = <AddItem editId={id} onNavigate={navigate} />
  } else if (route.startsWith('view:')) {
    const id = route.split(':')[1]
    page = <ItemDetails itemId={id} onNavigate={navigate} />
  } else {
    page = <Dashboard onNavigate={navigate} onSelectItem={handleSelectItem} />
  }

  const sidebarKey = route.startsWith('edit:') ? 'items' : route.startsWith('view:') ? 'items' : route

  return (
    <ToastProvider>
      <div className="app-layout">
        <Sidebar current={sidebarKey} onNavigate={navigate} />
        <main className="main-content">
          {page}
        </main>
      </div>
    </ToastProvider>
  )
}

export default App
