import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Bell,
  Search,
  User,
  Settings,
  ChevronDown,
  Menu,
  Sun,
  Moon,
  Globe,
  HelpCircle,
  LogOut
} from 'lucide-react'
import { useAdminStore } from '../../store/adminStore'

const AdminHeader = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [showNotifications, setShowNotifications] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  
  const { adminUser, sidebarOpen, setSidebarOpen, logout, stats } = useAdminStore()

  const notifications = [
    {
      id: 1,
      title: 'Yeni Sipariş',
      message: 'Ayşe Yılmaz yeni bir sipariş verdi',
      time: '2 dakika önce',
      type: 'order',
      unread: true
    },
    {
      id: 2,
      title: 'Stok Uyarısı',
      message: '19L Damacana stoğu azalıyor',
      time: '15 dakika önce',
      type: 'warning',
      unread: true
    },
    {
      id: 3,
      title: 'Ödeme Alındı',
      message: 'Mehmet Kaya ödemesi onaylandı',
      time: '1 saat önce',
      type: 'payment',
      unread: false
    }
  ]

  const unreadCount = notifications.filter(n => n.unread).length

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement search functionality
    console.log('Searching for:', searchQuery)
  }

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <Menu className="h-5 w-5 text-gray-600" />
          </motion.button>

          {/* Page Title */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-sm text-gray-500">Nazsu Yönetim Paneli</p>
          </div>
        </div>

        {/* Center Section - Search */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <form onSubmit={handleSearch} className="w-full relative">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Sipariş, müşteri veya ürün ara..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </form>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Quick Stats */}
          <div className="hidden lg:flex items-center space-x-6 text-sm">
            <div className="text-center">
              <div className="text-lg font-bold text-blue-600">{stats.todayOrders}</div>
              <div className="text-gray-500">Bugün</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-orange-600">{stats.pendingOrders}</div>
              <div className="text-gray-500">Bekleyen</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-green-600">₺{stats.monthlyRevenue.toLocaleString()}</div>
              <div className="text-gray-500">Bu Ay</div>
            </div>
          </div>

          {/* Theme Toggle */}
          <motion.button
            onClick={() => setDarkMode(!darkMode)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            {darkMode ? (
              <Sun className="h-5 w-5 text-gray-600" />
            ) : (
              <Moon className="h-5 w-5 text-gray-600" />
            )}
          </motion.button>

          {/* Notifications */}
          <div className="relative">
            <motion.button
              onClick={() => setShowNotifications(!showNotifications)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <Bell className="h-5 w-5 text-gray-600" />
              {unreadCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium"
                >
                  {unreadCount}
                </motion.span>
              )}
            </motion.button>

            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50"
                >
                  <div className="px-4 py-3 border-b border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900">Bildirimler</h3>
                    <p className="text-sm text-gray-500">{unreadCount} okunmamış bildirim</p>
                  </div>
                  
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                      <motion.div
                        key={notification.id}
                        whileHover={{ backgroundColor: '#f9fafb' }}
                        className={`px-4 py-3 border-b border-gray-50 cursor-pointer ${
                          notification.unread ? 'bg-blue-50/50' : ''
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`w-2 h-2 rounded-full mt-2 ${
                            notification.type === 'order' ? 'bg-blue-500' :
                            notification.type === 'warning' ? 'bg-orange-500' :
                            'bg-green-500'
                          }`} />
                          <div className="flex-1">
                            <h4 className="text-sm font-medium text-gray-900">
                              {notification.title}
                            </h4>
                            <p className="text-sm text-gray-600 mt-1">
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                              {notification.time}
                            </p>
                          </div>
                          {notification.unread && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full" />
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="px-4 py-3 border-t border-gray-100">
                    <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                      Tümünü gör
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* User Menu */}
          <div className="relative">
            <motion.button
              onClick={() => setShowUserMenu(!showUserMenu)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
              <div className="hidden md:block text-left">
                <div className="text-sm font-medium text-gray-900">
                  {adminUser?.name || 'Admin'}
                </div>
                <div className="text-xs text-gray-500">
                  {adminUser?.email || 'admin@nazsu.com'}
                </div>
              </div>
              <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${
                showUserMenu ? 'rotate-180' : ''
              }`} />
            </motion.button>

            <AnimatePresence>
              {showUserMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50"
                >
                  <div className="px-4 py-3 border-b border-gray-100">
                    <div className="text-sm font-medium text-gray-900">
                      {adminUser?.name || 'Admin'}
                    </div>
                    <div className="text-xs text-gray-500">
                      {adminUser?.email || 'admin@nazsu.com'}
                    </div>
                  </div>
                  
                  <div className="py-2">
                    <motion.button
                      whileHover={{ backgroundColor: '#f9fafb' }}
                      className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:text-gray-900"
                    >
                      <User className="h-4 w-4" />
                      <span>Profil</span>
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ backgroundColor: '#f9fafb' }}
                      className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:text-gray-900"
                    >
                      <Settings className="h-4 w-4" />
                      <span>Ayarlar</span>
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ backgroundColor: '#f9fafb' }}
                      className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:text-gray-900"
                    >
                      <HelpCircle className="h-4 w-4" />
                      <span>Yardım</span>
                    </motion.button>
                  </div>
                  
                  <div className="border-t border-gray-100 py-2">
                    <motion.button
                      onClick={logout}
                      whileHover={{ backgroundColor: '#fef2f2' }}
                      className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-red-600 hover:text-red-700"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Çıkış Yap</span>
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="md:hidden mt-4">
        <form onSubmit={handleSearch} className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Ara..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </form>
      </div>
    </header>
  )
}

export default AdminHeader
