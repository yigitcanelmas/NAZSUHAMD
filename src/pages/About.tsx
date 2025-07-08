import { motion } from 'framer-motion'
import { 
  Droplets, 
  Award, 
  Users, 
  Target, 
  Heart, 
  Shield, 
  Leaf,
  CheckCircle,
  Calendar,
  MapPin,
  Phone,
  Mail
} from 'lucide-react'

const About = () => {
  const stats = [
    { number: '15+', label: 'Yıllık Deneyim', icon: Calendar },
    { number: '15K+', label: 'Mutlu Müşteri', icon: Users },
    { number: '50K+', label: 'Başarılı Teslimat', icon: CheckCircle },
    { number: '24/7', label: 'Müşteri Desteği', icon: Phone },
  ]

  const values = [
    {
      icon: Shield,
      title: 'Kalite Güvencesi',
      description: 'ISO 9001 standartlarında üretim ve sürekli kalite kontrolü ile müşterilerimize en iyi hizmeti sunuyoruz.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Heart,
      title: 'Müşteri Memnuniyeti',
      description: 'Müşteri memnuniyeti bizim için öncelik. Her zaman daha iyi hizmet için çalışıyoruz.',
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: Leaf,
      title: 'Çevre Bilinci',
      description: 'Doğaya saygılı üretim süreçleri ve geri dönüşüm programları ile çevreyi koruyoruz.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Target,
      title: 'Sürekli Gelişim',
      description: 'Teknoloji ve inovasyonu takip ederek hizmet kalitemizi sürekli geliştiriyoruz.',
      color: 'from-purple-500 to-indigo-500'
    }
  ]

  const certifications = [
    {
      name: 'ISO 9001:2015',
      description: 'Kalite Yönetim Sistemi',
      year: '2020'
    },
    {
      name: 'ISO 22000:2018',
      description: 'Gıda Güvenliği Yönetim Sistemi',
      year: '2021'
    },
    {
      name: 'HACCP',
      description: 'Gıda Güvenliği Analizi',
      year: '2019'
    },
    {
      name: 'TSE Belgesi',
      description: 'Türk Standartları Enstitüsü',
      year: '2018'
    }
  ]

  const timeline = [
    {
      year: '2008',
      title: 'Kuruluş',
      description: 'Nazsu, temiz su hizmeti vermek amacıyla İstanbul\'da kuruldu.'
    },
    {
      year: '2012',
      title: 'İlk Sertifika',
      description: 'TSE kalite belgesi alarak standartlarımızı belgelendirdik.'
    },
    {
      year: '2015',
      title: 'Kapasite Artışı',
      description: 'Artan talep üzerine üretim kapasitemizi 3 katına çıkardık.'
    },
    {
      year: '2018',
      title: 'ISO Sertifikaları',
      description: 'ISO 9001 ve ISO 22000 sertifikalarını alarak kalite standartlarımızı uluslararası seviyeye çıkardık.'
    },
    {
      year: '2020',
      title: 'Dijital Dönüşüm',
      description: 'Online sipariş sistemi ve mobil uygulama ile hizmetlerimizi dijitalleştirdik.'
    },
    {
      year: '2023',
      title: 'Sürdürülebilirlik',
      description: 'Çevre dostu üretim süreçleri ve geri dönüşüm programları başlattık.'
    }
  ]

  const team = [
    {
      name: 'Ahmet Nazlı',
      role: 'Genel Müdür',
      description: 'Su sektöründe 20 yıllık deneyim',
      image: '/api/placeholder/200/200'
    },
    {
      name: 'Fatma Kaya',
      role: 'Kalite Kontrol Müdürü',
      description: 'Gıda mühendisi, 15 yıllık deneyim',
      image: '/api/placeholder/200/200'
    },
    {
      name: 'Mehmet Demir',
      role: 'Üretim Müdürü',
      description: 'Endüstri mühendisi, 12 yıllık deneyim',
      image: '/api/placeholder/200/200'
    },
    {
      name: 'Ayşe Yılmaz',
      role: 'Müşteri Hizmetleri Müdürü',
      description: 'İşletme mezunu, 10 yıllık deneyim',
      image: '/api/placeholder/200/200'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
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
              Hakkımızda
            </h1>
            <p className="text-xl md:text-2xl text-cyan-100 max-w-3xl mx-auto leading-relaxed">
              15 yıldır temiz ve sağlıklı su ile ailelerin sağlığını koruyoruz. 
              Kalite, güven ve müşteri memnuniyeti odaklı hizmet anlayışımızla yanınızdayız.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <stat.icon className="h-8 w-8 text-blue-600 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-display font-bold text-gray-900 mb-6">
                Misyonumuz
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Temiz ve sağlıklı su ile toplumun yaşam kalitesini artırmak, 
                güvenilir hizmet anlayışımızla müşterilerimizin memnuniyetini sağlamak 
                ve çevre dostu üretim süreçleriyle gelecek nesillere temiz bir dünya bırakmaktır.
              </p>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Target className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Hedefimiz</h3>
                  <p className="text-gray-600">Türkiye'nin en güvenilir su markası olmak</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-8"
            >
              <h2 className="text-4xl font-display font-bold text-gray-900 mb-6">
                Vizyonumuz
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Su sektöründe inovasyon ve kalite standartlarını belirleyen, 
                sürdürülebilir üretim anlayışıyla çevreye saygılı, 
                teknoloji odaklı çözümlerle müşteri deneyimini sürekli geliştiren 
                lider bir marka olmaktır.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">100%</div>
                  <div className="text-sm text-gray-600">Müşteri Memnuniyeti</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">0%</div>
                  <div className="text-sm text-gray-600">Çevre Zararı</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
              Değerlerimiz
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              İş yapış şeklimizi belirleyen temel değerlerimiz
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center group"
              >
                <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${value.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <value.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
              Tarihçemiz
            </h2>
            <p className="text-xl text-gray-600">
              15 yıllık yolculuğumuzun önemli kilometre taşları
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full" />

            <div className="space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <div className="text-2xl font-bold text-blue-600 mb-2">
                        {item.year}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Timeline dot */}
                  <div className="relative z-10 w-4 h-4 bg-blue-500 rounded-full border-4 border-white shadow-lg" />

                  <div className="w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
              Sertifikalarımız
            </h2>
            <p className="text-xl text-gray-600">
              Kalite standartlarımızı belgeleyen sertifikalar
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center group"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {cert.name}
                </h3>
                <p className="text-gray-600 text-sm mb-2">
                  {cert.description}
                </p>
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                  {cert.year}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
              Ekibimiz
            </h2>
            <p className="text-xl text-gray-600">
              Deneyimli ve uzman kadromuzla hizmetinizdeyiz
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center group"
              >
                <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-12 w-12 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-blue-600 font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-gray-600 text-sm">
                  {member.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-display font-bold text-white mb-6">
              Bizimle İletişime Geçin
            </h2>
            <p className="text-xl text-cyan-100 mb-8 leading-relaxed">
              Sorularınız için bize ulaşın. Deneyimli ekibimiz size yardımcı olmaktan mutluluk duyar.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-blue-700 font-semibold rounded-full hover:bg-cyan-50 transition-colors duration-300 flex items-center justify-center space-x-2 shadow-lg"
              >
                <Mail className="h-5 w-5" />
                <span>İletişim Formu</span>
              </motion.a>
              <motion.a
                href="tel:08501234567"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-blue-700 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Phone className="h-5 w-5" />
                <span>0850 123 45 67</span>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default About
