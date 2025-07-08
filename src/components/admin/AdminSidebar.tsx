import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Droplets,
  Bell,
  FileText,
  TrendingUp
} from 'lucide-react'
import { useAdminStore } from '../../store/adminStore'

const AdminSidebar = () => {
  const location = useLocation()
  const { sidebarOpen, setSidebarOpen, logout, stats } = useAdminStore()

  const menuItems = [
    {
      name: 'Dashboard',
      path: '/nazsu-yonetim',
      icon: LayoutDashboard,
      badge: null
    },
    {
      name: 'Ürün Yönetimi',
      path: '/nazsu-yonetim/products',
      icon: Package,
      badge: stats.totalProducts
    },
    {
      name: 'Sipariş Yönetimi',
      path: '/nazsu-yonetim/orders',
      icon: ShoppingCart,
      badge: stats.pendingOrders
    },
    {
      name: 'Müşteri Yönetimi',
      path: '/nazsu-yonetim/customers',
      icon: Users,
      badge: stats.totalCustomers
    },
    {
      name: 'Analitik',
      path: '/nazsu-yonetim/analytics',
      icon: BarChart3,
      badge: null
    },
    {
      name: 'Raporlar',
      path: '/nazsu-yonetim/reports',
      icon: FileText,
      badge: null
    }
  ]

  const handleLogout = () => {
    logout()
  }

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={{
          width: sidebarOpen ? 256 : 64,
          x: 0
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed left-0 top-0 h-full bg-white shadow-xl z-50 border-r border-gray-200"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <AnimatePresence mode="wait">
                {sidebarOpen ? (
                  <motion.div
                    key="expanded"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center space-x-3"
                  >
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center">
                      <Droplets className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h1 className="text-lg font-bold text-gray-900">Nazsu</h1>
                      <p className="text-xs text-gray-500">Yönetim Paneli</p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="collapsed"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center mx-auto"
                  >
                    <Droplets className="h-6 w-6 text-white" />
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                {sidebarOpen ? (
                  <ChevronLeft className="h-4 w-4 text-gray-600" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-gray-600" />
                )}
              </motion.button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item, index) => {
              const isActive = location.pathname === item.path
              
              return (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={item.path}
                    className={`relative flex items-center space-x-3 px-3 py-3 rounded-xl transition-all duration-200 group ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
                    }`}
                  >
                    <div className={`relative ${!sidebarOpen && 'mx-auto'}`}>
                      <item.icon className="h-5 w-5" />
                      {item.badge !== null && item.badge > 0 && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium"
                        >
                          {item.badge > 99 ? '99+' : item.badge}
                        </motion.span>
                      )}
                    </div>

                    <AnimatePresence>
                      {sidebarOpen && (
                        <motion.div
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: 'auto' }}
                          exit={{ opacity: 0, width: 0 }}
                          transition={{ duration: 0.2 }}
                          className="flex items-center justify-between flex-1 overflow-hidden"
                        >
                          <span className="font-medium whitespace-nowrap">
                            {item.name}
                          </span>
                          {item.badge !== null && item.badge > 0 && (
                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                              isActive 
                                ? 'bg-white/20 text-white' 
                                : 'bg-blue-100 text-blue-600'
                            }`}>
                              {item.badge}
                            </span>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl"
                        style={{ zIndex: -1 }}
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </Link>
                </motion.div>
              )
            })}
          </nav>

          {/* Quick Stats */}
          <AnimatePresence>
            {sidebarOpen && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="p-4 border-t border-gray-200"
              >
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 space-y-3">
                  <h3 className="text-sm font-semibold text-gray-900 flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-blue-600" />
                    <span>Hızlı Özet</span>
                  </h3>
                  
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Bugünkü Siparişler</span>
                      <span className="font-semibold text-blue-600">{stats.todayOrders}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Bekleyen</span>
                      <span className="font-semibold text-orange-600">{stats.pendingOrders}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Aylık Gelir</span>
                      <span className="font-semibold text-green-600">₺{stats.monthlyRevenue.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <motion.button
              onClick={handleLogout}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full flex items-center space-x-3 px-3 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 ${
                !sidebarOpen && 'justify-center'
              }`}
            >
              <LogOut className="h-5 w-5" />
              <AnimatePresence>
                {sidebarOpen && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2 }}
                    className="font-medium whitespace-nowrap"
                  >
                    Çıkış Yap
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </>
  )
}

export default AdminSidebar
