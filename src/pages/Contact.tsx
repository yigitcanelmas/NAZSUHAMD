import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send,
  CheckCircle,
  AlertCircle,
  Droplets,
  MessageSquare,
  User,
  Building
} from 'lucide-react'

interface ContactForm {
  name: string
  email: string
  phone: string
  company?: string
  subject: string
  message: string
  orderType: string
}

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactForm>()

  const contactInfo = [
    {
      icon: Phone,
      title: 'Telefon',
      details: ['0850 123 45 67', '0212 456 78 90'],
      description: '7/24 müşteri hizmetleri',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Mail,
      title: 'E-posta',
      details: ['info@nazsu.com', 'siparis@nazsu.com'],
      description: 'En geç 2 saat içinde yanıt',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: MapPin,
      title: 'Adres',
      details: ['Atatürk Mah. Su Cad. No:123', 'Kadıköy / İstanbul'],
      description: 'Fabrika ve ofis merkezi',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Clock,
      title: 'Çalışma Saatleri',
      details: ['Pazartesi - Cumartesi: 08:00 - 18:00', 'Pazar: 09:00 - 17:00'],
      description: 'Acil durumlar için 7/24',
      color: 'from-orange-500 to-red-500'
    }
  ]

  const orderTypes = [
    { value: 'bireysel', label: 'Bireysel Sipariş' },
    { value: 'kurumsal', label: 'Kurumsal Sipariş' },
    { value: 'toplu', label: 'Toplu Sipariş' },
    { value: 'abonelik', label: 'Abonelik Sistemi' },
    { value: 'diğer', label: 'Diğer' }
  ]

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    console.log('Form data:', data)
    setIsSubmitted(true)
    setIsSubmitting(false)
    reset()
    
    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000)
  }

  const faqs = [
    {
      question: 'Sipariş nasıl verebilirim?',
      answer: 'Telefon, e-posta veya web sitemiz üzerinden kolayca sipariş verebilirsiniz. Müşteri temsilcilerimiz size yardımcı olmaktan mutluluk duyar.'
    },
    {
      question: 'Teslimat süresi ne kadar?',
      answer: 'İstanbul içi siparişleriniz 24 saat içinde, diğer şehirler için 2-3 iş günü içinde teslim edilir.'
    },
    {
      question: 'Minimum sipariş miktarı var mı?',
      answer: 'Bireysel siparişler için minimum miktar yoktur. Kurumsal siparişler için özel fiyatlandırma mevcuttur.'
    },
    {
      question: 'Ödeme seçenekleri nelerdir?',
      answer: 'Nakit, kredi kartı, havale/EFT ve kurumsal müşteriler için açık hesap seçenekleri mevcuttur.'
    },
    {
      question: 'Su kalitesi nasıl kontrol ediliyor?',
      answer: 'Sularımız düzenli olarak akredite laboratuvarlarda test edilir ve ISO 22000 standartlarına uygun olarak üretilir.'
    },
    {
      question: 'Geri dönüşüm programınız var mı?',
      answer: 'Evet, kullanılmış damacanaları geri alıyor ve çevre dostu geri dönüşüm süreçlerini uyguluyoruz.'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-800 text-white py-20">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <Droplets className="h-16 w-16 mx-auto mb-6 text-cyan-300" />
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
              İletişim
            </h1>
            <p className="text-xl md:text-2xl text-cyan-100 max-w-3xl mx-auto leading-relaxed">
              Size nasıl yardımcı olabiliriz? Sorularınız, siparişleriniz ve önerileriniz için bizimle iletişime geçin.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 -mt-10 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center group"
              >
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${info.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <info.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {info.title}
                </h3>
                <div className="space-y-1 mb-3">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-gray-700 font-medium">
                      {detail}
                    </p>
                  ))}
                </div>
                <p className="text-gray-500 text-sm">
                  {info.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-white rounded-3xl shadow-xl p-8">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">
                    Bize Ulaşın
                  </h2>
                  <p className="text-gray-600">
                    Formu doldurun, en kısa sürede size dönüş yapalım
                  </p>
                </div>

                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center space-x-3"
                  >
                    <CheckCircle className="h-6 w-6 text-green-600" />
                    <div>
                      <p className="text-green-800 font-medium">Mesajınız başarıyla gönderildi!</p>
                      <p className="text-green-600 text-sm">En kısa sürede size dönüş yapacağız.</p>
                    </div>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Ad Soyad *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          {...register('name', { required: 'Ad soyad gereklidir' })}
                          type="text"
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                          placeholder="Adınız ve soyadınız"
                        />
                      </div>
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        E-posta *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          {...register('email', { 
                            required: 'E-posta gereklidir',
                            pattern: {
                              value: /^\S+@\S+$/i,
                              message: 'Geçerli bir e-posta adresi girin'
                            }
                          })}
                          type="email"
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                          placeholder="ornek@email.com"
                        />
                      </div>
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Telefon *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          {...register('phone', { required: 'Telefon numarası gereklidir' })}
                          type="tel"
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                          placeholder="0555 123 45 67"
                        />
                      </div>
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.phone.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Şirket/Kurum
                      </label>
                      <div className="relative">
                        <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          {...register('company')}
                          type="text"
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                          placeholder="Şirket adı (opsiyonel)"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sipariş Türü *
                    </label>
                    <select
                      {...register('orderType', { required: 'Sipariş türü seçiniz' })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    >
                      <option value="">Sipariş türünü seçin</option>
                      {orderTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                    {errors.orderType && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.orderType.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Konu *
                    </label>
                    <input
                      {...register('subject', { required: 'Konu gereklidir' })}
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="Mesajınızın konusu"
                    />
                    {errors.subject && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.subject.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mesaj *
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <textarea
                        {...register('message', { required: 'Mesaj gereklidir' })}
                        rows={5}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                        placeholder="Mesajınızı buraya yazın..."
                      />
                    </div>
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                        <span>Gönderiliyor...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        <span>Mesajı Gönder</span>
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>

            {/* Map & Additional Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Map Placeholder */}
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                <div className="h-64 bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Nazsu Fabrika ve Ofis
                    </h3>
                    <p className="text-gray-600">
                      Atatürk Mah. Su Cad. No:123<br />
                      Kadıköy / İstanbul
                    </p>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Ulaşım Bilgileri</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Metro: Kadıköy İskele (5 dk yürüme)</li>
                    <li>• Otobüs: 16, 16A, 16C hatları</li>
                    <li>• Araç: Ücretsiz otopark mevcut</li>
                  </ul>
                </div>
              </div>

              {/* Quick Contact */}
              <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-3xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-6">Hızlı İletişim</h3>
                <div className="space-y-4">
                  <motion.a
                    href="tel:08501234567"
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center space-x-3 p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
                  >
                    <Phone className="h-6 w-6" />
                    <div>
                      <div className="font-semibold">Acil Sipariş Hattı</div>
                      <div className="text-cyan-100">0850 123 45 67</div>
                    </div>
                  </motion.a>
                  
                  <motion.a
                    href="mailto:info@nazsu.com"
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center space-x-3 p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
                  >
                    <Mail className="h-6 w-6" />
                    <div>
                      <div className="font-semibold">E-posta</div>
                      <div className="text-cyan-100">info@nazsu.com</div>
                    </div>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
              Sıkça Sorulan Sorular
            </h2>
            <p className="text-xl text-gray-600">
              En çok merak edilen sorular ve yanıtları
            </p>
          </motion.div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-50 rounded-2xl p-6 hover:bg-gray-100 transition-colors"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
