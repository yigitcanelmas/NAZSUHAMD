HAU import { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ShoppingCart, 
  Menu, 
  X, 
  Droplets, 
  Phone, 
  MapPin, 
  Search, 
  Filter, 
  Bell, 
  User, 
  ChevronDown,
  Home,
  Package,
  Info,
  MessageCircle,
  Truck,
  Clock,
  Users,
  Shield
} from 'lucide-react'
import { useCartStore } from '../../store/cartStore'
import { useUserStore } from '../../store/userStore'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [notifications] = useState(3)
  
  const location = useLocation()
  const navigate = useNavigate()
  const { items } = useCartStore()
  
  const navRef = useRef<HTMLElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLDivElement>(null)
  const waterDropRef = useRef<HTMLDivElement>(null)
  const navItemsRef = useRef<HTMLDivElement>(null)

  const cartItemsCount = items.reduce((total, item) => total + item.quantity, 0)

  useEffect(() => {
    // GSAP Advanced Navbar Animations
    const tl = gsap.timeline()
    
    // Initial navbar entrance with elastic effect
    tl.fromTo(navRef.current, 
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "elastic.out(1, 0.5)" }
    )
    
    // Logo animation with morphing effect
    tl.fromTo(logoRef.current,
      { scale: 0, rotation: -180 },
      { scale: 1, rotation: 0, duration: 0.8, ease: "back.out(1.7)" },
      "-=0.5"
    )
    
    // Navigation items stagger animation
    tl.fromTo(navItemsRef.current?.children || [],
      { y: -30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" },
      "-=0.3"
    )

    // Floating water drop animation
    gsap.to(waterDropRef.current, {
      y: -10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut"
    })

    // Advanced scroll trigger for navbar transformation
    ScrollTrigger.create({
      trigger: "body",
      start: "top -50px",
      end: "bottom bottom",
      onUpdate: (self) => {
        const progress = self.progress
        setIsScrolled(self.direction === 1 && self.scroll() > 50)
        
        // Dynamic navbar height and blur effect
        gsap.to(navRef.current, {
          backdropFilter: `blur(${progress * 20}px)`,
          backgroundColor: `rgba(255, 255, 255, ${0.85 + progress * 0.15})`,
          duration: 0.3
        })
      }
    })

    // Magnetic effect for interactive elements
    const magneticElements = document.querySelectorAll('.magnetic')
    magneticElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        gsap.to(el, { scale: 1.1, duration: 0.3, ease: "power2.out" })
      })
      el.addEventListener('mouseleave', () => {
        gsap.to(el, { scale: 1, duration: 0.3, ease: "power2.out" })
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  // Search animation
  useEffect(() => {
    if (isSearchOpen) {
      gsap.fromTo(searchRef.current,
        { width: 0, opacity: 0 },
        { width: "300px", opacity: 1, duration: 0.5, ease: "power2.out" }
      )
    } else {
      gsap.to(searchRef.current,
        { width: 0, opacity: 0, duration: 0.3, ease: "power2.in" }
      )
    }
  }, [isSearchOpen])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`)
      setIsSearchOpen(false)
      setSearchQuery('')
    }
  }

  const navItems = [
    { name: 'Ana Sayfa', path: '/', icon: Home },
    { name: 'Ürünler', path: '/products', icon: Package },
    { name: 'Hakkımızda', path: '/about', icon: Info },
    { name: 'İletişim', path: '/contact', icon: MessageCircle },
  ]

  return (
    <>
        {/* Top notification bar */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-sm py-2 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
          <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
            <span className="font-medium flex items-center justify-center gap-2">
              <Truck className="h-4 w-4" />
              Ücretsiz Teslimat - 50₺ ve Üzeri Siparişlerde!
            </span>
            <span className="ml-4 opacity-75 flex items-center justify-center gap-1">
              <Clock className="h-3 w-3" />
              7/24 Müşteri Hizmetleri
            </span>
          </div>
        </motion.div>

      <motion.nav
        ref={navRef}
        className={`fixed top-8 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-xl shadow-2xl border border-blue-100/50'
            : 'bg-white/80 backdrop-blur-md'
        }`}
        style={{
          borderRadius: isScrolled ? '0px' : '20px',
          margin: isScrolled ? '0px' : '0 20px',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Enhanced Logo */}
            <Link to="/" className="flex items-center space-x-3 group magnetic">
              <div ref={logoRef} className="relative">
                <motion.div
                  ref={waterDropRef}
                  className="relative"
                  whileHover={{ 
                    rotate: [0, -10, 10, -10, 0],
                    scale: [1, 1.1, 1],
                    transition: { duration: 0.6 }
                  }}
                >
                  <Droplets className="h-10 w-10 text-blue-600 relative z-10" />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-30 blur-sm"
                    animate={{ 
                      scale: [1, 1.3, 1],
                      opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  />
                </motion.div>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-display font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-800 bg-clip-text text-transparent">
                  Nazsu
                </span>
                <span className="text-xs text-gray-500 font-medium tracking-wider">PREMIUM WATER</span>
              </div>
            </Link>

            {/* Enhanced Desktop Navigation */}
            <div ref={navItemsRef} className="hidden lg:flex items-center space-x-1">
              {navItems.map((item, index) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative px-6 py-3 text-sm font-semibold transition-all duration-300 rounded-full group magnetic ${
                    location.pathname === item.path
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50/50'
                  }`}
                >
                  <span className="flex items-center space-x-2">
                    <item.icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </span>
                  {location.pathname === item.path && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full opacity-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <motion.div
                    className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 group-hover:w-8 transition-all duration-300"
                  />
                </Link>
              ))}
            </div>

            {/* Enhanced Right side actions */}
            <div className="flex items-center space-x-2">
              {/* Advanced Search */}
              <div className="relative flex items-center">
                <motion.button
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="p-3 text-gray-700 hover:text-blue-600 transition-colors magnetic rounded-full hover:bg-blue-50"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Search className="h-5 w-5" />
                </motion.button>
                
                <motion.div
                  ref={searchRef}
                  className="absolute right-0 top-0 overflow-hidden"
                  style={{ width: 0 }}
                >
                  <form onSubmit={handleSearch} className="flex items-center bg-white rounded-full shadow-lg border border-blue-100">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Ürün ara..."
                      className="px-4 py-2 w-64 rounded-full focus:outline-none text-sm"
                    />
                    <button type="submit" className="p-2 text-blue-600 hover:text-blue-800">
                      <Search className="h-4 w-4" />
                    </button>
                  </form>
                </motion.div>
              </div>

              {/* Notifications */}
              <motion.button
                className="relative p-3 text-gray-700 hover:text-blue-600 transition-colors magnetic rounded-full hover:bg-blue-50"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Bell className="h-5 w-5" />
                {notifications > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold"
                  >
                    {notifications}
                  </motion.span>
                )}
              </motion.button>

              {/* Enhanced Cart */}
              <Link to="/cart" className="relative p-3 text-gray-700 hover:text-blue-600 transition-colors magnetic rounded-full hover:bg-blue-50">
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <ShoppingCart className="h-5 w-5" />
                  {cartItemsCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold"
                    >
                      {cartItemsCount}
                    </motion.span>
                  )}
                </motion.div>
              </Link>

              {/* User Menu */}
              <div className="relative">
                { !useUserStore(state => state.isAuthenticated) ? (
                  <motion.button
                    onClick={() => useUserStore.getState().setShowLoginModal(true)}
                    className="px-4 py-2 text-sm font-semibold text-gray-700 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Giriş Yap
                  </motion.button>
                ) : (
                  <>
                    <motion.button
                      onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                      className="flex items-center space-x-2 p-2 text-gray-700 hover:text-blue-600 transition-colors magnetic rounded-full hover:bg-blue-50"
                      whileHover={{ scale: 1.05 }}
                    >
                      <User className="h-5 w-5" />
                      <ChevronDown className={`h-4 w-4 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                    </motion.button>

                    <AnimatePresence>
                      {isUserMenuOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-blue-100 py-2"
                        >
                          <Link to="/account" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600" onClick={() => setIsUserMenuOpen(false)}>Hesabım</Link>
                          <Link to="/account" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600" onClick={() => setIsUserMenuOpen(false)}>Siparişlerim</Link>
                          <Link to="/account" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600" onClick={() => setIsUserMenuOpen(false)}>Favorilerim</Link>
                          <hr className="my-2 border-blue-100" />
                          <Link to="/nazsu-yonetim" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 flex items-center space-x-2">
                            <Shield className="h-4 w-4" />
                            <span>Admin Panel</span>
                          </Link>
                          <button 
                            onClick={() => {
                              useUserStore.getState().logout()
                              setIsUserMenuOpen(false)
                            }}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                          >
                            Çıkış Yap
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                )}
              </div>

              {/* Mobile menu button */}
              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-3 text-gray-700 hover:text-blue-600 transition-colors magnetic rounded-full hover:bg-blue-50"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </motion.div>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Enhanced Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-blue-100"
            >
              <div className="px-4 py-6 space-y-4">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.path}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center space-x-3 px-4 py-3 text-base font-medium rounded-xl transition-all ${
                        location.pathname === item.path
                          ? 'text-blue-600 bg-blue-50 border border-blue-200'
                          : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                      }`}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.name}</span>
                    </Link>
                  </motion.div>
                ))}
                
                <div className="pt-4 border-t border-blue-100 space-y-3">
                  <div className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-600">
                    <Phone className="h-4 w-4 text-blue-500" />
                    <span>0850 123 45 67</span>
                  </div>
                  <div className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4 text-blue-500" />
                    <span>İstanbul</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  )
}

export default Navbar
