'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { motion } from 'framer-motion'
import { Building2, MapPin, Calendar, Users, Briefcase, Sparkles } from 'lucide-react'


export default function CompanyProfilePage() {
  return (
    <>
      <Header />
      <main className="relative min-h-screen pt-32 pb-20 text-white">
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-light tracking-widest">COMPANY PROFILE</h1>
          <div className="mt-4 w-20 h-0.5 bg-white mx-auto" />
        </motion.div>

        {/* Hero Section */}
        <section className="container mx-auto px-4 max-w-6xl mb-20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="bg-white/10 backdrop-blur-sm rounded-3xl p-16 mb-20 border border-white/20"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center"
            >
              <Building2 className="w-16 h-16 mx-auto mb-6 text-white" />
              <h2 className="text-4xl font-light mb-4">AURA合同会社</h2>
              <p className="text-lg text-white/80">Entertainment Production Company</p>
            </motion.div>
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
            <p className="text-lg text-white/80 leading-relaxed max-w-3xl mx-auto">
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
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl mr-4">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-xl font-medium">会社名</h4>
              </div>
              <p className="text-2xl font-light">AURA合同会社</p>
              <p className="text-sm text-white/70 mt-2">AURA LLC</p>
            </motion.div>

            {/* Location Card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl mr-4">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-xl font-medium">所在地</h4>
              </div>
              <p className="text-white/80">
                〒106-0044<br />
                東京都港区東麻布1-9-15<br />
                東麻布1丁目ビル6階
              </p>
            </motion.div>

            {/* Establishment Date Card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl mr-4">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-xl font-medium">設立年月日</h4>
              </div>
              <p className="text-2xl font-light">2023年6月19日</p>
            </motion.div>

            {/* Management Card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl mr-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-xl font-medium">経営陣</h4>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-white/70">代表社員社長</p>
                  <p className="text-lg font-medium">瀧藤 雅朝</p>
                </div>
                <div>
                  <p className="text-sm text-white/70">取締役</p>
                  <p className="text-lg font-medium">南 類</p>
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
            className="bg-white/10 backdrop-blur-sm rounded-3xl p-12 text-center border border-white/20"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm text-white mb-6">
              <Briefcase className="w-8 h-8" />
            </div>
            <h3 className="text-3xl font-light mb-8">事業内容</h3>
            <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-white/20 backdrop-blur-sm rounded-2xl px-8 py-6 border border-white/20 hover:bg-white/30 transition-all duration-300"
              >
                <p className="text-lg">タレントマネジメント</p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-white/20 backdrop-blur-sm rounded-2xl px-8 py-6 border border-white/20 hover:bg-white/30 transition-all duration-300"
              >
                <p className="text-lg">イベント企画・制作</p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-white/20 backdrop-blur-sm rounded-2xl px-8 py-6 border border-white/20 hover:bg-white/30 transition-all duration-300"
              >
                <p className="text-lg">メディア運営</p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-white/20 backdrop-blur-sm rounded-2xl px-8 py-6 border border-white/20 hover:bg-white/30 transition-all duration-300"
              >
                <p className="text-lg">SNS総合サポート・ライブ配信サポート</p>
              </motion.div>
            </div>
          </motion.div>
        </section>


        {/* Subtle floating decorative elements */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          <motion.div
            className="absolute rounded-full"
            style={{
              left: '20%',
              top: '30%',
              width: 180,
              height: 180,
              background: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
              filter: 'blur(30px)',
            }}
            animate={{
              y: [0, -25, 0],
              x: [0, 12, 0],
            }}
            transition={{
              duration: 32,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute rounded-full"
            style={{
              left: '75%',
              top: '65%',
              width: 200,
              height: 200,
              background: 'radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, transparent 70%)',
              filter: 'blur(30px)',
            }}
            animate={{
              y: [0, 20, 0],
              x: [0, -15, 0],
            }}
            transition={{
              duration: 36,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 3,
            }}
          />
        </div>
      </main>
      <Footer />
    </>
  )
}