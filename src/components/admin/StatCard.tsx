import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'

interface StatCardProps {
  title: string
  value: string | number
  change?: {
    value: number
    type: 'increase' | 'decrease'
  }
  icon: LucideIcon
  color: 'blue' | 'green' | 'orange' | 'purple' | 'red'
  loading?: boolean
}

const StatCard = ({ title, value, change, icon: Icon, color, loading = false }: StatCardProps) => {
  const colorClasses = {
    blue: {
      bg: 'from-blue-500 to-blue-600',
      light: 'from-blue-50 to-blue-100',
      text: 'text-blue-600',
      icon: 'text-blue-600'
    },
    green: {
      bg: 'from-green-500 to-green-600',
      light: 'from-green-50 to-green-100',
      text: 'text-green-600',
      icon: 'text-green-600'
    },
    orange: {
      bg: 'from-orange-500 to-orange-600',
      light: 'from-orange-50 to-orange-100',
      text: 'text-orange-600',
      icon: 'text-orange-600'
    },
    purple: {
      bg: 'from-purple-500 to-purple-600',
      light: 'from-purple-50 to-purple-100',
      text: 'text-purple-600',
      icon: 'text-purple-600'
    },
    red: {
      bg: 'from-red-500 to-red-600',
      light: 'from-red-50 to-red-100',
      text: 'text-red-600',
      icon: 'text-red-600'
    }
  }

  const colors = colorClasses[color]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          
          {loading ? (
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-20 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-16"></div>
            </div>
          ) : (
            <>
              <p className="text-3xl font-bold text-gray-900 mb-2">
                {typeof value === 'number' ? value.toLocaleString() : value}
              </p>
              
              {change && (
                <div className="flex items-center space-x-1">
                  <span className={`text-sm font-medium ${
                    change.type === 'increase' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {change.type === 'increase' ? '+' : '-'}{Math.abs(change.value)}%
                  </span>
                  <span className="text-xs text-gray-500">önceki aya göre</span>
                </div>
              )}
            </>
          )}
        </div>
        
        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${colors.bg} flex items-center justify-center shadow-lg`}>
          <Icon className="h-8 w-8 text-white" />
        </div>
      </div>
      
      {/* Background decoration */}
      <div className={`absolute inset-0 bg-gradient-to-r ${colors.light} opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-2xl`} />
    </motion.div>
  )
}

export default StatCard
