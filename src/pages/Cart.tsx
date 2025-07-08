import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  Trash2, 
  ArrowLeft,
  CreditCard,
  Truck,
  Shield,
  CheckCircle,
  AlertCircle,
  Droplets
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCartStore } from '../store/cartStore'

const Cart = () => {
  const { items, updateQuantity, removeItem, clearCart, getTotalPrice, getTotalItems } = useCartStore()
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)

  const deliveryFee = getTotalPrice() > 100 ? 0 : 15
  const totalWithDelivery = getTotalPrice() + deliveryFee

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(id)
    } else {
      updateQuantity(id, newQuantity)
    }
  }

  const handleCheckout = async () => {
    setIsCheckingOut(true)
    
    // Simulate checkout process
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    setOrderComplete(true)
    setIsCheckingOut(false)
    clearCart()
    
    // Reset after 5 seconds
    setTimeout(() => setOrderComplete(false), 5000)
  }

  const benefits = [
    {
      icon: Truck,
      title: 'Ücretsiz Teslimat',
      description: '100₺ üzeri siparişlerde',
      color: 'text-green-600'
    },
    {
      icon: Shield,
      title: 'Güvenli Ödeme',
      description: 'SSL sertifikalı ödeme',
      color: 'text-blue-600'
    },
    {
      icon: CheckCircle,
      title: 'Kalite Garantisi',
      description: 'ISO 9001 standartları',
      color: 'text-purple-600'
    }
  ]

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl shadow-xl p-12 text-center max-w-md mx-4"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="h-10 w-10 text-green-600" />
          </motion.div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Siparişiniz Alındı!
          </h2>
          <p className="text-gray-600 mb-8">
            Siparişiniz başarıyla oluşturuldu. En kısa sürede size ulaşacağız.
          </p>
          
          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl hover:bg-blue-700 transition-colors"
            >
              Ana Sayfaya Dön
            </motion.button>
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <ShoppingCart className="h-16 w-16 mx-auto mb-6 text-cyan-300" />
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Sepetim
            </h1>
            <p className="text-xl text-cyan-100">
              {getTotalItems()} ürün sepetinizde
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {items.length === 0 ? (
          // Empty Cart
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <ShoppingCart className="h-16 w-16 text-gray-400" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Sepetiniz Boş
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Henüz sepetinize ürün eklemediniz. Hemen alışverişe başlayın!
            </p>
            <Link to="/products">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 text-white font-semibold py-4 px-8 rounded-xl hover:bg-blue-700 transition-colors flex items-center space-x-2 mx-auto"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Alışverişe Devam Et</span>
              </motion.button>
            </Link>
          </motion.div>
        ) : (
          // Cart with Items
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Sepetinizdeki Ürünler
                  </h2>
                  <button
                    onClick={clearCart}
                    className="text-red-600 hover:text-red-700 font-medium flex items-center space-x-1"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span>Sepeti Temizle</span>
                  </button>
                </div>

                <div className="space-y-4">
                  <AnimatePresence>
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="flex items-center space-x-4 p-4 border border-gray-200 rounded-xl hover:border-blue-300 transition-colors"
                      >
                        {/* Product Image */}
                        <div className="w-20 h-20 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Droplets className="h-8 w-8 text-blue-500" />
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-gray-900 truncate">
                            {item.name}
                          </h3>
                          <p className="text-gray-600">
                            Boyut: {item.size}
                          </p>
                          <p className="text-xl font-bold text-blue-600">
                            ₺{item.price}
                          </p>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-3">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
                          >
                            <Minus className="h-4 w-4" />
                          </motion.button>
                          
                          <span className="w-12 text-center font-semibold">
                            {item.quantity}
                          </span>
                          
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="w-8 h-8 bg-blue-100 hover:bg-blue-200 rounded-full flex items-center justify-center transition-colors"
                          >
                            <Plus className="h-4 w-4 text-blue-600" />
                          </motion.button>
                        </div>

                        {/* Total Price */}
                        <div className="text-right">
                          <p className="text-lg font-bold text-gray-900">
                            ₺{item.price * item.quantity}
                          </p>
                        </div>

                        {/* Remove Button */}
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => removeItem(item.id)}
                          className="w-8 h-8 text-red-500 hover:text-red-700 transition-colors"
                        >
                          <Trash2 className="h-5 w-5" />
                        </motion.button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Continue Shopping */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <Link to="/products">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-2"
                    >
                      <ArrowLeft className="h-5 w-5" />
                      <span>Alışverişe Devam Et</span>
                    </motion.button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Sipariş Özeti
                </h3>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Ara Toplam</span>
                    <span className="font-semibold">₺{getTotalPrice()}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Teslimat</span>
                    <span className={`font-semibold ${deliveryFee === 0 ? 'text-green-600' : ''}`}>
                      {deliveryFee === 0 ? 'Ücretsiz' : `₺${deliveryFee}`}
                    </span>
                  </div>
                  
                  {deliveryFee > 0 && (
                    <div className="text-sm text-gray-500 bg-blue-50 p-3 rounded-lg">
                      <AlertCircle className="h-4 w-4 inline mr-1" />
                      ₺{100 - getTotalPrice()} daha ekleyin, ücretsiz teslimat kazanın!
                    </div>
                  )}
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Toplam</span>
                      <span className="text-blue-600">₺{totalWithDelivery}</span>
                    </div>
                  </div>
                </div>

                {/* Benefits */}
                <div className="space-y-3 mb-6">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <benefit.icon className={`h-5 w-5 ${benefit.color}`} />
                      <div>
                        <div className="font-medium text-gray-900 text-sm">
                          {benefit.title}
                        </div>
                        <div className="text-gray-500 text-xs">
                          {benefit.description}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Checkout Button */}
                <motion.button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isCheckingOut ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                      <span>İşleniyor...</span>
                    </>
                  ) : (
                    <>
                      <CreditCard className="h-5 w-5" />
                      <span>Siparişi Tamamla</span>
                    </>
                  )}
                </motion.button>

                {/* Payment Info */}
                <div className="mt-4 text-center text-sm text-gray-500">
                  <p>Güvenli ödeme ile korunuyorsunuz</p>
                  <div className="flex justify-center space-x-2 mt-2">
                    <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center">
                      VISA
                    </div>
                    <div className="w-8 h-5 bg-red-600 rounded text-white text-xs flex items-center justify-center">
                      MC
                    </div>
                    <div className="w-8 h-5 bg-green-600 rounded text-white text-xs flex items-center justify-center">
                      SSL
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart
