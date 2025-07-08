import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { apiService } from '../services/api'

export interface Product {
  id: string
  name: string
  price: number
  image: string
  description: string
  category: string
  stock: number
  size: string
  isActive: boolean
  createdAt: string
}

export interface Order {
  id: string
  customerId: string
  customerName: string
  customerPhone: string
  customerAddress: string
  items: Array<{
    productId: string
    productName: string
    quantity: number
    price: number
  }>
  totalAmount: number
  status: 'pending' | 'confirmed' | 'preparing' | 'shipped' | 'delivered' | 'cancelled'
  orderDate: string
  deliveryDate?: string
}

export interface Customer {
  id: string
  name: string
  phone: string
  email: string
  address: string
  totalOrders: number
  totalSpent: number
  lastOrderDate: string
  isActive: boolean
  registrationDate: string
}

export interface AdminStats {
  totalOrders: number
  totalCustomers: number
  totalProducts: number
  totalRevenue: number
  todayOrders: number
  pendingOrders: number
  monthlyRevenue: number
  topSellingProduct: string
}

interface AdminStore {
  // Authentication
  isAuthenticated: boolean
  adminUser: { name: string; email: string } | null
  
  // Data
  products: Product[]
  orders: Order[]
  customers: Customer[]
  stats: AdminStats
  
  // UI State
  sidebarOpen: boolean
  currentPage: string
  
  // Actions
  login: (email: string, password: string) => boolean
  logout: () => void
  setSidebarOpen: (open: boolean) => void
  setCurrentPage: (page: string) => void
  
  // Product Actions
  addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => void
  updateProduct: (id: string, product: Partial<Product>) => void
  deleteProduct: (id: string) => void
  
  // Order Actions
  updateOrderStatus: (id: string, status: Order['status']) => void
  
  // Customer Actions
  addCustomer: (customer: Omit<Customer, 'id' | 'registrationDate'>) => void
  updateCustomer: (id: string, customer: Partial<Customer>) => void
  
  // Analytics
  calculateStats: () => void
  loadCustomersFromDB: () => Promise<void>
  loadOrdersFromDB: () => Promise<void>
}

// Mock data for demonstration
const mockProducts: Product[] = [
  {
    id: '1',
    name: '19L Damacana Su',
    price: 25,
    image: '/api/placeholder/300/300',
    description: 'Standart boyut damacana su',
    category: 'Damacana',
    stock: 150,
    size: '19L',
    isActive: true,
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    name: '12L Damacana Su',
    price: 18,
    image: '/api/placeholder/300/300',
    description: 'Orta boyut damacana su',
    category: 'Damacana',
    stock: 200,
    size: '12L',
    isActive: true,
    createdAt: '2024-01-15'
  },
  {
    id: '3',
    name: '5L Damacana Su',
    price: 12,
    image: '/api/placeholder/300/300',
    description: 'Küçük boyut damacana su',
    category: 'Damacana',
    stock: 100,
    size: '5L',
    isActive: true,
    createdAt: '2024-01-15'
  }
]

const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    customerId: 'CUST-001',
    customerName: 'Ayşe Yılmaz',
    customerPhone: '0532 123 45 67',
    customerAddress: 'Kadıköy, İstanbul',
    items: [
      { productId: '1', productName: '19L Damacana Su', quantity: 2, price: 25 }
    ],
    totalAmount: 50,
    status: 'pending',
    orderDate: '2024-01-20',
  },
  {
    id: 'ORD-002',
    customerId: 'CUST-002',
    customerName: 'Mehmet Kaya',
    customerPhone: '0533 987 65 43',
    customerAddress: 'Beşiktaş, İstanbul',
    items: [
      { productId: '1', productName: '19L Damacana Su', quantity: 5, price: 25 },
      { productId: '2', productName: '12L Damacana Su', quantity: 2, price: 18 }
    ],
    totalAmount: 161,
    status: 'confirmed',
    orderDate: '2024-01-19',
  }
]

const mockCustomers: Customer[] = [
  {
    id: 'CUST-001',
    name: 'Ayşe Yılmaz',
    phone: '0532 123 45 67',
    email: 'ayse@email.com',
    address: 'Kadıköy, İstanbul',
    totalOrders: 15,
    totalSpent: 750,
    lastOrderDate: '2024-01-20',
    isActive: true,
    registrationDate: '2023-06-15'
  },
  {
    id: 'CUST-002',
    name: 'Mehmet Kaya',
    phone: '0533 987 65 43',
    email: 'mehmet@email.com',
    address: 'Beşiktaş, İstanbul',
    totalOrders: 25,
    totalSpent: 1250,
    lastOrderDate: '2024-01-19',
    isActive: true,
    registrationDate: '2023-03-10'
  }
]

export const useAdminStore = create<AdminStore>()(
  persist(
    (set, get) => ({
      // Initial state
      isAuthenticated: false,
      adminUser: null,
      products: mockProducts,
      orders: mockOrders,
      customers: mockCustomers,
      stats: {
        totalOrders: 0,
        totalCustomers: 0,
        totalProducts: 0,
        totalRevenue: 0,
        todayOrders: 0,
        pendingOrders: 0,
        monthlyRevenue: 0,
        topSellingProduct: ''
      },
      sidebarOpen: true,
      currentPage: 'dashboard',
      
      // Authentication
      login: (email: string, password: string) => {
        // Simple mock authentication
        if (email === 'admin@nazsu.com' && password === 'admin123') {
          set({
            isAuthenticated: true,
            adminUser: { name: 'Admin', email: 'admin@nazsu.com' }
          })
          return true
        }
        return false
      },
      
      logout: () => {
        set({
          isAuthenticated: false,
          adminUser: null
        })
      },
      
      setSidebarOpen: (open: boolean) => {
        set({ sidebarOpen: open })
      },
      
      setCurrentPage: (page: string) => {
        set({ currentPage: page })
      },
      
      // Product Actions
      addProduct: (product) => {
        const newProduct: Product = {
          ...product,
          id: `PROD-${Date.now()}`,
          createdAt: new Date().toISOString().split('T')[0]
        }
        set(state => ({
          products: [...state.products, newProduct]
        }))
        get().calculateStats()
      },
      
      updateProduct: (id: string, updates: Partial<Product>) => {
        set(state => ({
          products: state.products.map(product =>
            product.id === id ? { ...product, ...updates } : product
          )
        }))
      },
      
      deleteProduct: (id: string) => {
        set(state => ({
          products: state.products.filter(product => product.id !== id)
        }))
        get().calculateStats()
      },
      
      // Order Actions
      updateOrderStatus: (id: string, status: Order['status']) => {
        set(state => ({
          orders: state.orders.map(order =>
            order.id === id ? { ...order, status } : order
          )
        }))
        get().calculateStats()
      },
      
      // Customer Actions
      addCustomer: (customer) => {
        const newCustomer: Customer = {
          ...customer,
          id: `CUST-${Date.now()}`,
          registrationDate: new Date().toISOString().split('T')[0]
        }
        set(state => ({
          customers: [...state.customers, newCustomer]
        }))
        get().calculateStats()
      },
      
      updateCustomer: (id: string, updates: Partial<Customer>) => {
        set(state => ({
          customers: state.customers.map(customer =>
            customer.id === id ? { ...customer, ...updates } : customer
          )
        }))
      },
      
      // Load data from MongoDB
      loadCustomersFromDB: async () => {
        try {
          const response = await apiService.getCustomers() as any
          if (response?.success) {
            // Convert MongoDB customers to admin store format
            const customers: Customer[] = response.customers.map((customer: any) => ({
              id: customer.customerId,
              name: customer.name,
              phone: customer.phone,
              email: customer.email,
              address: customer.addresses[0]?.city || 'Belirtilmemiş',
              totalOrders: customer.orderCount || 0,
              totalSpent: customer.totalSpent || 0,
              lastOrderDate: customer.lastLoginDate || customer.createdAt,
              isActive: (customer.orderCount || 0) > 0,
              registrationDate: customer.createdAt
            }))
            set({ customers })
          }
        } catch (error) {
          console.error('Error loading customers from DB:', error)
        }
      },

      loadOrdersFromDB: async () => {
        try {
          const response = await apiService.getOrders() as any
          if (response?.success) {
            // Convert MongoDB orders to admin store format
            const orders: Order[] = response.orders.map((order: any) => ({
              id: order.orderId,
              customerId: order.customerId,
              customerName: order.customerName,
              customerPhone: order.customerPhone,
              customerAddress: order.shippingAddress,
              items: order.items,
              totalAmount: order.total,
              status: order.status,
              orderDate: order.orderDate,
              deliveryDate: order.deliveryDate
            }))
            set({ orders })
          }
        } catch (error) {
          console.error('Error loading orders from DB:', error)
        }
      },

      // Analytics
      calculateStats: () => {
        const { orders, customers, products } = get()
        const today = new Date().toISOString().split('T')[0]
        
        const stats: AdminStats = {
          totalOrders: orders.length,
          totalCustomers: customers.length,
          totalProducts: products.length,
          totalRevenue: orders.reduce((sum, order) => sum + order.totalAmount, 0),
          todayOrders: orders.filter(order => order.orderDate === today).length,
          pendingOrders: orders.filter(order => order.status === 'pending').length,
          monthlyRevenue: orders
            .filter(order => order.orderDate.startsWith('2024-01'))
            .reduce((sum, order) => sum + order.totalAmount, 0),
          topSellingProduct: products.length > 0 ? products[0].name : ''
        }
        
        set({ stats })
      }
    }),
    {
      name: 'nazsu-admin-storage',
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        adminUser: state.adminUser,
        products: state.products,
        orders: state.orders,
        customers: state.customers
      })
    }
  )
)

// Initialize stats on store creation
useAdminStore.getState().calculateStats()
