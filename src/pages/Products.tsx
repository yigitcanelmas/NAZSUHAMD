import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TextPlugin } from 'gsap/TextPlugin'
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin'
import { 
  Droplets, 
  Filter, 
  Search, 
  ShoppingCart, 
  Star,
  Check,
  X,
  Grid,
  List,
  Sparkles,
  Zap,
  Award,
  TrendingUp
} from 'lucide-react'
import { useCartStore } from '../store/cartStore'

gsap.registerPlugin(ScrollTrigger, TextPlugin, MorphSVGPlugin)

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('name')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)
  
  const { addItem } = useCartStore()
  
  // Refs for GSAP animations
  const headerRef = useRef<HTMLDivElement>(null)
  const filtersRef = useRef<HTMLDivElement>(null)
  const productsGridRef = useRef<HTMLDivElement>(null)
  const toolbarRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // Advanced Header Animation with Liquid Morphing
    if (headerRef.current) {
      const tl = gsap.timeline()
      
      // Background liquid animation
      tl.fromTo('.header-liquid', 
        { 
          scale: 0, 
          rotation: 0,
          opacity: 0
        },
        { 
          scale: 1.5, 
          rotation: 360,
          opacity: 0.3,
          duration: 2,
          ease: "elastic.out(1, 0.3)",
          stagger: 0.2
        }
      )

      // Title animation with split text effect
      tl.fromTo('.header-title',
        { 
          y: 100, 
          opacity: 0,
          scale: 0.8
        },
        { 
          y: 0, 
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "back.out(1.7)"
        }, "-=1.5"
      )

      // Subtitle with typewriter effect
      tl.to('.header-subtitle', {
        text: "Kaliteli su çözümleri ve aksesuarlarımızı keşfedin",
        duration: 2,
        ease: "none"
      }, "-=0.5")

      // Floating particles animation
      gsap.utils.toArray('.header-particle').forEach((particle: any, i) => {
        gsap.set(particle, {
          x: gsap.utils.random(-100, 100),
          y: gsap.utils.random(-50, 50),
          scale: gsap.utils.random(0.5, 1.5),
          opacity: gsap.utils.random(0.3, 0.8)
        })
        
        gsap.to(particle, {
          y: "-=80",
          x: "+=30",
          rotation: 360,
          duration: gsap.utils.random(6, 12),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.2
        })
      })
    }

    // Advanced Filters Sidebar Animation
    if (filtersRef.current) {
      ScrollTrigger.create({
        trigger: filtersRef.current,
        start: "top 80%",
        onEnter: () => {
          gsap.fromTo('.filter-item',
            { 
              x: -100, 
              opacity: 0,
              rotationY: -45
            },
            {
              x: 0,
              opacity: 1,
              rotationY: 0,
              duration: 0.8,
              stagger: 0.1,
              ease: "power3.out"
            }
          )
        }
      })

      // Search input focus animation
      if (searchInputRef.current) {
        searchInputRef.current.addEventListener('focus', () => {
          gsap.to(searchInputRef.current, {
            scale: 1.02,
            boxShadow: "0 10px 30px rgba(59, 130, 246, 0.3)",
            duration: 0.3,
            ease: "power2.out"
          })
        })
        
        searchInputRef.current.addEventListener('blur', () => {
          gsap.to(searchInputRef.current, {
            scale: 1,
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
            duration: 0.3,
            ease: "power2.out"
          })
        })
      }
    }

    // Toolbar Animation
    if (toolbarRef.current) {
      gsap.fromTo(toolbarRef.current,
        { y: -30, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8,
          ease: "power2.out",
          delay: 0.3
        }
      )
    }

    // Products Grid Advanced Animation
    if (productsGridRef.current) {
      const productCards = productsGridRef.current.querySelectorAll('.product-card')
      
      ScrollTrigger.create({
        trigger: productsGridRef.current,
        start: "top 80%",
        onEnter: () => {
          productCards.forEach((card, i) => {
            gsap.fromTo(card,
              { 
                opacity: 0, 
                y: 100,
                rotationX: -45,
                scale: 0.8
              },
              {
                opacity: 1,
                y: 0,
                rotationX: 0,
                scale: 1,
                duration: 1,
                delay: i * 0.1,
                ease: "back.out(1.7)"
              }
            )
          })
        }
      })

      // Individual product card hover animations
      productCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            y: -10,
            scale: 1.02,
            rotationY: 2,
            boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
            duration: 0.4,
            ease: "power2.out"
          })
          
          // Animate product image
          const productImage = card.querySelector('.product-image')
          if (productImage) {
            gsap.to(productImage, {
              scale: 1.1,
              rotation: 5,
              duration: 0.4,
              ease: "power2.out"
            })
          }
          
          // Animate price with pulsing effect
          const price = card.querySelector('.product-price')
          if (price) {
            gsap.to(price, {
              scale: 1.1,
              color: "#3B82F6",
              duration: 0.3,
              ease: "power2.out"
            })
          }
        })
        
        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            rotationY: 0,
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            duration: 0.4,
            ease: "power2.out"
          })
          
          const productImage = card.querySelector('.product-image')
          if (productImage) {
            gsap.to(productImage, {
              scale: 1,
              rotation: 0,
              duration: 0.4,
              ease: "power2.out"
            })
          }
          
          const price = card.querySelector('.product-price')
          if (price) {
            gsap.to(price, {
              scale: 1,
              color: "#1E40AF",
              duration: 0.3,
              ease: "power2.out"
            })
          }
        })
      })
    }

    // Continuous floating animation for decorative elements
    gsap.utils.toArray('.floating-decoration').forEach((element: any, i) => {
      gsap.to(element, {
        y: -15,
        rotation: 10,
        duration: 3 + i * 0.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.3
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  // Advanced filter change animation
  useEffect(() => {
    if (productsGridRef.current) {
      const productCards = productsGridRef.current.querySelectorAll('.product-card')
      
      // Animate out
      gsap.to(productCards, {
        opacity: 0,
        y: 30,
        scale: 0.9,
        duration: 0.3,
        stagger: 0.05,
        ease: "power2.in",
        onComplete: () => {
          // Animate in new products
          setTimeout(() => {
            const newCards = productsGridRef.current?.querySelectorAll('.product-card')
            if (newCards) {
              gsap.fromTo(newCards,
                { 
                  opacity: 0, 
                  y: 30, 
                  scale: 0.9,
                  rotationX: -20
                },
                {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  rotationX: 0,
                  duration: 0.6,
                  stagger: 0.08,
                  ease: "back.out(1.7)"
                }
              )
            }
          }, 100)
        }
      })
    }
  }, [selectedCategory, sortBy, searchTerm])

  const categories = [
    { id: 'all', name: 'Tüm Ürünler', count: 8 },
    { id: 'damacana', name: 'Damacana Su', count: 5 },
    { id: 'sebil', name: 'Su Sebilleri', count: 2 },
    { id: 'aksesuar', name: 'Aksesuarlar', count: 1 },
  ]

  const products = [
    {
      id: '1',
      name: '19L Damacana Su',
      category: 'damacana',
      price: 25,
      originalPrice: 30,
      image: '/api/placeholder/400/400',
      description: 'Standart boyut damacana su. Aileler için ideal.',
      features: ['ISO 9001 Kalite', 'Laboratuvar Testli', 'BPA Free'],
      rating: 4.8,
      reviews: 124,
      inStock: true,
      popular: true,
      discount: 17
    },
    {
      id: '2',
      name: '12L Damacana Su',
      category: 'damacana',
      price: 18,
      originalPrice: 22,
      image: '/api/placeholder/400/400',
      description: 'Orta boyut damacana su. Küçük aileler için uygun.',
      features: ['ISO 9001 Kalite', 'Laboratuvar Testli', 'BPA Free'],
      rating: 4.7,
      reviews: 89,
      inStock: true,
      discount: 18
    },
    {
      id: '3',
      name: '5L Damacana Su',
      category: 'damacana',
      price: 12,
      originalPrice: 15,
      image: '/api/placeholder/400/400',
      description: 'Küçük boyut damacana su. Ofis kullanımı için ideal.',
      features: ['ISO 9001 Kalite', 'Laboratuvar Testli', 'BPA Free'],
      rating: 4.6,
      reviews: 67,
      inStock: true,
      discount: 20
    },
    {
      id: '4',
      name: 'Premium 19L Damacana Su',
      category: 'damacana',
      price: 35,
      originalPrice: 40,
      image: '/api/placeholder/400/400',
      description: 'Premium kalite damacana su. Özel filtrasyon sistemi.',
      features: ['Premium Kalite', 'Özel Filtrasyon', 'Mineral Zengin', 'BPA Free'],
      rating: 4.9,
      reviews: 156,
      inStock: true,
      popular: true,
      discount: 13
    },
    {
      id: '5',
      name: 'Ekonomik 19L Damacana Su',
      category: 'damacana',
      price: 20,
      originalPrice: 25,
      image: '/api/placeholder/400/400',
      description: 'Ekonomik damacana su. Uygun fiyat, kaliteli su.',
      features: ['Ekonomik Fiyat', 'Kaliteli Su', 'BPA Free'],
      rating: 4.5,
      reviews: 98,
      inStock: true,
      discount: 20
    },
    {
      id: '6',
      name: 'Masaüstü Su Sebili',
      category: 'sebil',
      price: 450,
      originalPrice: 500,
      image: '/api/placeholder/400/400',
      description: 'Kompakt masaüstü su sebili. Ofis ve ev kullanımı.',
      features: ['Sıcak/Soğuk Su', 'Kompakt Tasarım', 'Enerji Tasarruflu'],
      rating: 4.4,
      reviews: 45,
      inStock: true,
      discount: 10
    },
    {
      id: '7',
      name: 'Ayaklı Su Sebili',
      category: 'sebil',
      price: 650,
      originalPrice: 750,
      image: '/api/placeholder/400/400',
      description: 'Ayaklı su sebili. Yüksek kapasiteli kullanım.',
      features: ['Sıcak/Soğuk Su', 'Yüksek Kapasite', 'Dayanıklı Yapı'],
      rating: 4.6,
      reviews: 32,
      inStock: false,
      discount: 13
    },
    {
      id: '8',
      name: 'Su Sebili Temizlik Kiti',
      category: 'aksesuar',
      price: 35,
      originalPrice: 45,
      image: '/api/placeholder/400/400',
      description: 'Su sebili temizlik ve bakım kiti.',
      features: ['Temizlik Malzemeleri', 'Bakım Kılavuzu', 'Hijyen Sağlar'],
      rating: 4.3,
      reviews: 23,
      inStock: true,
      discount: 22
    }
  ]

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'rating':
        return b.rating - a.rating
      case 'popular':
        return (b.popular ? 1 : 0) - (a.popular ? 1 : 0)
      default:
        return a.name.localeCompare(b.name)
    }
  })

  const handleAddToCart = (product: typeof products[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: product.category === 'damacana' ? product.name.split(' ')[0] : 'Standart'
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Header with Advanced Animations */}
      <div ref={headerRef} className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 text-white py-20 overflow-hidden">
        {/* Liquid morphing background shapes */}
        <div className="absolute inset-0">
          <div className="header-liquid absolute top-10 left-10 w-64 h-64 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-full blur-3xl"></div>
          <div className="header-liquid absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-r from-blue-400/15 to-cyan-600/15 rounded-full blur-2xl"></div>
          <div className="header-liquid absolute top-1/2 left-1/2 w-48 h-48 bg-gradient-to-r from-cyan-300/25 to-blue-400/25 rounded-full blur-xl"></div>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="header-particle absolute bg-white/10 rounded-full"
              style={{
                width: `${Math.random() * 6 + 2}px`,
                height: `${Math.random() * 6 + 2}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        {/* Floating decorative elements */}
        <div className="floating-decoration absolute top-20 right-20 opacity-20">
          <Sparkles className="h-16 w-16 text-cyan-300" />
        </div>
        <div className="floating-decoration absolute bottom-20 left-20 opacity-15">
          <Award className="h-12 w-12 text-blue-300" />
        </div>
        <div className="floating-decoration absolute top-1/2 right-1/4 opacity-10">
          <TrendingUp className="h-20 w-20 text-cyan-400" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Enhanced Title */}
            <motion.h1 
              className="header-title text-5xl md:text-7xl font-display font-bold mb-6 relative"
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, ease: "back.out(1.7)" }}
            >
              <span className="bg-gradient-to-r from-white via-cyan-200 to-blue-200 bg-clip-text text-transparent relative z-10">
                Ürünlerimiz
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 blur-2xl"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />
            </motion.h1>

            {/* Premium Badge */}
            <motion.div
              className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md rounded-full px-6 py-2 mb-8 border border-white/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <Zap className="h-4 w-4 text-yellow-300" />
              <span className="text-sm font-medium text-cyan-100">Premium Su Ürünleri</span>
              <Droplets className="h-4 w-4 text-cyan-300" />
            </motion.div>

            {/* Enhanced Subtitle */}
            <motion.p 
              className="header-subtitle text-xl md:text-2xl text-cyan-100 max-w-3xl mx-auto leading-relaxed font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              {/* Text will be animated via GSAP TextPlugin */}
            </motion.p>

            {/* Stats Row */}
            <motion.div
              className="mt-12 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-white">8+</div>
                <div className="text-cyan-200 text-sm">Ürün Çeşidi</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">%100</div>
                <div className="text-cyan-200 text-sm">Kalite Garantisi</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">24/7</div>
                <div className="text-cyan-200 text-sm">Müşteri Desteği</div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Enhanced Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer group"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          whileHover={{ scale: 1.1 }}
        >
          <div className="w-8 h-12 border-2 border-white/50 rounded-full flex justify-center relative overflow-hidden group-hover:border-white/80 transition-colors duration-300">
            <motion.div
              className="w-1.5 h-4 bg-white/50 rounded-full mt-2 group-hover:bg-white/80 transition-colors duration-300"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
          <p className="text-white/50 text-xs mt-2 group-hover:text-white/80 transition-colors duration-300">Keşfet</p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden w-full flex items-center justify-between p-3 bg-gray-100 rounded-lg mb-4"
              >
                <span className="font-medium">Filtreler</span>
                <Filter className="h-5 w-5" />
              </button>

              <div className={`space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                {/* Search */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ürün Ara
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Ürün adı..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Categories */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Kategoriler
                  </h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                          selectedCategory === category.id
                            ? 'bg-blue-100 text-blue-700 font-medium'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span>{category.name}</span>
                          <span className="text-sm text-gray-500">
                            {category.count}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sort */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sıralama
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="name">İsme Göre</option>
                    <option value="price-low">Fiyat (Düşük-Yüksek)</option>
                    <option value="price-high">Fiyat (Yüksek-Düşük)</option>
                    <option value="rating">Puana Göre</option>
                    <option value="popular">Popülerlik</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:w-3/4">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div className="text-gray-600">
                <span className="font-medium">{sortedProducts.length}</span> ürün bulundu
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg ${
                    viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <Grid className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg ${
                    viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <List className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Products */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${selectedCategory}-${sortBy}-${viewMode}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
                    : 'space-y-4'
                }
              >
                {sortedProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group ${
                      viewMode === 'list' ? 'flex' : ''
                    }`}
                  >
                    {/* Product Image */}
                    <div className={`relative ${viewMode === 'list' ? 'w-48 flex-shrink-0' : 'aspect-square'} bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center`}>
                      {product.popular && (
                        <div className="absolute top-3 left-3 z-10">
                          <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                            Popüler
                          </span>
                        </div>
                      )}
                      
                      {product.discount && (
                        <div className="absolute top-3 right-3 z-10">
                          <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                            %{product.discount} İndirim
                          </span>
                        </div>
                      )}

                      {!product.inStock && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
                          <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                            Stokta Yok
                          </span>
                        </div>
                      )}

                      <Droplets className="h-16 w-16 text-blue-500 group-hover:scale-110 transition-transform duration-300" />
                    </div>

                    {/* Product Info */}
                    <div className="p-6 flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {product.name}
                        </h3>
                        <div className="flex items-center space-x-1 text-sm text-gray-500">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span>{product.rating}</span>
                          <span>({product.reviews})</span>
                        </div>
                      </div>

                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {product.description}
                      </p>

                      {/* Features */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {product.features.slice(0, 3).map((feature) => (
                          <span
                            key={feature}
                            className="inline-flex items-center px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
                          >
                            <Check className="h-3 w-3 mr-1" />
                            {feature}
                          </span>
                        ))}
                      </div>

                      {/* Price and Actions */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-blue-600">
                            ₺{product.price}
                          </span>
                          {product.originalPrice && (
                            <span className="text-sm text-gray-500 line-through">
                              ₺{product.originalPrice}
                            </span>
                          )}
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleAddToCart(product)}
                          disabled={!product.inStock}
                          className={`px-4 py-2 rounded-full font-medium transition-colors duration-200 flex items-center space-x-2 ${
                            product.inStock
                              ? 'bg-blue-600 text-white hover:bg-blue-700'
                              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          }`}
                        >
                          <ShoppingCart className="h-4 w-4" />
                          <span>{product.inStock ? 'Sepete Ekle' : 'Stokta Yok'}</span>
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* No Results */}
            {sortedProducts.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <Droplets className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Ürün bulunamadı
                </h3>
                <p className="text-gray-500">
                  Arama kriterlerinizi değiştirmeyi deneyin.
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Products
