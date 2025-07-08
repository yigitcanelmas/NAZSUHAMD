import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Components
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import AuthModals from './components/auth/AuthModals'
import AdminLayout from './components/admin/AdminLayout'

// Pages
import Home from './pages/Home'
import Products from './pages/Products'
import About from './pages/About'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import Account from './pages/Account'

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard'
import ProductManagement from './pages/admin/ProductManagement'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

function App() {
  useEffect(() => {
    // Initialize GSAP animations
    gsap.set("body", { opacity: 1 })
  }, [])

  return (
    <Router>
      <Routes>
        {/* Admin Routes */}
        <Route path="/nazsu-yonetim/*" element={
          <AdminLayout>
            <Routes>
              <Route path="/" element={<AdminDashboard />} />
              <Route path="/products" element={<ProductManagement />} />
            </Routes>
          </AdminLayout>
        } />
        
        {/* Public Routes */}
        <Route path="/*" element={
          <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/account" element={<Account />} />
              </Routes>
            </main>
            <Footer />
            <AuthModals />
          </div>
        } />
      </Routes>
    </Router>
  )
}

export default App
