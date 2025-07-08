import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import customersData from '../data/customers.json'

export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  address: {
    street: string
    city: string
    district: string
    postalCode: string
    country: string
  }
  dateOfBirth?: string
  gender?: 'male' | 'female' | 'other'
  isActive: boolean
  registrationDate: string
  lastLoginDate?: string
  orderHistory: string[]
  preferences: {
    newsletter: boolean
    smsNotifications: boolean
    emailNotifications: boolean
  }
}

interface GoogleUser {
  email: string
  name: string
  given_name: string
  family_name: string
  picture: string
  email_verified: boolean
}

interface UserStore {
  // Authentication state
  isAuthenticated: boolean
  currentUser: User | null
  
  // All users (for admin purposes)
  users: User[]
  
  // UI state
  showLoginModal: boolean
  showRegisterModal: boolean
  showAddressModal: boolean
  
  // Actions
  login: (email: string, password: string) => Promise<boolean>
  loginWithGoogle: (googleUser: GoogleUser) => Promise<boolean>
  register: (userData: Omit<User, 'id' | 'registrationDate' | 'isActive' | 'orderHistory'>) => Promise<boolean>
  registerWithGoogle: (googleUser: GoogleUser) => Promise<boolean>
  completeGoogleRegistration: (addressData: { street: string, apartmentNo: string, doorNo: string, city: string, district: string, postalCode: string }) => Promise<boolean>
  logout: () => void
  updateProfile: (userData: Partial<User>) => void
  
  // Modal actions
  setShowLoginModal: (show: boolean) => void
  setShowRegisterModal: (show: boolean) => void
  setShowAddressModal: (show: boolean) => void
  
  // Admin actions
  getAllUsers: () => User[]
  getUserById: (id: string) => User | undefined
  updateUser: (id: string, userData: Partial<User>) => void
  deleteUser: (id: string) => void
}

// Load customers from external JSON file
const initialCustomers: User[] = customersData as User[]

// Mock passwords (in real app, these would be hashed)
const mockPasswords: Record<string, string> = {
  'ahmet@email.com': '123456',
  'ayse@email.com': '123456',
  'test@email.com': '123456'
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      // Initial state
      isAuthenticated: false,
      currentUser: null,
      users: initialCustomers,
      showLoginModal: false,
      showRegisterModal: false,
      showAddressModal: false,
      
      // Authentication
      login: async (email: string, password: string) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Check credentials
        if (mockPasswords[email] === password) {
          const user = get().users.find(u => u.email === email)
          if (user) {
            set({
              isAuthenticated: true,
              currentUser: { ...user, lastLoginDate: new Date().toISOString().split('T')[0] },
              showLoginModal: false
            })
            
            // Update user's last login date
            get().updateUser(user.id, { lastLoginDate: new Date().toISOString().split('T')[0] })
            return true
          }
        }
        return false
      },
      
      loginWithGoogle: async (googleUser: GoogleUser) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Check if user exists
        const existingUser = get().users.find(u => u.email === googleUser.email)
        if (existingUser) {
          set({
            isAuthenticated: true,
            currentUser: { ...existingUser, lastLoginDate: new Date().toISOString().split('T')[0] },
            showLoginModal: false
          })
          
          // Update user's last login date
          get().updateUser(existingUser.id, { lastLoginDate: new Date().toISOString().split('T')[0] })
          return true
        }
        
        return false
      },

      register: async (userData) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        // Check if email already exists
        const existingUser = get().users.find(u => u.email === userData.email)
        if (existingUser) {
          return false
        }
        
        const newUser: User = {
          ...userData,
          gender: userData.gender || undefined,
          id: `user-${Date.now()}`,
          registrationDate: new Date().toISOString().split('T')[0],
          isActive: true,
          orderHistory: []
        }
        
        // Add to mock passwords
        mockPasswords[userData.email] = '123456' // Default password for demo
        
        set(state => ({
          users: [...state.users, newUser],
          isAuthenticated: true,
          currentUser: newUser,
          showRegisterModal: false
        }))
        
        return true
      },

      registerWithGoogle: async (googleUser: GoogleUser) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        // Check if email already exists
        const existingUser = get().users.find(u => u.email === googleUser.email)
        if (existingUser) {
          // If user exists, just log them in
          set({
            isAuthenticated: true,
            currentUser: { ...existingUser, lastLoginDate: new Date().toISOString().split('T')[0] },
            showRegisterModal: false
          })
          return true
        }
        
        // Create temporary user from Google data (will be completed after address entry)
        const tempUser: User = {
          id: `temp-${Date.now()}`,
          firstName: googleUser.given_name || googleUser.name.split(' ')[0] || '',
          lastName: googleUser.family_name || googleUser.name.split(' ').slice(1).join(' ') || '',
          email: googleUser.email,
          phone: '', // Will be filled later
          address: {
            street: '',
            city: '',
            district: '',
            postalCode: '',
            country: 'Türkiye'
          },
          dateOfBirth: '',
          gender: undefined,
          isActive: false, // Will be activated after address completion
          registrationDate: new Date().toISOString().split('T')[0],
          lastLoginDate: new Date().toISOString().split('T')[0],
          orderHistory: [],
          preferences: {
            newsletter: true,
            smsNotifications: true,
            emailNotifications: true
          }
        }
        
        set(state => ({
          users: [...state.users, tempUser],
          isAuthenticated: false, // Not fully authenticated until address is added
          currentUser: tempUser,
          showRegisterModal: false,
          showAddressModal: true // New modal for address entry
        }))
        
        return true
      },

      completeGoogleRegistration: async (addressData: { street: string, apartmentNo: string, doorNo: string, city: string, district: string, postalCode: string }) => {
        const currentUser = get().currentUser
        if (!currentUser || !currentUser.id.startsWith('temp-')) {
          return false
        }

        // Generate customer ID from street name + apartment + door number
        const streetName = addressData.street.replace(/[^a-zA-ZğüşıöçĞÜŞİÖÇ]/g, '').toUpperCase()
        const customerId = `${streetName}${addressData.apartmentNo}${addressData.doorNo}`

        const completedUser: User = {
          ...currentUser,
          id: customerId,
          address: {
            street: `${addressData.street} Apt: ${addressData.apartmentNo} Daire: ${addressData.doorNo}`,
            city: addressData.city,
            district: addressData.district,
            postalCode: addressData.postalCode,
            country: 'Türkiye'
          },
          isActive: true
        }

        set(state => ({
          users: state.users.map(u => u.id === currentUser.id ? completedUser : u),
          isAuthenticated: true,
          currentUser: completedUser,
          showAddressModal: false
        }))

        return true
      },
      
      logout: () => {
        set({
          isAuthenticated: false,
          currentUser: null
        })
      },
      
      updateProfile: (userData) => {
        const currentUser = get().currentUser
        if (currentUser) {
          const updatedUser = { ...currentUser, ...userData }
          set({
            currentUser: updatedUser,
            users: get().users.map(u => u.id === currentUser.id ? updatedUser : u)
          })
        }
      },
      
      // Modal actions
      setShowLoginModal: (show: boolean) => {
        set({ showLoginModal: show, showRegisterModal: false })
      },
      
      setShowRegisterModal: (show: boolean) => {
        set({ showRegisterModal: show, showLoginModal: false })
      },

      setShowAddressModal: (show: boolean) => {
        set({ showAddressModal: show })
      },
      
      // Admin actions
      getAllUsers: () => get().users,
      
      getUserById: (id: string) => get().users.find(u => u.id === id),
      
      updateUser: (id: string, userData: Partial<User>) => {
        set(state => ({
          users: state.users.map(u => u.id === id ? { ...u, ...userData } : u),
          currentUser: state.currentUser?.id === id ? { ...state.currentUser, ...userData } : state.currentUser
        }))
      },
      
      deleteUser: (id: string) => {
        set(state => ({
          users: state.users.filter(u => u.id !== id),
          currentUser: state.currentUser?.id === id ? null : state.currentUser,
          isAuthenticated: state.currentUser?.id === id ? false : state.isAuthenticated
        }))
      }
    }),
    {
      name: 'nazsu-user-storage',
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        currentUser: state.currentUser,
        users: state.users
      })
    }
  )
)
