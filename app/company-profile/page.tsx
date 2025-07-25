'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { motion } from 'framer-motion'
import { Building2, MapPin, Calendar, Users, Briefcase, Sparkles } from 'lucide-react'


export default function CompanyProfilePage() {
  return (
    <>
      <Header />
      <main className="relative min-h-screen pt-32 pb-20 text-gray-900">
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-light tracking-widest">COMPANY PROFILE</h1>
          <div className="mt-4 w-20 h-0.5 bg-gray-800 mx-auto" />
        </motion.div>

        {/* Hero Section */}
        <section className="container mx-auto px-4 max-w-6xl mb-20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative h-[400px] rounded-3xl overflow-hidden mb-20"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-tiffany-600 via-tiffany-500 to-tiffany-400" />
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-center text-white"
              >
                <Building2 className="w-20 h-20 mx-auto mb-6" />
                <h2 className="text-5xl font-light mb-4">AURA合同会社</h2>
                <p className="text-xl opacity-90">Entertainment Production Company</p>
              </motion.div>
            </div>
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
              <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
            </div>
          </motion.div>

          {/* Company Philosophy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <Sparkles className="w-12 h-12 mx-auto mb-6 text-tiffany-600" />
            <h3 className="text-3xl font-light mb-8">私たちのビジョン</h3>
            <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
              私たちAURAは、日本のエンターテインメント業界をリードする総合芸能プロダクションです。
              タレントマネジメントからイベント企画・制作、メディア運営まで幅広く手がけ、
              SNS総合サポートやライブ配信サポートを通じて新しいエンターテインメントの形を創造しています。
            </p>
          </motion.div>

          {/* Company Info Cards */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20"
          >
            {/* Company Name Card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
            >
              <div className="flex items-center mb-4">
                <Building2 className="w-8 h-8 text-tiffany-600 mr-3" />
                <h4 className="text-xl font-medium">会社名</h4>
              </div>
              <p className="text-2xl font-light text-gray-800">AURA合同会社</p>
              <p className="text-sm text-gray-500 mt-2">AURA LLC</p>
            </motion.div>

            {/* Location Card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
            >
              <div className="flex items-center mb-4">
                <MapPin className="w-8 h-8 text-tiffany-600 mr-3" />
                <h4 className="text-xl font-medium">所在地</h4>
              </div>
              <p className="text-gray-800">
                〒106-0044<br />
                東京都港区東麻布1-9-15<br />
                東麻布1丁目ビル6階
              </p>
            </motion.div>

            {/* Establishment Date Card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
            >
              <div className="flex items-center mb-4">
                <Calendar className="w-8 h-8 text-tiffany-600 mr-3" />
                <h4 className="text-xl font-medium">設立年月日</h4>
              </div>
              <p className="text-2xl font-light text-gray-800">2023年6月19日</p>
            </motion.div>

            {/* Management Card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
            >
              <div className="flex items-center mb-4">
                <Users className="w-8 h-8 text-tiffany-600 mr-3" />
                <h4 className="text-xl font-medium">経営陣</h4>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">代表社員社長</p>
                  <p className="text-lg font-light">瀧藤 雅朝</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">取締役</p>
                  <p className="text-lg font-light">南 類</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Business Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-tiffany-50 to-tiffany-100 rounded-3xl p-12 text-center"
          >
            <Briefcase className="w-12 h-12 mx-auto mb-6 text-tiffany-600" />
            <h3 className="text-2xl font-light mb-6">事業内容</h3>
            <div className="max-w-3xl mx-auto space-y-4">
              <div className="bg-white/80 backdrop-blur rounded-2xl px-8 py-4">
                <p className="text-lg">タレントマネジメント</p>
              </div>
              <div className="bg-white/80 backdrop-blur rounded-2xl px-8 py-4">
                <p className="text-lg">イベント企画・制作</p>
              </div>
              <div className="bg-white/80 backdrop-blur rounded-2xl px-8 py-4">
                <p className="text-lg">メディア運営</p>
              </div>
              <div className="bg-white/80 backdrop-blur rounded-2xl px-8 py-4">
                <p className="text-lg">SNS総合サポート・ライブ配信サポート</p>
              </div>
            </div>
          </motion.div>
        </section>


        {/* Decorative elements */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`company-bubble-${i}`}
              className="absolute rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: 80 + Math.random() * 40,
                height: 80 + Math.random() * 40,
                background: `radial-gradient(circle, rgba(10, 186, 181, ${0.03 + Math.random() * 0.03}) 0%, transparent 70%)`,
                filter: 'blur(3px)',
              }}
              animate={{
                y: [0, -30 + Math.random() * 20, 0],
                x: [0, 20 - Math.random() * 40, 0],
              }}
              transition={{
                duration: 20 + Math.random() * 10,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 2,
              }}
            />
          ))}
        </div>
      </main>
      <Footer />
    </>
  )
}