import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Settings,
  Package,
  Heart,
  CreditCard,
  Bell,
  Shield,
  LogOut,
  Edit3,
  Save,
  X
} from 'lucide-react'
import { useUserStore } from '../store/userStore'

const Account = () => {
  const { currentUser, isAuthenticated, logout, updateProfile } = useUserStore()
  const [activeTab, setActiveTab] = useState('profile')
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState(currentUser || {})

  if (!isAuthenticated || !currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Giriş Yapmanız Gerekiyor</h2>
          <p className="text-gray-600">Hesap sayfasına erişmek için lütfen giriş yapın.</p>
        </div>
      </div>
    )
  }

  const handleSave = () => {
    updateProfile(editData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditData(currentUser)
    setIsEditing(false)
  }

  const tabs = [
    { id: 'profile', label: 'Profil Bilgileri', icon: User },
    { id: 'orders', label: 'Siparişlerim', icon: Package },
    { id: 'favorites', label: 'Favorilerim', icon: Heart },
    { id: 'addresses', label: 'Adreslerim', icon: MapPin },
    { id: 'payments', label: 'Ödeme Yöntemleri', icon: CreditCard },
    { id: 'notifications', label: 'Bildirimler', icon: Bell },
    { id: 'security', label: 'Güvenlik', icon: Shield }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {currentUser.firstName} {currentUser.lastName}
                </h1>
                <p className="text-gray-600">{currentUser.email}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-sm text-gray-500">Müşteri ID:</span>
                  <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                    {currentUser.id}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={logout}
              className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
            >
              <LogOut className="h-4 w-4" />
              <span>Çıkış Yap</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-colors duration-200 ${
                        activeTab === tab.id
                          ? 'bg-blue-50 text-blue-600 border border-blue-200'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  )
                })}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-sm p-6">
              {activeTab === 'profile' && (
                <ProfileTab
                  currentUser={currentUser}
                  isEditing={isEditing}
                  editData={editData}
                  setEditData={setEditData}
                  setIsEditing={setIsEditing}
                  handleSave={handleSave}
                  handleCancel={handleCancel}
                />
              )}
              {activeTab === 'orders' && <OrdersTab />}
              {activeTab === 'favorites' && <FavoritesTab />}
              {activeTab === 'addresses' && <AddressesTab currentUser={currentUser} />}
              {activeTab === 'payments' && <PaymentsTab />}
              {activeTab === 'notifications' && <NotificationsTab currentUser={currentUser} />}
              {activeTab === 'security' && <SecurityTab />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Profile Tab Component
const ProfileTab = ({ currentUser, isEditing, editData, setEditData, setIsEditing, handleSave, handleCancel }: any) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Profil Bilgileri</h2>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <Edit3 className="h-4 w-4" />
            <span>Düzenle</span>
          </button>
        ) : (
          <div className="flex space-x-2">
            <button
              onClick={handleSave}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
            >
              <Save className="h-4 w-4" />
              <span>Kaydet</span>
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
            >
              <X className="h-4 w-4" />
              <span>İptal</span>
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Ad</label>
          {isEditing ? (
            <input
              type="text"
              value={editData.firstName || ''}
              onChange={(e) => setEditData({ ...editData, firstName: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          ) : (
            <p className="px-4 py-3 bg-gray-50 rounded-xl">{currentUser.firstName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Soyad</label>
          {isEditing ? (
            <input
              type="text"
              value={editData.lastName || ''}
              onChange={(e) => setEditData({ ...editData, lastName: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          ) : (
            <p className="px-4 py-3 bg-gray-50 rounded-xl">{currentUser.lastName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <p className="px-4 py-3 bg-gray-50 rounded-xl text-gray-500">{currentUser.email} (Değiştirilemez)</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Telefon</label>
          {isEditing ? (
            <input
              type="tel"
              value={editData.phone || ''}
              onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          ) : (
            <p className="px-4 py-3 bg-gray-50 rounded-xl">{currentUser.phone}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Doğum Tarihi</label>
          {isEditing ? (
            <input
              type="date"
              value={editData.dateOfBirth || ''}
              onChange={(e) => setEditData({ ...editData, dateOfBirth: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          ) : (
            <p className="px-4 py-3 bg-gray-50 rounded-xl">{currentUser.dateOfBirth || 'Belirtilmemiş'}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Cinsiyet</label>
          {isEditing ? (
            <select
              value={editData.gender || ''}
              onChange={(e) => setEditData({ ...editData, gender: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Seçiniz</option>
              <option value="male">Erkek</option>
              <option value="female">Kadın</option>
              <option value="other">Diğer</option>
            </select>
          ) : (
            <p className="px-4 py-3 bg-gray-50 rounded-xl">
              {currentUser.gender === 'male' ? 'Erkek' : 
               currentUser.gender === 'female' ? 'Kadın' : 
               currentUser.gender === 'other' ? 'Diğer' : 'Belirtilmemiş'}
            </p>
          )}
        </div>
      </div>

      <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-xl">
        <h3 className="font-semibold text-blue-900 mb-2">Hesap Bilgileri</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-blue-700">Kayıt Tarihi:</span>
            <span className="ml-2 text-blue-900">{currentUser.registrationDate}</span>
          </div>
          <div>
            <span className="text-blue-700">Son Giriş:</span>
            <span className="ml-2 text-blue-900">{currentUser.lastLoginDate || 'Bilinmiyor'}</span>
          </div>
          <div>
            <span className="text-blue-700">Hesap Durumu:</span>
            <span className="ml-2 text-blue-900">{currentUser.isActive ? 'Aktif' : 'Pasif'}</span>
          </div>
          <div>
            <span className="text-blue-700">Toplam Sipariş:</span>
            <span className="ml-2 text-blue-900">{currentUser.orderHistory?.length || 0}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// Orders Tab Component
const OrdersTab = () => {
  const orders = [
    {
      id: 'ORD-001',
      date: '2024-01-15',
      status: 'Teslim Edildi',
      total: '₺45.00',
      items: ['19L Damacana Su x2', 'Su Pompası x1']
    },
    {
      id: 'ORD-002',
      date: '2024-01-10',
      status: 'Kargoda',
      total: '₺30.00',
      items: ['19L Damacana Su x1', 'Su Bardağı Seti x1']
    }
  ]

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-6">Siparişlerim</h2>
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="border border-gray-200 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-gray-900">Sipariş #{order.id}</h3>
                <p className="text-sm text-gray-600">{order.date}</p>
              </div>
              <div className="text-right">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  order.status === 'Teslim Edildi' ? 'bg-green-100 text-green-800' :
                  order.status === 'Kargoda' ? 'bg-blue-100 text-blue-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {order.status}
                </span>
                <p className="text-lg font-bold text-gray-900 mt-1">{order.total}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">Ürünler:</p>
              <ul className="text-sm text-gray-800">
                {order.items.map((item, index) => (
                  <li key={index}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Favorites Tab Component
const FavoritesTab = () => {
  const favorites = [
    { id: 1, name: '19L Damacana Su', price: '₺15.00', image: '/api/placeholder/100/100' },
    { id: 2, name: 'Su Pompası', price: '₺25.00', image: '/api/placeholder/100/100' }
  ]

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-6">Favorilerim</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map((item) => (
          <div key={item.id} className="border border-gray-200 rounded-xl p-4">
            <div className="w-full h-32 bg-gray-100 rounded-lg mb-4"></div>
            <h3 className="font-semibold text-gray-900">{item.name}</h3>
            <p className="text-blue-600 font-bold">{item.price}</p>
            <button className="w-full mt-3 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
              Sepete Ekle
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

// Addresses Tab Component
const AddressesTab = ({ currentUser }: any) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Adreslerim</h2>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
          Yeni Adres Ekle
        </button>
      </div>
      
      <div className="border border-gray-200 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">Ana Adres</h3>
          <span className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded-full">Varsayılan</span>
        </div>
        <div className="text-gray-600">
          <p>{currentUser.address.street}</p>
          <p>{currentUser.address.district}, {currentUser.address.city}</p>
          <p>{currentUser.address.postalCode}, {currentUser.address.country}</p>
        </div>
        <div className="flex space-x-2 mt-4">
          <button className="px-3 py-1 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-200">
            Düzenle
          </button>
          <button className="px-3 py-1 text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition-colors duration-200">
            Sil
          </button>
        </div>
      </div>
    </div>
  )
}

// Payments Tab Component
const PaymentsTab = () => {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Ödeme Yöntemleri</h2>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
          Kart Ekle
        </button>
      </div>
      
      <div className="text-center py-12">
        <CreditCard className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Henüz kayıtlı kart yok</h3>
        <p className="text-gray-600 mb-4">Hızlı ödeme için kredi kartınızı ekleyebilirsiniz.</p>
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
          İlk Kartınızı Ekleyin
        </button>
      </div>
    </div>
  )
}

// Notifications Tab Component
const NotificationsTab = ({ currentUser }: any) => {
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-6">Bildirim Tercihleri</h2>
      
      <div className="space-y-6">
        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
          <div>
            <h3 className="font-semibold text-gray-900">Email Bildirimleri</h3>
            <p className="text-sm text-gray-600">Sipariş durumu ve kampanya bilgileri</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={currentUser.preferences.emailNotifications}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
          <div>
            <h3 className="font-semibold text-gray-900">SMS Bildirimleri</h3>
            <p className="text-sm text-gray-600">Acil durum ve teslimat bildirimleri</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={currentUser.preferences.smsNotifications}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
          <div>
            <h3 className="font-semibold text-gray-900">Pazarlama Bildirimleri</h3>
            <p className="text-sm text-gray-600">Özel teklifler ve indirim kampanyaları</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={currentUser.preferences.newsletter}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>
    </div>
  )
}

// Security Tab Component
const SecurityTab = () => {
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-6">Güvenlik Ayarları</h2>
      
      <div className="space-y-6">
        <div className="p-6 border border-gray-200 rounded-xl">
          <h3 className="font-semibold text-gray-900 mb-4">Şifre Değiştir</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mevcut Şifre</label>
              <input
                type="password"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="••••••••"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Yeni Şifre</label>
              <input
                type="password"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="••••••••"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Yeni Şifre Tekrar</label>
              <input
                type="password"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="••••••••"
              />
            </div>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
              Şifreyi Güncelle
            </button>
          </div>
        </div>

        <div className="p-6 border border-gray-200 rounded-xl">
          <h3 className="font-semibold text-gray-900 mb-4">İki Faktörlü Doğrulama</h3>
          <p className="text-gray-600 mb-4">Hesabınızın güvenliği için iki faktörlü doğrulamayı etkinleştirin.</p>
          <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200">
            Etkinleştir
          </button>
        </div>

        <div className="p-6 border border-red-200 rounded-xl bg-red-50">
          <h3 className="font-semibold text-red-900 mb-4">Hesabı Sil</h3>
          <p className="text-red-700 mb-4">Bu işlem geri alınamaz. Tüm verileriniz kalıcı olarak silinecektir.</p>
          <button className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200">
            Hesabı Sil
          </button>
        </div>
      </div>
    </div>
  )
}

export default Account
