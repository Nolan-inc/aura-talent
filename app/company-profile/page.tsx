'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { motion } from 'framer-motion'
import { Building2, Users, Globe, Award, Heart } from 'lucide-react'

interface TimelineItem {
  year: string
  content: string
}

const timeline: TimelineItem[] = [
  { year: '1998', content: '株式会社FLaMme設立' },
  { year: '2000', content: '初の所属タレントがドラマ主演' },
  { year: '2005', content: 'AURA部門設立' },
  { year: '2010', content: '映画製作事業開始' },
  { year: '2015', content: '国際部門設立、海外展開開始' },
  { year: '2020', content: 'デジタルコンテンツ事業強化' },
  { year: '2025', content: '創立25周年' },
]

const values = [
  {
    icon: <Heart className="w-8 h-8" />,
    title: '情熱',
    description: 'エンターテインメントへの情熱を原動力に、常に新しい価値を創造します。',
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: '共創',
    description: 'タレント、スタッフ、クライアントと共に最高の作品を生み出します。',
  },
  {
    icon: <Award className="w-8 h-8" />,
    title: '品質',
    description: '妥協のない高品質なコンテンツで、観客に感動をお届けします。',
  },
  {
    icon: <Globe className="w-8 h-8" />,
    title: '挑戦',
    description: '国内外の新しい市場に挑戦し、日本のエンターテインメントを世界へ。',
  },
]

export default function CompanyProfilePage() {
  return (
    <>
      <Header />
      <main className="relative min-h-screen pt-32 pb-20 bg-white text-gray-900">
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
            <h2 className="text-3xl mb-6">株式会社AURA</h2>
            <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
              私たちAURAは、日本のエンターテインメント業界をリードする総合芸能プロダクションです。
              所属タレントの個性と才能を最大限に引き出し、映画・テレビ・舞台・配信など
              あらゆるメディアで活躍の場を提供しています。
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
                <dd className="sm:w-2/3">株式会社AURA (AURA Inc.)</dd>
              </div>
              <div className="flex flex-col sm:flex-row">
                <dt className="sm:w-1/3 font-medium text-gray-700">設立</dt>
                <dd className="sm:w-2/3">1998年4月1日</dd>
              </div>
              <div className="flex flex-col sm:flex-row">
                <dt className="sm:w-1/3 font-medium text-gray-700">資本金</dt>
                <dd className="sm:w-2/3">1億円</dd>
              </div>
              <div className="flex flex-col sm:flex-row">
                <dt className="sm:w-1/3 font-medium text-gray-700">代表取締役</dt>
                <dd className="sm:w-2/3">山田 太郎</dd>
              </div>
              <div className="flex flex-col sm:flex-row">
                <dt className="sm:w-1/3 font-medium text-gray-700">従業員数</dt>
                <dd className="sm:w-2/3">150名（2025年6月現在）</dd>
              </div>
              <div className="flex flex-col sm:flex-row">
                <dt className="sm:w-1/3 font-medium text-gray-700">所在地</dt>
                <dd className="sm:w-2/3">
                  〒150-0001<br />
                  東京都渋谷区神宮前1-2-3 AURAビル
                </dd>
              </div>
              <div className="flex flex-col sm:flex-row">
                <dt className="sm:w-1/3 font-medium text-gray-700">事業内容</dt>
                <dd className="sm:w-2/3">
                  タレントマネジメント事業<br />
                  映像制作事業<br />
                  音楽制作事業<br />
                  デジタルコンテンツ事業<br />
                  ライセンス事業
                </dd>
              </div>
            </dl>
          </motion.div>
        </section>

        {/* Company Values */}
        <section className="container mx-auto px-4 max-w-6xl mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl text-center mb-12"
          >
            私たちの価値観
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl mb-3">{value.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Timeline */}
        <section className="container mx-auto px-4 max-w-4xl mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl text-center mb-12"
          >
            沿革
          </motion.h2>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gray-300" />

            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'justify-start' : 'justify-end'
                } mb-8`}
              >
                <div
                  className={`w-5/12 ${
                    index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'
                  }`}
                >
                  <div className="bg-white p-4 rounded-lg shadow-md">
                    <h3 className="text-xl font-medium text-blue-600 mb-1">
                      {item.year}
                    </h3>
                    <p className="text-gray-700">{item.content}</p>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full" />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Message */}
        <section className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-blue-50 to-sky-50 rounded-2xl p-12"
          >
            <h2 className="text-3xl text-center mb-8">代表メッセージ</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              エンターテインメントには、人々の心を動かし、明日への活力を与える力があります。
              私たちAURAは、この素晴らしい力を最大限に引き出すため、
              所属タレントと共に日々挑戦を続けています。
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              デジタル化が進む現代においても、人と人との繋がりや感動は変わることがありません。
              むしろ、新しい技術や表現方法を積極的に取り入れることで、
              より多くの人々に感動を届けることができると信じています。
            </p>
            <p className="text-gray-700 leading-relaxed mb-8">
              これからも、日本のエンターテインメントを世界に発信し、
              多くの人々に夢と希望を届けられる企業であり続けたいと思います。
            </p>
            <p className="text-right">
              <span className="text-sm text-gray-600">代表取締役</span><br />
              <span className="text-xl">山田 太郎</span>
            </p>
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