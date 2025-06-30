'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { motion } from 'framer-motion'
import { Users, Heart, TrendingUp, Award } from 'lucide-react'

interface JobPosition {
  id: string
  title: string
  department: string
  type: string
  location: string
  description: string
  requirements: string[]
}

interface Benefit {
  icon: React.ReactNode
  title: string
  description: string
}

const jobPositions: JobPosition[] = [
  {
    id: '1',
    title: 'タレントマネージャー',
    department: 'マネジメント部',
    type: '正社員',
    location: '東京',
    description: '所属タレントのスケジュール管理、現場対応、キャリアプランニングなどを担当していただきます。',
    requirements: [
      '大卒以上',
      'コミュニケーション能力に優れた方',
      '普通自動車免許（AT限定可）',
      'エンターテインメント業界への情熱がある方',
    ],
  },
  {
    id: '2',
    title: 'プロデューサー',
    department: '制作部',
    type: '正社員',
    location: '東京',
    description: '映画・ドラマ・配信コンテンツの企画開発、制作進行を担当していただきます。',
    requirements: [
      '映像制作経験3年以上',
      '企画立案能力',
      'プロジェクトマネジメント経験',
      '柔軟な発想力と実行力',
    ],
  },
  {
    id: '3',
    title: 'デジタルマーケティング',
    department: 'マーケティング部',
    type: '正社員',
    location: '東京',
    description: 'SNS運用、デジタル広告、WEBサイト管理、データ分析を担当していただきます。',
    requirements: [
      'デジタルマーケティング経験2年以上',
      'SNS運用経験',
      'データ分析スキル',
      'トレンドに敏感な方',
    ],
  },
  {
    id: '4',
    title: '経理・財務',
    department: '管理部',
    type: '正社員',
    location: '東京',
    description: '日常経理業務、決算業務、予算管理などを担当していただきます。',
    requirements: [
      '簿記2級以上',
      '経理実務経験3年以上',
      'Excel中級以上',
      '正確性と責任感のある方',
    ],
  },
]

const benefits: Benefit[] = [
  {
    icon: <TrendingUp className="w-8 h-8" />,
    title: 'キャリア成長',
    description: '業界最前線での経験を通じて、プロフェッショナルとして成長できます。',
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: 'チームワーク',
    description: '才能豊かな仲間と共に、最高のエンターテインメントを創造します。',
  },
  {
    icon: <Heart className="w-8 h-8" />,
    title: '充実の福利厚生',
    description: '社会保険完備、有給休暇、研修制度など、働きやすい環境を整備。',
  },
  {
    icon: <Award className="w-8 h-8" />,
    title: '実力主義',
    description: '年齢や性別に関係なく、実力と成果を正当に評価する環境です。',
  },
]

export default function RecruitPage() {
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
          <h1 className="text-5xl font-light tracking-widest">RECRUIT</h1>
          <div className="mt-4 w-20 h-0.5 bg-gray-800 mx-auto" />
        </motion.div>

        {/* Hero Section */}
        <section className="container mx-auto px-4 max-w-6xl mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative h-[500px] rounded-2xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-sky-500 to-blue-600" />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 flex items-center justify-center text-white text-center px-4">
              <div>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-4xl md:text-5xl mb-6"
                >
                  共に、新しい感動を創ろう
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-xl mb-8 max-w-2xl mx-auto"
                >
                  AURAは、日本のエンターテインメントの未来を共に創造する
                  情熱的な仲間を求めています。
                </motion.p>
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="px-8 py-3 bg-white text-gray-800 rounded-full hover:bg-gray-100 transition-colors"
                >
                  エントリーする
                </motion.button>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Why AURA */}
        <section className="container mx-auto px-4 max-w-6xl mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl text-center mb-4"
          >
            なぜAURAで働くのか
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-center text-gray-600 mb-12 max-w-2xl mx-auto"
          >
            業界をリードする環境で、あなたの才能を最大限に発揮してください
          </motion.p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-sky-100 to-blue-100 text-sky-600 mb-4 group-hover:scale-110 transition-transform">
                  {benefit.icon}
                </div>
                <h3 className="text-xl mb-3">{benefit.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Open Positions */}
        <section className="container mx-auto px-4 max-w-6xl mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl text-center mb-12"
          >
            募集職種
          </motion.h2>

          <div className="space-y-6">
            {jobPositions.map((position, index) => (
              <motion.article
                key={position.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow group"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                  <div>
                    <h3 className="text-2xl mb-2 group-hover:text-blue-600 transition-colors">
                      {position.title}
                    </h3>
                    <div className="flex flex-wrap gap-2 text-sm">
                      <span className="px-3 py-1 bg-gray-100 rounded-full">
                        {position.department}
                      </span>
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
                        {position.type}
                      </span>
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full">
                        {position.location}
                      </span>
                    </div>
                  </div>
                  <button className="mt-4 lg:mt-0 px-6 py-2 border-2 border-gray-800 text-gray-800 rounded-lg hover:bg-gray-800 hover:text-white transition-all">
                    詳細を見る
                  </button>
                </div>
                
                <p className="text-gray-700 mb-4">{position.description}</p>
                
                <div>
                  <h4 className="font-medium mb-2">応募資格：</h4>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    {position.requirements.map((req, i) => (
                      <li key={i}>{req}</li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* Employee Voice */}
        <section className="container mx-auto px-4 max-w-6xl mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl text-center mb-12"
          >
            社員の声
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-lg p-6"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-sky-400 to-blue-400 rounded-full mr-4" />
                  <div>
                    <h4 className="font-medium">社員 {i}</h4>
                    <p className="text-sm text-gray-600">マネジメント部</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "AURAでの仕事は毎日が刺激的です。タレントの成長を間近で見守り、
                  共に成功を分かち合える喜びは、他では味わえない経験です。"
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Application Process */}
        <section className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-12"
          >
            <h2 className="text-3xl text-center mb-8">選考プロセス</h2>
            
            <div className="space-y-4">
              {['書類選考', '一次面接', '二次面接', '最終面接', '内定'].map((step, index) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center"
                >
                  <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-medium mr-4">
                    {index + 1}
                  </div>
                  <span className="text-lg">{step}</span>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-8">
              <button className="px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
                応募フォームへ
              </button>
            </div>
          </motion.div>
        </section>

        {/* Decorative bubbles */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`recruit-bubble-${i}`}
              className="absolute rounded-full"
              style={{
                left: `${8 + i * 19}%`,
                top: `${12 + i * 17}%`,
                width: 75 + i * 25,
                height: 75 + i * 25,
                background: 'radial-gradient(circle, rgba(56, 189, 248, 0.05) 0%, transparent 70%)',
                filter: 'blur(3px)',
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, 15, 0],
              }}
              transition={{
                duration: 26 + i * 5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 2.2,
              }}
            />
          ))}
        </div>
      </main>
      <Footer />
    </>
  )
}