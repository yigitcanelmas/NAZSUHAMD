import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TextPlugin } from 'gsap/TextPlugin'
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'
import { SplitText } from 'gsap/SplitText'
import { 
  Droplets, 
  Shield, 
  Truck, 
  Award, 
  Phone, 
  ArrowRight,
  Star,
  Users,
  Waves,
  Sparkles,
  Zap
} from 'lucide-react'
import { Link } from 'react-router-dom'

gsap.registerPlugin(ScrollTrigger, TextPlugin, MorphSVGPlugin, DrawSVGPlugin, SplitText)

const Home = () => {
  const heroRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const productsRef = useRef<HTMLDivElement>(null)
  const testimonialsRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const waterWaveRef = useRef<HTMLDivElement>(null)
  // const floatingElementsRef = useRef<HTMLDivElement>(null) // Unused ref
  const heroTitleRef = useRef<HTMLHeadingElement>(null)
  const heroSubtitleRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    // Master timeline for coordinated animations
    const masterTL = gsap.timeline()

    // Advanced Hero Animations with Morphing and Particles
    if (heroRef.current) {
      // Create floating particles
      const particles = heroRef.current.querySelectorAll('.particle')
      particles.forEach((particle, i) => {
        gsap.set(particle, {
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          scale: Math.random() * 0.5 + 0.5,
          opacity: Math.random() * 0.5 + 0.3
        })
        
        gsap.to(particle, {
          y: "-=100",
          x: "+=50",
          rotation: 360,
          duration: 8 + Math.random() * 4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.2
        })
      })

      // Hero title with split text animation
      if (heroTitleRef.current) {
        const splitTitle = new SplitText(heroTitleRef.current, { type: "chars" })
        masterTL.fromTo(splitTitle.chars, 
          { 
            opacity: 0, 
            y: 100, 
            rotationX: -90,
            transformOrigin: "50% 50% -50px"
          },
          { 
            opacity: 1, 
            y: 0, 
            rotationX: 0,
            duration: 1.2, 
            stagger: 0.05, 
            ease: "back.out(1.7)" 
          }
        )
      }

      // Hero subtitle with typewriter effect
      if (heroSubtitleRef.current) {
        masterTL.to(heroSubtitleRef.current, {
          text: "Temiz ve sağlıklı su çözümleri ile ailenizin sağlığını koruyoruz. Kaliteli hizmet anlayışımızla güvenilir adresiniziz.",
          duration: 3,
          ease: "none",
          delay: 0.5
        }, "-=0.5")
      }

      // Hero elements with advanced physics
      const heroElements = heroRef.current.querySelectorAll('.hero-element')
      masterTL.fromTo(heroElements,
        { 
          opacity: 0, 
          y: 100, 
          scale: 0.8,
          rotation: -10
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotation: 0,
          duration: 1.5,
          stagger: 0.2,
          ease: "elastic.out(1, 0.5)"
        }, "-=1"
      )
    }

    // Water Wave Animation
    if (waterWaveRef.current) {
      gsap.to(waterWaveRef.current, {
        backgroundPosition: "200% 0%",
        duration: 8,
        repeat: -1,
        ease: "none"
      })
    }

    // Advanced Features Animation with Magnetic Effect
    if (featuresRef.current) {
      const featureCards = featuresRef.current.querySelectorAll('.feature-card')
      
      ScrollTrigger.create({
        trigger: featuresRef.current,
        start: "top 80%",
        onEnter: () => {
          gsap.fromTo(featureCards,
            { 
              opacity: 0, 
              y: 100, 
              rotationY: -45,
              transformOrigin: "center center"
            },
            {
              opacity: 1,
              y: 0,
              rotationY: 0,
              duration: 1.2,
              stagger: 0.15,
              ease: "power3.out"
            }
          )
        }
      })

      // Add magnetic hover effect
      featureCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            scale: 1.05,
            rotationY: 5,
            z: 50,
            duration: 0.3,
            ease: "power2.out"
          })
        })
        
        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            scale: 1,
            rotationY: 0,
            z: 0,
            duration: 0.3,
            ease: "power2.out"
          })
        })
      })
    }

    // Products Section with 3D Carousel Effect
    if (productsRef.current) {
      const productCards = productsRef.current.querySelectorAll('.product-card')
      
      ScrollTrigger.create({
        trigger: productsRef.current,
        start: "top 70%",
        onEnter: () => {
          productCards.forEach((card, i) => {
            gsap.fromTo(card,
              { 
                opacity: 0, 
                rotationY: i % 2 === 0 ? -90 : 90,
                x: i % 2 === 0 ? -200 : 200,
                z: -100
              },
              {
                opacity: 1,
                rotationY: 0,
                x: 0,
                z: 0,
                duration: 1.5,
                delay: i * 0.2,
                ease: "power3.out"
              }
            )
          })
        }
      })
    }

    // Advanced Stats Counter with Morphing Numbers
    if (statsRef.current) {
      const stats = statsRef.current.querySelectorAll('.stat-number')
      const statCards = statsRef.current.querySelectorAll('.stat-card')
      
      ScrollTrigger.create({
        trigger: statsRef.current,
        start: "top 80%",
        onEnter: () => {
          // Animate stat cards
          gsap.fromTo(statCards,
            { 
              opacity: 0, 
              scale: 0.5,
              rotationX: -90
            },
            {
              opacity: 1,
              scale: 1,
              rotationX: 0,
              duration: 1,
              stagger: 0.1,
              ease: "back.out(1.7)"
            }
          )

          // Animate numbers with morphing effect
          stats.forEach((stat, i) => {
            const target = parseInt(stat.getAttribute('data-target') || '0')
            gsap.fromTo(stat,
              { textContent: 0 },
              {
                textContent: target,
                duration: 2.5,
                ease: "power2.out",
                snap: { textContent: 1 },
                delay: i * 0.2,
                onUpdate: function() {
                  // Add pulsing effect during counting
                  gsap.to(stat, {
                    scale: 1.1,
                    duration: 0.1,
                    yoyo: true,
                    repeat: 1,
                    ease: "power2.inOut"
                  })
                }
              }
            )
          })
        }
      })
    }

    // Testimonials with Parallax and Rotation
    if (testimonialsRef.current) {
      const testimonialCards = testimonialsRef.current.querySelectorAll('.testimonial-card')
      
      ScrollTrigger.create({
        trigger: testimonialsRef.current,
        start: "top 80%",
        onEnter: () => {
          testimonialCards.forEach((card, i) => {
            gsap.fromTo(card,
              { 
                opacity: 0, 
                y: 100,
                rotation: i % 2 === 0 ? -15 : 15,
                scale: 0.8
              },
              {
                opacity: 1,
                y: 0,
                rotation: 0,
                scale: 1,
                duration: 1.2,
                delay: i * 0.15,
                ease: "elastic.out(1, 0.5)"
              }
            )
          })
        }
      })

      // Parallax effect on scroll
      ScrollTrigger.create({
        trigger: testimonialsRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          testimonialCards.forEach((card, i) => {
            const speed = (i + 1) * 0.5
            gsap.to(card, {
              y: -self.progress * 50 * speed,
              duration: 0.3
            })
          })
        }
      })
    }

    // CTA Section with Morphing Background
    if (ctaRef.current) {
      ScrollTrigger.create({
        trigger: ctaRef.current,
        start: "top 80%",
        onEnter: () => {
          const ctaElements = ctaRef.current!.querySelectorAll('.cta-element')
          gsap.fromTo(ctaElements,
            { 
              opacity: 0, 
              scale: 0.5,
              rotationY: 180
            },
            {
              opacity: 1,
              scale: 1,
              rotationY: 0,
              duration: 1.5,
              stagger: 0.2,
              ease: "power3.out"
            }
          )
        }
      })
    }

    // Continuous floating animations for decorative elements
    const floatingElements = document.querySelectorAll('.floating-element')
    floatingElements.forEach((element, i) => {
      gsap.to(element, {
        y: -20,
        rotation: 5,
        duration: 3 + i * 0.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.3
      })
    })

    // Scroll-triggered parallax for background elements
    ScrollTrigger.create({
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
      onUpdate: (self) => {
        const parallaxElements = document.querySelectorAll('.parallax-element')
        parallaxElements.forEach((element, i) => {
          const speed = (i + 1) * 0.3
          gsap.to(element, {
            y: self.progress * 100 * speed,
            duration: 0.3
          })
        })
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
      masterTL.kill()
    }
  }, [])

  const features = [
    {
      icon: Shield,
      title: 'Kalite Güvencesi',
      description: 'ISO 9001 kalite standartlarında üretilen, laboratuvar testlerinden geçmiş temiz su.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Truck,
      title: 'Hızlı Teslimat',
      description: 'İstanbul genelinde 24 saat içinde kapınıza kadar ücretsiz teslimat.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Award,
      title: 'Güvenilir Marka',
      description: '15 yıllık deneyim ve binlerce memnun müşteri ile güvenilir hizmet.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Phone,
      title: '7/24 Destek',
      description: 'Müşteri memnuniyeti odaklı 7/24 telefon desteği ve online sipariş.',
      color: 'from-orange-500 to-red-500'
    }
  ]

  const products = [
    {
      id: '1',
      name: '19L Damacana Su',
      price: 25,
      image: '/api/placeholder/300/300',
      description: 'Standart boyut damacana su',
      popular: true
    },
    {
      id: '2',
      name: '12L Damacana Su',
      price: 18,
      image: '/api/placeholder/300/300',
      description: 'Orta boyut damacana su'
    },
    {
      id: '3',
      name: '5L Damacana Su',
      price: 12,
      image: '/api/placeholder/300/300',
      description: 'Küçük boyut damacana su'
    }
  ]

  const testimonials = [
    {
      name: 'Ayşe Yılmaz',
      role: 'Ev Hanımı',
      content: 'Nazsu ile tanıştığımdan beri su kalitesi konusunda hiç endişem yok. Teslimat da çok hızlı.',
      rating: 5
    },
    {
      name: 'Mehmet Kaya',
      role: 'İşletme Sahibi',
      content: 'Ofisimiz için düzenli sipariş veriyoruz. Kaliteli su ve güvenilir hizmet.',
      rating: 5
    },
    {
      name: 'Fatma Demir',
      role: 'Öğretmen',
      content: 'Çocuklarımın sağlığı için en iyisini istiyorum. Nazsu tam aradığım kalite.',
      rating: 5
    }
  ]

  const stats = [
    { number: 15000, label: 'Mutlu Müşteri', suffix: '+' },
    { number: 15, label: 'Yıllık Deneyim', suffix: '' },
    { number: 50000, label: 'Teslimat', suffix: '+' },
    { number: 24, label: 'Saat Destek', suffix: '/7' }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Advanced Background with Liquid Morphing */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-800">
          {/* Removed the semi-transparent white overlay to eliminate white area */}
          {/* <div className="absolute inset-0 bg-black/20" /> */}
          {/* Liquid morphing background shapes */}
          <div className="absolute inset-0">
            <div className="liquid-bg absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-cyan-400/30 to-blue-500/30 rounded-full blur-3xl"></div>
            <div className="liquid-bg absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-blue-400/20 to-cyan-600/20 rounded-full blur-2xl"></div>
            <div className="liquid-bg absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-cyan-300/25 to-blue-400/25 rounded-full blur-xl"></div>
          </div>

          {/* Enhanced water particles with physics */}
          <div className="absolute inset-0">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="particle absolute bg-white/20 rounded-full"
                style={{
                  width: `${Math.random() * 8 + 2}px`,
                  height: `${Math.random() * 8 + 2}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  x: [0, Math.random() * 20 - 10, 0],
                  opacity: [0.2, 0.8, 0.2],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 4 + Math.random() * 3,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>

          {/* Floating water waves */}
          <div ref={waterWaveRef} className="water-wave absolute inset-0 opacity-30"
               style={{
                 background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
                 backgroundSize: '200% 100%'
               }}>
          </div>

          {/* Sparkle effects */}
          <div className="absolute inset-0">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={`sparkle-${i}`}
                className="floating-element absolute"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  scale: [0, 1, 0],
                  rotate: [0, 180, 360],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              >
                <Sparkles className="h-4 w-4 text-cyan-300" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mouse follower effect */}
        <div className="mouse-follower absolute w-5 h-5 bg-cyan-400/50 rounded-full blur-sm pointer-events-none z-20"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          {/* Enhanced Logo with 3D effect */}
          <motion.div
            className="hero-element relative"
            initial={{ opacity: 0, scale: 0.8, rotateY: -180 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1.2, ease: "back.out(1.7)" }}
          >
            <div className="relative inline-block">
              <Droplets className="h-24 w-24 mx-auto mb-6 text-cyan-300 relative z-10" />
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-50 blur-lg"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <motion.div
                className="absolute -inset-4 bg-gradient-to-r from-blue-400/30 to-cyan-400/30 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
            </div>
          </motion.div>
          
          {/* Enhanced Title with Split Text Animation */}
          <h1 ref={heroTitleRef} className="hero-element text-6xl md:text-8xl font-display font-bold mb-6 relative">
            <span className="bg-gradient-to-r from-white via-cyan-200 to-blue-200 bg-clip-text text-transparent relative z-10">
              Nazsu
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 blur-2xl"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </h1>

          {/* Premium Water Badge */}
          <motion.div
            className="hero-element inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md rounded-full px-6 py-2 mb-8 border border-white/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <Zap className="h-4 w-4 text-yellow-300" />
            <span className="text-sm font-medium text-cyan-100">Premium Su Çözümleri</span>
            <Waves className="h-4 w-4 text-cyan-300" />
          </motion.div>
          
          {/* Enhanced Subtitle with Typewriter Effect */}
          <p ref={heroSubtitleRef} className="hero-element text-xl md:text-2xl mb-12 text-cyan-100 max-w-4xl mx-auto leading-relaxed font-light">
            {/* Text will be animated via GSAP TextPlugin */}
          </p>
          
          {/* Enhanced Action Buttons */}
          <div className="hero-element flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link to="/products">
              <motion.button
                className="hero-button group relative px-10 py-5 bg-white text-blue-700 font-bold rounded-full overflow-hidden shadow-2xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={false}
                />
                <span className="relative z-10 flex items-center space-x-3 group-hover:text-white transition-colors duration-300">
                  <span>Ürünleri İncele</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </motion.button>
            </Link>
            
            <motion.a
              href="tel:08501234567"
              className="hero-button group relative px-10 py-5 border-2 border-white text-white font-bold rounded-full overflow-hidden backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              <motion.div
                className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={false}
              />
              <span className="relative z-10 flex items-center space-x-3 group-hover:text-blue-700 transition-colors duration-300">
                <Phone className="h-5 w-5" />
                <span>0850 123 45 67</span>
              </span>
            </motion.a>
          </div>

          {/* Trust Indicators */}
          <motion.div
            className="hero-element mt-16 flex flex-wrap justify-center items-center gap-8 opacity-70"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.7, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-green-300" />
              <span className="text-sm">ISO 9001 Sertifikalı</span>
            </div>
            <div className="flex items-center space-x-2">
              <Truck className="h-5 w-5 text-blue-300" />
              <span className="text-sm">24 Saat Teslimat</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-cyan-300" />
              <span className="text-sm">15.000+ Müşteri</span>
            </div>
          </motion.div>
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
          <p className="text-white/50 text-xs mt-2 group-hover:text-white/80 transition-colors duration-300">Scroll</p>
        </motion.div>

        {/* Parallax Elements */}
        <div className="parallax-element absolute top-20 right-20 opacity-20">
          <Waves className="h-32 w-32 text-cyan-300" />
        </div>
        <div className="parallax-element absolute bottom-40 left-20 opacity-15">
          <Droplets className="h-24 w-24 text-blue-300" />
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
              Neden Nazsu?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Kaliteli su hizmeti için ihtiyacınız olan her şey burada
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="feature-card group"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center h-full">
                  <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
              Popüler Ürünlerimiz
            </h2>
            <p className="text-xl text-gray-600">
              En çok tercih edilen su çözümlerimiz
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group relative"
              >
                {product.popular && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Popüler
                    </span>
                  </div>
                )}
                
                <div className="aspect-square bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center">
                  <Droplets className="h-24 w-24 text-blue-500 group-hover:scale-110 transition-transform duration-300" />
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-blue-600">
                      ₺{product.price}
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-200"
                    >
                      Sepete Ekle
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/products">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300"
              >
                Tüm Ürünleri Gör
              </motion.button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-20 bg-gradient-to-r from-blue-600 to-cyan-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center text-white"
              >
                <div className="text-4xl lg:text-5xl font-bold mb-2">
                  <span className="stat-number" data-target={stat.number}>0</span>
                  <span>{stat.suffix}</span>
                </div>
                <div className="text-cyan-100 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
              Müşterilerimiz Ne Diyor?
            </h2>
            <p className="text-xl text-gray-600">
              Binlerce memnun müşterimizden bazı yorumlar
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div>
                  <div className="font-semibold text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-gray-500 text-sm">
                    {testimonial.role}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-display font-bold text-white mb-6">
              Hemen Sipariş Verin
            </h2>
            <p className="text-xl text-cyan-100 mb-8 leading-relaxed">
              Temiz ve sağlıklı suya ulaşmak için tek yapmanız gereken bizi aramak. 
              24 saat içinde kapınızdayız!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white text-blue-700 font-semibold rounded-full hover:bg-cyan-50 transition-colors duration-300 flex items-center space-x-2 shadow-lg"
                >
                  <Phone className="h-5 w-5" />
                  <span>Hemen Sipariş Ver</span>
                </motion.button>
              </Link>
              <motion.a
                href="tel:08501234567"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-blue-700 transition-all duration-300 flex items-center space-x-2"
              >
                <span>0850 123 45 67</span>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home
