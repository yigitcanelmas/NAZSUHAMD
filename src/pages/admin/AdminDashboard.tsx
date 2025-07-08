import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import {
  ShoppingCart,
  Users,
  Package,
  TrendingUp,
  Clock,
  AlertCircle,
  CheckCircle,
  DollarSign,
  Calendar,
  Eye,
  Edit,
  Trash2,
  Plus
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAdminStore } from '../../store/adminStore'
import StatCard from '../../components/admin/StatCard'

const AdminDashboard = () => {
  const { stats, orders, customers, products, calculateStats, loadCustomersFromDB, loadOrdersFromDB } = useAdminStore()
  const chartRef = useRef<HTMLDivElement>(null)
  const recentOrdersRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const loadData = async () => {
      // Load data from MongoDB
      await loadCustomersFromDB()
      await loadOrdersFromDB()
      calculateStats()
    }
    
    loadData()
    
    // GSAP animations for dashboard elements
    const tl = gsap.timeline()
    
    // Animate chart area
    if (chartRef.current) {
      tl.fromTo(chartRef.current,
        { opacity: 0, scale: 0.9, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "back.out(1.7)" }
      )
    }
    
    // Animate recent orders
    if (recentOrdersRef.current) {
      const orderItems = recentOrdersRef.current.querySelectorAll('.order-item')
      tl.fromTo(orderItems,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" },
        "-=0.4"
      )
    }
  }, [])

  const recentOrders = orders.slice(0, 5)
  const recentCustomers = customers.slice(0, 5)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'confirmed': return 'bg-blue-100 text-blue-800'
      case 'preparing': return 'bg-orange-100 text-orange-800'
      case 'shipped': return 'bg-purple-100 text-purple-800'
      case 'delivered': return 'bg-green-100 text-green-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Bekliyor'
      case 'confirmed': return 'Onaylandı'
      case 'preparing': return 'Hazırlanıyor'
      case 'shipped': return 'Kargoda'
      case 'delivered': return 'Teslim Edildi'
      case 'cancelled': return 'İptal Edildi'
      default: return status
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Nazsu yönetim paneline hoş geldiniz</p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <Link to="/nazsu-yonetim/orders">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Yeni Sipariş</span>
            </motion.button>
          </Link>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Toplam Sipariş"
          value={stats.totalOrders}
          change={{ value: 12, type: 'increase' }}
          icon={ShoppingCart}
          color="blue"
        />
        <StatCard
          title="Toplam Müşteri"
          value={stats.totalCustomers}
          change={{ value: 8, type: 'increase' }}
          icon={Users}
          color="green"
        />
        <StatCard
          title="Toplam Ürün"
          value={stats.totalProducts}
          icon={Package}
          color="purple"
        />
        <StatCard
          title="Aylık Gelir"
          value={`₺${stats.monthlyRevenue.toLocaleString()}`}
          change={{ value: 15, type: 'increase' }}
          icon={DollarSign}
          color="orange"
        />
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2">Bugünkü Siparişler</h3>
              <p className="text-3xl font-bold">{stats.todayOrders}</p>
              <p className="text-blue-100 text-sm mt-1">Aktif siparişler</p>
            </div>
            <Clock className="h-12 w-12 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2">Bekleyen Siparişler</h3>
              <p className="text-3xl font-bold">{stats.pendingOrders}</p>
              <p className="text-orange-100 text-sm mt-1">İşlem bekliyor</p>
            </div>
            <AlertCircle className="h-12 w-12 text-orange-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2">Toplam Gelir</h3>
              <p className="text-3xl font-bold">₺{stats.totalRevenue.toLocaleString()}</p>
              <p className="text-green-100 text-sm mt-1">Tüm zamanlar</p>
            </div>
            <TrendingUp className="h-12 w-12 text-green-200" />
          </div>
        </div>
      </motion.div>

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <motion.div
          ref={chartRef}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-6 shadow-lg"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Satış Grafiği</h3>
            <select className="text-sm border border-gray-300 rounded-lg px-3 py-1">
              <option>Son 7 gün</option>
              <option>Son 30 gün</option>
              <option>Son 3 ay</option>
            </select>
          </div>
          
          {/* Mock Chart */}
          <div className="h-64 bg-gradient-to-t from-blue-50 to-transparent rounded-lg flex items-end justify-center space-x-2 p-4">
            {[40, 65, 45, 80, 55, 70, 85].map((height, index) => (
              <motion.div
                key={index}
                initial={{ height: 0 }}
                animate={{ height: `${height}%` }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                className="bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg flex-1 max-w-8"
              />
            ))}
          </div>
          
          <div className="flex justify-between text-sm text-gray-500 mt-4">
            <span>Pzt</span>
            <span>Sal</span>
            <span>Çar</span>
            <span>Per</span>
            <span>Cum</span>
            <span>Cmt</span>
            <span>Paz</span>
          </div>
        </motion.div>

        {/* Recent Orders */}
        <motion.div
          ref={recentOrdersRef}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl p-6 shadow-lg"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Son Siparişler</h3>
            <Link to="/nazsu-yonetim/orders" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              Tümünü Gör
            </Link>
          </div>
          
          <div className="space-y-4">
            {recentOrders.map((order, index) => (
              <motion.div
                key={order.id}
                className="order-item flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <ShoppingCart className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{order.customerName}</p>
                    <p className="text-sm text-gray-500">#{order.id}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="font-semibold text-gray-900">₺{order.totalAmount}</p>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {getStatusText(order.status)}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent Customers and Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Customers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl p-6 shadow-lg"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Son Müşteriler</h3>
            <Link to="/nazsu-yonetim/customers" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              Tümünü Gör
            </Link>
          </div>
          
          <div className="space-y-4">
            {recentCustomers.map((customer) => (
              <motion.div
                key={customer.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Users className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{customer.name}</p>
                    <p className="text-sm text-gray-500">{customer.phone}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{customer.totalOrders} sipariş</p>
                  <p className="text-sm text-gray-500">₺{customer.totalSpent.toLocaleString()}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Top Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-2xl p-6 shadow-lg"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Popüler Ürünler</h3>
            <Link to="/nazsu-yonetim/products" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              Tümünü Gör
            </Link>
          </div>
          
          <div className="space-y-4">
            {products.slice(0, 5).map((product) => (
              <motion.div
                key={product.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <Package className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-500">Stok: {product.stock}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="font-semibold text-gray-900">₺{product.price}</p>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    product.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {product.isActive ? 'Aktif' : 'Pasif'}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default AdminDashboard
