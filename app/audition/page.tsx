'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { motion } from 'framer-motion'
import { Star, Camera, Mic, Users, CheckCircle, Calendar, FileText, Mail } from 'lucide-react'
import Image from 'next/image'

interface AuditionCategory {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  requirements: string[]
  deadline: string
}

interface ProcessStep {
  number: string
  title: string
  description: string
  icon: React.ReactNode
}

const auditionCategories: AuditionCategory[] = [
  {
    id: '1',
    title: '女優オーディション',
    description: 'ドラマ・映画・舞台で活躍する女優を募集しています。',
    icon: <Camera className="w-8 h-8" />,
    requirements: [
      '15歳〜25歳の女性',
      '演技経験不問（未経験者歓迎）',
      '東京近郊でのレッスンに通える方',
      '芸能活動に専念できる方',
    ],
    deadline: '2025年8月31日',
  },
  {
    id: '2',
    title: 'タレントオーディション',
    description: 'バラエティ・情報番組で活躍するタレントを募集しています。',
    icon: <Mic className="w-8 h-8" />,
    requirements: [
      '18歳〜30歳の男女',
      '明るく社交的な方',
      'トーク力に自信のある方',
      '個性的なキャラクターをお持ちの方',
    ],
    deadline: '2025年7月31日',
  },
  {
    id: '3',
    title: '新人発掘オーディション',
    description: '次世代のスターを目指す新人を幅広く募集しています。',
    icon: <Star className="w-8 h-8" />,
    requirements: [
      '13歳〜22歳の男女',
      'ジャンル不問',
      '夢と情熱を持っている方',
      '長期的な活動が可能な方',
    ],
    deadline: '随時募集',
  },
]

const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: '応募書類提出',
    description: 'WEBフォームまたは郵送で応募書類をご提出ください。',
    icon: <FileText className="w-6 h-6" />,
  },
  {
    number: '02',
    title: '書類審査',
    description: 'ご提出いただいた書類を基に、第一次審査を行います。',
    icon: <Mail className="w-6 h-6" />,
  },
  {
    number: '03',
    title: '実技審査',
    description: '演技・歌唱・ダンスなどの実技審査を行います。',
    icon: <Camera className="w-6 h-6" />,
  },
  {
    number: '04',
    title: '面接審査',
    description: '人物像や将来性について面接でお話を伺います。',
    icon: <Users className="w-6 h-6" />,
  },
  {
    number: '05',
    title: '最終審査',
    description: '役員による最終審査を経て、合否を決定します。',
    icon: <Star className="w-6 h-6" />,
  },
  {
    number: '06',
    title: '合格発表',
    description: '合格者には個別にご連絡し、所属契約の手続きを行います。',
    icon: <CheckCircle className="w-6 h-6" />,
  },
]

export default function AuditionPage() {
  return (
    <>
      <Header />
      <main className="relative min-h-screen pt-32 pb-20">
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-light tracking-widest">AUDITION</h1>
          <div className="mt-4 w-20 h-0.5 bg-gray-800 mx-auto" />
        </motion.div>

        {/* Hero Section */}
        <section className="container mx-auto px-4 max-w-6xl mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative h-[500px] rounded-2xl overflow-hidden"
          >
            <Image
              src="/aura/top_mv_pc_0001_miyazaki.jpg"
              alt="AURA Audition"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/20" />
          </motion.div>
        </section>

        {/* Current Auditions */}
        <section className="container mx-auto px-4 max-w-6xl mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl text-center mb-12"
          >
            募集中のオーディション
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {auditionCategories.map((category, index) => (
              <motion.article
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-white border-2 border-gray-200 rounded-xl p-6 h-full hover:border-purple-300 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full text-purple-600 group-hover:scale-110 transition-transform">
                      {category.icon}
                    </div>
                    <span className="text-sm text-gray-600 flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {category.deadline}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl mb-3 group-hover:text-purple-600 transition-colors">
                    {category.title}
                  </h3>
                  
                  <p className="text-gray-700 mb-4">
                    {category.description}
                  </p>
                  
                  <div className="mb-6">
                    <h4 className="font-medium mb-2">応募資格：</h4>
                    <ul className="space-y-1">
                      {category.requirements.map((req, i) => (
                        <li key={i} className="text-sm text-gray-600 flex items-start">
                          <span className="text-green-500 mr-2 mt-0.5">•</span>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <button className="w-full py-2 border-2 border-purple-600 text-purple-600 rounded-lg hover:bg-purple-600 hover:text-white transition-all duration-300">
                    詳細・応募
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* Process */}
        <section className="container mx-auto px-4 max-w-6xl mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl text-center mb-12"
          >
            審査の流れ
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-gray-50 rounded-lg p-6 h-full hover:bg-purple-50 transition-colors group">
                  <div className="flex items-start gap-4">
                    <div className="text-3xl font-light text-purple-600">
                      {step.number}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="text-purple-600">
                          {step.icon}
                        </div>
                        <h3 className="text-lg font-medium">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-sm text-gray-600">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Connection line */}
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-purple-300" />
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* Success Stories */}
        <section className="container mx-auto px-4 max-w-6xl mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-12"
          >
            <h2 className="text-3xl text-center mb-8">
              オーディション合格者の声
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex-shrink-0" />
                  <div>
                    <h4 className="font-medium">A.Kさん（20歳）</h4>
                    <p className="text-sm text-gray-600">2024年合格・女優部門</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "演技経験ゼロからのスタートでしたが、AURAの充実したレッスンと
                  温かいサポートのおかげで、今では夢だったドラマ出演が実現しました。"
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex-shrink-0" />
                  <div>
                    <h4 className="font-medium">M.Tさん（18歳）</h4>
                    <p className="text-sm text-gray-600">2024年合格・新人部門</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "オーディションでは緊張しましたが、審査員の方々が優しく
                  リラックスできる雰囲気を作ってくださいました。今は毎日が充実しています。"
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* FAQ */}
        <section className="container mx-auto px-4 max-w-4xl mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl text-center mb-12"
          >
            よくある質問
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <details className="group bg-white border border-gray-200 rounded-lg">
              <summary className="p-6 cursor-pointer flex items-center justify-between hover:bg-gray-50">
                <span className="font-medium">未経験でも応募できますか？</span>
                <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="px-6 pb-6">
                <p className="text-gray-700">
                  はい、未経験の方も大歓迎です。AURAでは充実した育成プログラムを用意しており、
                  基礎から丁寧に指導いたします。大切なのは情熱と向上心です。
                </p>
              </div>
            </details>

            <details className="group bg-white border border-gray-200 rounded-lg">
              <summary className="p-6 cursor-pointer flex items-center justify-between hover:bg-gray-50">
                <span className="font-medium">オーディションの参加費用はかかりますか？</span>
                <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="px-6 pb-6">
                <p className="text-gray-700">
                  オーディションへの参加は完全無料です。交通費は自己負担となりますが、
                  それ以外の費用は一切かかりません。
                </p>
              </div>
            </details>

            <details className="group bg-white border border-gray-200 rounded-lg">
              <summary className="p-6 cursor-pointer flex items-center justify-between hover:bg-gray-50">
                <span className="font-medium">地方在住でも応募できますか？</span>
                <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="px-6 pb-6">
                <p className="text-gray-700">
                  もちろん応募可能です。ただし、合格後は東京でのレッスンや仕事が中心となるため、
                  通える環境が必要となります。遠方の方には寮のご案内も可能です。
                </p>
              </div>
            </details>
          </motion.div>
        </section>

        {/* CTA */}
        <section className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl mb-6">夢への第一歩を踏み出そう</h2>
            <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
              あなたの才能と情熱を、私たちAURAが全力でサポートします。
              まずは気軽にご応募ください。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors">
                オンライン応募
              </button>
              <button className="px-8 py-3 border-2 border-purple-600 text-purple-600 rounded-full hover:bg-purple-50 transition-colors">
                資料請求
              </button>
            </div>
          </motion.div>
        </section>

        {/* Decorative bubbles */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`audition-bubble-${i}`}
              className="absolute rounded-full"
              style={{
                left: `${5 + i * 16}%`,
                top: `${8 + i * 14}%`,
                width: 85 + i * 20,
                height: 85 + i * 20,
                background: `radial-gradient(circle, rgba(${
                  i % 2 === 0 ? '236, 72, 153' : '167, 139, 250'
                }, 0.06) 0%, transparent 70%)`,
                filter: 'blur(4px)',
              }}
              animate={{
                y: [0, -35, 0],
                x: [0, 20, 0],
              }}
              transition={{
                duration: 30 + i * 5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 2.8,
              }}
            />
          ))}
        </div>
      </main>
      <Footer />
    </>
  )
}