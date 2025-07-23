'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { motion } from 'framer-motion'
import { Building2 } from 'lucide-react'


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

        {/* Company Overview */}
        <section className="container mx-auto px-4 max-w-4xl mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Building2 className="w-16 h-16 mx-auto mb-6 text-gray-700" />
            <h2 className="text-3xl mb-6">AURA合同会社</h2>
            <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
              私たちAURAは、日本のエンターテインメント業界をリードする総合芸能プロダクションです。
              タレントマネジメントからイベント企画・制作、メディア運営まで幅広く手がけ、
              SNS総合サポートやライブ配信サポートを通じて新しいエンターテインメントの形を創造しています。
            </p>
          </motion.div>

          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-gray-50 rounded-lg p-8 mb-16"
          >
            <h3 className="text-2xl mb-6 text-center">会社概要</h3>
            <dl className="space-y-4">
              <div className="flex flex-col sm:flex-row">
                <dt className="sm:w-1/3 font-medium text-gray-700">会社名</dt>
                <dd className="sm:w-2/3">AURA合同会社</dd>
              </div>
              <div className="flex flex-col sm:flex-row">
                <dt className="sm:w-1/3 font-medium text-gray-700">所在地</dt>
                <dd className="sm:w-2/3">
                  〒106-0044<br />
                  東京都港区東麻布1-9-15 東麻布1丁目ビル6階
                </dd>
              </div>
              <div className="flex flex-col sm:flex-row">
                <dt className="sm:w-1/3 font-medium text-gray-700">設立年月日</dt>
                <dd className="sm:w-2/3">2023年6月19日</dd>
              </div>
              <div className="flex flex-col sm:flex-row">
                <dt className="sm:w-1/3 font-medium text-gray-700">代表社員社長</dt>
                <dd className="sm:w-2/3">瀧藤 雅朝</dd>
              </div>
              <div className="flex flex-col sm:flex-row">
                <dt className="sm:w-1/3 font-medium text-gray-700">取締役</dt>
                <dd className="sm:w-2/3">南 類</dd>
              </div>
              <div className="flex flex-col sm:flex-row">
                <dt className="sm:w-1/3 font-medium text-gray-700">事業内容</dt>
                <dd className="sm:w-2/3">
                  タレントマネジメントおよびイベントの企画・制作、メディア運営<br />
                  SNS総合サポート・ライブ配信サポート
                </dd>
              </div>
            </dl>
          </motion.div>
        </section>


        {/* Decorative bubbles */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={`company-bubble-${i}`}
              className="absolute rounded-full"
              style={{
                left: `${20 + i * 20}%`,
                top: `${10 + i * 22}%`,
                width: 70 + i * 22,
                height: 70 + i * 22,
                background: 'radial-gradient(circle, rgba(59, 130, 246, 0.06) 0%, transparent 70%)',
                filter: 'blur(4px)',
              }}
              animate={{
                y: [0, -20, 0],
                x: [0, 10, 0],
              }}
              transition={{
                duration: 32 + i * 6,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 3.5,
              }}
            />
          ))}
        </div>
      </main>
      <Footer />
    </>
  )
}